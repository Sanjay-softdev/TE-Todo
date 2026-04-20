export const formatDate = (dateString) => {
  if (!dateString) return 'Not set'
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

export const formatTime = (s) => {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

export const getRelativeTime = (dateString) => {
  if (!dateString) return ''
  const now = new Date()
  const then = new Date(dateString)
  const diffInSeconds = Math.floor((now - then) / 1000)

  if (diffInSeconds < 60) return 'Just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`
  
  return formatDate(dateString)
}
