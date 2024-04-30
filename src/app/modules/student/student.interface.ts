export type IName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type IGurdian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type ILocalGurdian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type IStudent = {
  id: string;
  name: IName;
  gender: "male" | "female";
  dateOfBirth?: string;
  email: string;
  avatar?: string;
  contactNo: string;
  emergencycontactNo: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  parmanentAddress: string;
  gurdian: IGurdian;
  localGuardian: ILocalGurdian;
  profileImg?: string;
  isActive: "active" | "blocked";
};
