import { AcademicSemester } from "./academicSemister.model";
import { IAcademicSemester } from "./academicSemester.interface";
import { academicSemesterNameCodeMapper } from "./academicSemester.constance";

const createSemesterInfoDB = async (payload: IAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error("Invalid semester code!");
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllSemestersFromDB = async () => {
  const result = await AcademicSemester.aggregate([{ $project: { __v: 0 } }]);
  return result;
};

const getSemesterFromDB = async (id: string) => {
  const result = await AcademicSemester.findById(id);
  return result;
};

const upadateSemesterFromDB = async (
  id: string,
  payload: Partial<IAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error("Invalid semester code!");
  }

  const result = await AcademicSemester.findByIdAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );
  return result;
};

export const SemisterServices = {
  createSemesterInfoDB,
  getAllSemestersFromDB,
  getSemesterFromDB,
  upadateSemesterFromDB,
};
