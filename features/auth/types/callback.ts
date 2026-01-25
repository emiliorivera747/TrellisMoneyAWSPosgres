/**
 * Represents user data to be synchronized from Supabase.
 * @export
 * @interface SupabaseUserSyncData
 */
export interface SupabaseUserSyncData {
  /**
   * Unique identifier for the user.
   * @type {string}
   * @memberof SupabaseUserSyncData
   */
  id: string;

  /**
   * Email address of the user.
   * @type {string}
   * @memberof SupabaseUserSyncData
   */
  email?: string;

  /**
   * User metadata containing additional information.
   * @type {{ full_name?: string }}
   * @memberof SupabaseUserSyncData
   */
  user_metadata: { full_name?: string };
}

/**
 * Represents the state passed during authentication callback.
 * @export
 * @interface CallbackState
 */
export interface CallbackState {
  /**
   * The price ID associated with the callback.
   * @type {string}
   * @memberof CallbackState
   */
  price_id: string;
}
