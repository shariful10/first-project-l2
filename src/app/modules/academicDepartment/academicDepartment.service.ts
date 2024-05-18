import { AcademicDepartment } from "./academicDepartment.model";
import { TAcademicDepartment } from "./academicDepartment.interface";

const createDepartmentInfoDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

const getAllDepartmentsFromDB = async () => {
  const result = await AcademicDepartment.find().populate("academicFaculty");
  return result;
};

const getSingleDepartmentFromDB = async (id: string) => {
  const result =
    await AcademicDepartment.findById(id).populate("academicFaculty");
  return result;
};

const upadateDepartmentFromDB = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );
  return result;
};

export const AcademicDepartmentServices = {
  createDepartmentInfoDB,
  getAllDepartmentsFromDB,
  getSingleDepartmentFromDB,
  upadateDepartmentFromDB,
};
