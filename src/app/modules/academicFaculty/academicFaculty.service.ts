import { AcademicFaculty } from "./academicFaculty.model";
import { TAcademicFaculty } from "./academicFaculty.interface";

const createFacultyInfoDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getAllFacultiesFromDB = async () => {
  const result = await AcademicFaculty.aggregate([{ $project: { __v: 0 } }]);
  return result;
};

const getSingleFacultyFromDB = async (id: string) => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

const upadateFacultyFromDB = async (
  id: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFaculty.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicFacultyServices = {
  createFacultyInfoDB,
  getAllFacultiesFromDB,
  getSingleFacultyFromDB,
  upadateFacultyFromDB,
};
