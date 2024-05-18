import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ZCreateSemester } from "./academicSemister.validation";
import { AcademicSemesterControllers } from "./academicSemester.controller";

const router = express.Router();

router.post(
  "/create-academic-semester",
  validateRequest(ZCreateSemester),
  AcademicSemesterControllers.createSemester,
);

router.get("/", AcademicSemesterControllers.getAllSemesters);

router.get("/:semesterId", AcademicSemesterControllers.getSemester);

router.patch(
  "/:semesterId",
  validateRequest(ZCreateSemester),
  AcademicSemesterControllers.updateSemester,
);

export const AcademicSemesterRoutes = router;
