export type ButtondownResponse
  = | { id: string, created_at: string, email_address: string }
    | { error: string }
