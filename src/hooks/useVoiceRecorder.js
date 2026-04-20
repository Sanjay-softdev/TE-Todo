import { useState, useRef, useEffect, useCallback } from 'react'

export function useVoiceRecorder() {
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState(null)
  const [audioUrl, setAudioUrl] = useState(null)
  const [recordingSeconds, setRecordingSeconds] = useState(0)
  
  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])
  const streamRef = useRef(null)
  const timerRef = useRef(null)

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      
      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : MediaRecorder.isTypeSupported('audio/webm')
          ? 'audio/webm'
          : 'audio/mp4'
          
      const recorder = new MediaRecorder(stream, { mimeType })
      chunksRef.current = []
      
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data)
      }
      
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeType })
        setAudioBlob(blob)
        const url = URL.createObjectURL(blob)
        setAudioUrl(url)
        
        // Stop all tracks
        streamRef.current?.getTracks().forEach(t => t.stop())
      }
      
      recorder.start(250)
      mediaRecorderRef.current = recorder
      setIsRecording(true)
      setRecordingSeconds(0)
      
      timerRef.current = setInterval(() => {
        setRecordingSeconds(s => s + 1)
      }, 1000)
      
    } catch (err) {
      console.error('Microphone access error:', err)
      throw new Error('Microphone access denied')
    }
  }, [])

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      clearInterval(timerRef.current)
      setIsRecording(false)
    }
  }, [isRecording])

  const clearRecording = useCallback(() => {
    if (audioUrl) URL.revokeObjectURL(audioUrl)
    setAudioBlob(null)
    setAudioUrl(null)
    setRecordingSeconds(0)
  }, [audioUrl])

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current)
      streamRef.current?.getTracks().forEach(t => t.stop())
      if (audioUrl) URL.revokeObjectURL(audioUrl)
    }
  }, [audioUrl])

  return {
    isRecording,
    audioBlob,
    audioUrl,
    recordingSeconds,
    startRecording,
    stopRecording,
    clearRecording
  }
}
