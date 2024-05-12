export type IMonths =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

export type IAcademicSemesterName = "Autumn" | "Summer" | "Fall";
export type IAcademicSemesterCode = "01" | "02" | "03";

export type IAcademicSemester = {
  name: IAcademicSemesterName;
  code: IAcademicSemesterCode;
  year: string;
  startMonth: IMonths;
  endMonth: IMonths;
};

export type IAcademicSemesterNameCodeMapper = {
  [key: string]: string;
};
