import { AcademicSemister } from "./academicSemister.model";
import { IAcademicSemester } from "./academicSemester.interface";
import { academicSemesterNameCodeMapper } from "./academicSemester.constance";

const createAcademicSemesterInfoDB = async (payload: IAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error("Invalid semester code!");
  }

  const result = await AcademicSemister.create(payload);
  return result;
};

export const academicSemisterServices = {
  createAcademicSemesterInfoDB,
};
