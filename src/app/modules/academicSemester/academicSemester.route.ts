import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ZCreateAcademicSemester } from "./academicSemister.validation";
import { SemesterControllers } from "./academicSemester.controller";

const router = express.Router();

router.post(
  "/create-academic-semester",
  validateRequest(ZCreateAcademicSemester),
  SemesterControllers.createSemester,
);

router.get("/", SemesterControllers.getAllSemesters);
router.get("/:id", SemesterControllers.getSemester);
router.patch(
  "/:id",
  validateRequest(ZCreateAcademicSemester),
  SemesterControllers.updateSemester,
);

export const AcademicSemesterRoutes = router;
