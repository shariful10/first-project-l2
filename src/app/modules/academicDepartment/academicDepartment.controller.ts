import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicDepartmentServices } from "./academicDepartment.service";

// create User
const createDepartment = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentServices.createDepartmentInfoDB(
    req.body,
  );

  sendResponse(res, {
    message: "Academic department is created successfully!",
    data: result,
  });
});

const getAllDepartments = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentServices.getAllDepartmentsFromDB();

  sendResponse(res, {
    message: "Academic departments fetched successfully!",
    data: result,
  });
});

const getSingleDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;

  const result =
    await AcademicDepartmentServices.getSingleDepartmentFromDB(departmentId);

  if (!result) {
    return res.status(httpStatus.NOT_FOUND).json({
      statusCode: httpStatus.NOT_FOUND,
      message: "Academic department not found!",
    });
  }

  sendResponse(res, {
    message: "Academic department fetched successfully!",
    data: result,
  });
});

const updateDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;

  const updatedDepartment =
    await AcademicDepartmentServices.upadateDepartmentFromDB(
      departmentId,
      req.body,
    );

  if (!updatedDepartment) {
    return res.status(httpStatus.NOT_FOUND).json({
      statusCode: httpStatus.NOT_FOUND,
      message: "Academic department not found!",
    });
  }

  sendResponse(res, {
    message: "Academic department updated successfully!",
    data: updatedDepartment,
  });
});

export const AcademicDepartmentControllers = {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
};
