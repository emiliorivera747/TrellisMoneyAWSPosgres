
export interface Profile {
  id: number;
  bio?: string;
  userId: number;
}

export interface User {
  id: number;
  email: string;
  name: string;
  profile?: Profile;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  emailVerified?: boolean;
}

