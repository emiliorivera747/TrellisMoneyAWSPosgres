
export interface Profile {
  id: number;
  bio?: string;
  user_id: number;
}

export interface User {
  id: string;
  email?: string;
  name?: string;
  profile?: Profile;
  createdAt?: Date;
  updatedAt?: Date;
  user_id?: string;
  emailVerified?: boolean;
}

