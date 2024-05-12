import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ZCreateSemester } from "./academicSemister.validation";
import { SemesterControllers } from "./academicSemester.controller";

const router = express.Router();

router.post(
  "/create-academic-semester",
  validateRequest(ZCreateSemester),
  SemesterControllers.createSemester,
);

router.get("/", SemesterControllers.getAllSemesters);

router.get("/:semesterId", SemesterControllers.getSemester);

router.patch(
  "/:semesterId",
  validateRequest(ZCreateSemester),
  SemesterControllers.updateSemester,
);

export const AcademicSemesterRoutes = router;
