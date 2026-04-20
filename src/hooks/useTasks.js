import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../config/supabase'

export function useTasks() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchTasks = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { data, error: fetchErr } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false })

      if (fetchErr) throw fetchErr
      setTasks(data || [])
    } catch (err) {
      console.error('Error fetching tasks:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const updateTaskStatus = async (id, newStatus) => {
    // Optimistic update
    const previousTasks = [...tasks]
    setTasks(current => 
      current.map(task => 
        task.id === id ? { ...task, status: newStatus } : task
      )
    )

    try {
      const { error: updateErr } = await supabase
        .from('tasks')
        .update({ status: newStatus })
        .eq('id', id)

      if (updateErr) throw updateErr
    } catch (err) {
      console.error('Error updating task status:', err)
      setTasks(previousTasks)
      throw err
    }
  }

  return {
    tasks,
    loading,
    error,
    refetch: fetchTasks,
    updateTaskStatus
  }
}
