export interface ChoreInfo {
  id: string;
  title: string;
  description: string;
  status: "pending" | "completed";
  rewardPoints: number;
}

export interface ChildInfo {
  id: string;
  name: string;
  age: number;
  gender: "male" | "female";
  notes: string;
  chores: ChoreInfo[];
  totalRewardsPoints: number;
}

export interface UserInfo {
  id: string;
  name: string;
  email: string;
}

export interface ChildrenState {
  children: ChildInfo[];
  totalRewardsPoints: number;
  loading: boolean;
  error: string | null;
}

export interface ChoreState {
  chores: ChoreInfo[];
  loading: boolean;
  error: string | null;
}

export interface SerializableUser {
  uid: string;
  email: string | null;
  emailVerified: boolean;
  isAnonymous: boolean;
  displayName: string | null;
}

export interface AuthState {
  user: SerializableUser | null;
  loading: boolean;
  error: string | null;
}
