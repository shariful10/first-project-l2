import { Request, Response } from "express";
import ZStudentSchema from "./student.validation";
import { StudentServices } from "./student.service";

// create student
const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body;

    // data validation using Joi
    // const { error, value } = VStudentSchema.validate(student);

    // data validation using zod
    const ZParsedData = ZStudentSchema.parse(student);

    const result = await StudentServices.createStudentInfoDB(ZParsedData);

    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: "Something went weong",
    //     error: error.details,
    //   });
    // }

    res.status(200).json({
      success: true,
      message: "Student is created successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went weong",
      error: err,
    });
  }
};

// get all student
const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentFronDB();
    res.status(200).json({
      success: true,
      message: "Students are retrieved successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

// get single student
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingeStudentFronDB(studentId);
    res.status(200).json({
      success: true,
      message: "Student is retrieved successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
