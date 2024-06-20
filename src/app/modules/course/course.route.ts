import express from "express";
import { CourseControllers } from "./course.controller";
import { ZCreateCourseSchema } from "./course.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

router.get("/", CourseControllers.getAllCourses);
router.get("/:id", CourseControllers.getSingleCourse);
router.delete("/:id", CourseControllers.deleteCourse);
router.post(
  "/create-course",
  validateRequest(ZCreateCourseSchema),
  CourseControllers.createCourse,
);
// router.patch(
//   "/:facultyId",
//   validateRequest(ZUpdateFacultySchema),
//   CourseControllers.updateFaculty,
// );

export const CourseRoutes = router;
