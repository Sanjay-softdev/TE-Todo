export const WEBHOOK_URLS = {
  default:     import.meta.env.VITE_ZOHO_CLIQ_WEBHOOK_URL       ?? null,
  'Dev Team':  import.meta.env.VITE_ZOHO_CLIQ_WEBHOOK_DEV       ?? null,
  'Marketing': import.meta.env.VITE_ZOHO_CLIQ_WEBHOOK_MARKETING ?? null,
  'Operations':import.meta.env.VITE_ZOHO_CLIQ_WEBHOOK_OPS       ?? null,
  'Alice':     import.meta.env.VITE_ZOHO_CLIQ_WEBHOOK_ALICE     ?? null,
  'Bob':       import.meta.env.VITE_ZOHO_CLIQ_WEBHOOK_BOB       ?? null,
  'Carol':     import.meta.env.VITE_ZOHO_CLIQ_WEBHOOK_CAROL     ?? null,
}
