import { IAcademicSemester } from "./academicSemester.interface";
import { AcademicSemister } from "./academicSemister.model";

const createAcademicSemesterInfoDB = async (payload: IAcademicSemester) => {
  const result = await AcademicSemister.create(payload);
  return result;
};

export const academicSemisterServices = {
  createAcademicSemesterInfoDB,
};
