import express from "express";
// import { USER_ROLE } from '../User/user.constant';
import { FacultyControllers } from "./faculty.controller";
import { ZUpdateFacultySchema } from "./faculty.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

router.get("/:id", FacultyControllers.getSingleFaculty);

router.patch(
  "/:id",
  validateRequest(ZUpdateFacultySchema),
  FacultyControllers.updateFaculty,
);

router.delete("/:id", FacultyControllers.deleteFaculty);

router.get("/", FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;
