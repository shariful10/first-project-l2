import { IDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";

export const createDepartmentInfoDB = async (payload: IDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

export const getAllDepartmentsFromDB = async () => {
  const result = await AcademicDepartment.find().populate("academicFaculty");
  return result;
};

export const getSingleDepartmentFromDB = async (id: string) => {
  const result =
    await AcademicDepartment.findById(id).populate("academicFaculty");
  return result;
};

export const upadateDepartmentFromDB = async (
  id: string,
  payload: Partial<IDepartment>,
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
