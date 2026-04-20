import { createContext, useState, useEffect } from 'react'
import { supabase } from '../config/supabase'

export const AuthContext = createContext({
  user: null,
  session: null,
  loading: true,
  signInWithEmail: async () => {},
  signOut: () => {}
})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signInWithEmail = async (email, password) => {
    // Mock Bypass for testing
    if (email === 'testuser@gmail.com' && password === 'password123') {
      const mockSession = { 
        user: { email, id: 'mock-id' },
        access_token: 'mock-token'
      }
      setSession(mockSession)
      setUser(mockSession.user)
      return { data: { session: mockSession }, error: null }
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (data.session) {
      setSession(data.session)
      setUser(data.session.user)
    }
    
    return { data, error }
  }

  const signOut = async () => {
    setUser(null)
    setSession(null)
    await supabase.auth.signOut()
  }

  const value = {
    user,
    session,
    loading,
    signInWithEmail,
    signOut
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
