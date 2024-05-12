import { AcademicSemister } from "./academicSemister.model";
import { IAcademicSemester } from "./academicSemester.interface";
import { academicSemesterNameCodeMapper } from "./academicSemester.constance";

const createSemesterInfoDB = async (payload: IAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error("Invalid semester code!");
  }

  const result = await AcademicSemister.create(payload);
  return result;
};

const getAllSemestersFromDB = async () => {
  const result = await AcademicSemister.aggregate([{ $project: { __v: 0 } }]);
  return result;
};

const getSemesterFromDB = async (id: string) => {
  const result = await AcademicSemister.findById(id);
  return result;
};

const upadateSemesterFromDB = async (
  id: string,
  newData: IAcademicSemester,
) => {
  if (academicSemesterNameCodeMapper[newData.name] !== newData.code) {
    throw new Error("Invalid semester code!");
  }

  const result = await AcademicSemister.findByIdAndUpdate(id, newData, {
    new: true,
  });
  return result;
};

export const SemisterServices = {
  createSemesterInfoDB,
  getAllSemestersFromDB,
  getSemesterFromDB,
  upadateSemesterFromDB,
};
