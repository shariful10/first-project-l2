import { USER_ROLE } from "./user.constance";

type TRole = "superAdmin" | "admin" | "student" | "faculty";

type TStatus = "in-progress" | "blocked";

export type TUser = {
  id: string;
  email: string;
  password: string;
  needsPasswordChange: boolean;
  role: TRole;
  status: TStatus;
  isDeleted: boolean;
};

export type TUserRole = keyof typeof USER_ROLE;
