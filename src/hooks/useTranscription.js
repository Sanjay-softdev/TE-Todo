import { useState } from 'react'

export function useTranscription() {
  const [isTranscribing, setIsTranscribing] = useState(false)
  const [transcript, setTranscript] = useState('')

  async function transcribe(audioBlob) {
    if (!audioBlob) return
    
    setIsTranscribing(true)
    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      
      // If Web Speech API is available, it's usually handled LIVE in the component.
      // But for this hook, we provide a Whisper fallback.
      if (!SpeechRecognition) {
        await transcribeWithWhisper(audioBlob)
      }
    } catch (err) {
      console.error('Transcription error:', err)
    } finally {
      setIsTranscribing(false)
    }
  }

  async function transcribeWithWhisper(blob) {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY
    if (!apiKey) {
      setTranscript('[Transcription unavailable — no OpenAI API key]')
      return
    }

    const ext = blob.type.includes('mp4') ? 'mp4' : 'webm'
    const formData = new FormData()
    formData.append('file', blob, `recording.${ext}`)
    formData.append('model', 'whisper-1')
    formData.append('language', 'en')

    try {
      const res = await fetch('https://api.openai.com/v1/audio/transcriptions', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}` },
        body: formData
      })
      if (!res.ok) throw new Error('Whisper API error')
      const data = await res.json()
      setTranscript(data.text ?? '')
    } catch (err) {
      console.error('Whisper error:', err)
      setTranscript('[Transcription failed — please type manually]')
    }
  }

  return {
    transcribe,
    isTranscribing,
    transcript,
    setTranscript
  }
}
