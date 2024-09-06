import { User } from "./User";

export interface UsersState {
  users: User[];
  status: "idle" | "loading" | "failed";
  filters: {
    name: string;
    username: string;
    email: string;
    phone: string;
  };
}
