import { IFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";

export const createFacultyInfoDB = async (payload: IFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

export const getAllFacultiesFromDB = async () => {
  const result = await AcademicFaculty.aggregate([{ $project: { __v: 0 } }]);
  return result;
};

export const getFacultyFromDB = async (id: string) => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

export const upadateFacultyFromDB = async (
  id: string,
  payload: Partial<IFaculty>,
) => {
  const result = await AcademicFaculty.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

// export const SemisterServices = {
//   createFacultiesInfoDB,
//   getAllFacultyFromDB,
//   getFacultyFromDB,
//   upadateFacultyFromDB,
// };
