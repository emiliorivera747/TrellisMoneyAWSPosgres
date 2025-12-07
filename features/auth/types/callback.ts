export interface SupabaseUserSyncData {
  id: string;
  email?: string;
  user_metadata: { full_name?: string };
}
export interface CallbackState {
  price_id: string;
}
