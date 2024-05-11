import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ZCreateAcademicSemester } from "./academicSemister.validation";
import { AcademicSemesterControllers } from "./academicSemester.controller";

const router = express.Router();

router.post(
  "/create-academic-semester",
  validateRequest(ZCreateAcademicSemester),
  AcademicSemesterControllers.createAcademecSemester,
);

export const AcademicSemesterRoutes = router;
