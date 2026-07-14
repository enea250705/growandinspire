// Public-facing content gating. While this is false, nothing on the Learning
// pages is locked - every podcast, founder story, etc. is open to everyone.
// The admin/`is_premium` structure is untouched, so locking can be switched
// back on (per-item) simply by flipping this to true when the time comes.
export const CONTENT_LOCKING_ENABLED = false
