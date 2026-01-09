/**
 * Represents a user profile.
 * @export
 * @interface Profile
 */
export interface Profile {
  /**
   * The profile ID.
   * @type {number}
   * @memberof Profile
   */
  id: number;
  /**
   * The profile bio.
   * @type {string}
   * @memberof Profile
   */
  bio?: string;
  /**
   * The user ID associated with the profile.
   * @type {number}
   * @memberof Profile
   */
  user_id: number;
}

/**
 * Represents a user.
 * @export
 * @interface User
 */
export interface User {
  /**
   * The user ID.
   * @type {string}
   * @memberof User
   */
  id: string;
  /**
   * The user's email address.
   * @type {string}
   * @memberof User
   */
  email?: string;
  /**
   * The user's name.
   * @type {string}
   * @memberof User
   */
  name?: string;
  /**
   * The user's profile.
   * @type {Profile}
   * @memberof User
   */
  profile?: Profile;
  /**
   * The date the user was created.
   * @type {Date}
   * @memberof User
   */
  createdAt?: Date;
  /**
   * The date the user was last updated.
   * @type {Date}
   * @memberof User
   */
  updatedAt?: Date;
  /**
   * The user ID string.
   * @type {string}
   * @memberof User
   */
  user_id?: string;
  /**
   * Whether the email is verified.
   * @type {boolean}
   * @memberof User
   */
  emailVerified?: boolean;
}
