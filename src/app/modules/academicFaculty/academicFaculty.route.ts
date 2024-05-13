import express from "express";
import {
  createFaculty,
  updateFaculty,
  getAllFaculties,
  getSingleFaculty,
} from "./academicFaculty.controller";
import {
  ZCreateFacultySchema,
  ZUpdateFacultySchema,
} from "./academicFaculty.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

router.get("/", getAllFaculties);
router.get("/:facultyId", getSingleFaculty);
router.post(
  "/create-academic-faculty",
  validateRequest(ZCreateFacultySchema),
  createFaculty,
);
router.patch(
  "/:facultyId",
  validateRequest(ZUpdateFacultySchema),
  updateFaculty,
);

export const AcademicFacultyRoutes = router;
