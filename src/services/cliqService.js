import { WEBHOOK_URLS } from '../config/webhooks'

export async function sendCliqAlert(task) {
  // Use the specific webhook for the assignee, or fallback to the default
  const webhookUrl = WEBHOOK_URLS[task.assigned_to] || WEBHOOK_URLS.default
  
  if (!webhookUrl) {
    return;
  }

  const formatDate = (d) => {
    if (!d) return 'Not set';
    return new Date(d).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  // Zoho Cliq Webhook Payload
  const payload = {
    text: `🚨 *New Task Assigned*`,
    card: {
      title: task.title,
      theme: "modern-inline"
    },
    slides: [
      {
        type: "label",
        data: [
          { label: "Assigned to", value: task.assigned_to || "Unassigned" },
          { label: "Due Date", value: formatDate(task.due_date) },
          { label: "Description", value: task.description || "No description provided." },
          { label: "Status", value: "Pending" }
        ]
      }
    ]
  };

  try {
    // We use mode: 'no-cors' because Zoho Cliq webhooks typically don't have CORS headers for browser-side fetch.
    // This allows the request to be sent ('opaque' response), which is fine for fire-and-forget notifications.
    await fetch(webhookUrl, {
      method: 'POST',
      mode: 'no-cors', 
      headers: {
        'Content-Type': 'text/plain', // Using text/plain to avoid preflight CORS check in no-cors mode
      },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    // Silently fail as per master prompt requirements
    console.error('Notification failed to send:', err);
  }
}
