import { WEBHOOK_URLS } from '../config/webhooks'

export async function sendCliqAlert(task) {
  const webhookUrl = WEBHOOK_URLS[task.assigned_to] ?? WEBHOOK_URLS.default
  if (!webhookUrl) return // no webhook configured — skip silently

  const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-US',
    { month:'short', day:'numeric', year:'numeric' }) : 'Not set'

  const payload = {
    text: `New task assigned${task.assigned_to ? ` to ${task.assigned_to}` : ''}`,
    card: {
      title: task.title,
      theme: "modern-inline"
    },
    slides: [
      {
        type: "label",
        data: [
          {
            label: "Assigned to",
            value: task.assigned_to ?? "Unassigned"
          },
          {
            label: "Due date",
            value: formatDate(task.due_date)
          },
          {
            label: "Assigned date",
            value: formatDate(task.assigned_date)
          },
          {
            label: "Description",
            value: task.description ?? "—"
          },
          {
            label: "Voice transcript",
            value: task.voice_transcript ?? "—"
          },
          {
            label: "Status",
            value: "Pending"
          }
        ]
      }
    ]
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      console.error(`Cliq notification failed: ${response.status}`)
    }
  } catch (err) {
    console.error('Cliq notification error:', err)
  }
}
