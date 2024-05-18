import express from "express";
import {
  ZCreateFacultySchema,
  ZUpdateFacultySchema,
} from "./academicFaculty.validation";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicFacultyControllers } from "./academicFaculty.controller";

const router = express.Router();

router.get("/", AcademicFacultyControllers.getAllFaculties);
router.get("/:facultyId", AcademicFacultyControllers.getSingleFaculty);
router.post(
  "/create-academic-faculty",
  validateRequest(ZCreateFacultySchema),
  AcademicFacultyControllers.createFaculty,
);
router.patch(
  "/:facultyId",
  validateRequest(ZUpdateFacultySchema),
  AcademicFacultyControllers.updateFaculty,
);

export const AcademicFacultyRoutes = router;
