import express from "express";
import validateRequest from "../../middlewares/validateRequest";
// import { USER_ROLE } from '../User/user.constant';
import { FacultyControllers } from "./faculty.controller";
import { ZUpdateFacultySchema } from "./faculty.validation";

const router = express.Router();

router.get(
  "/:id",
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  FacultyControllers.getSingleFaculty,
);

router.patch(
  "/:id",
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(ZUpdateFacultySchema),
  FacultyControllers.updateFaculty,
);

router.delete(
  "/:id",
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  FacultyControllers.deleteFaculty,
);

router.get(
  "/",
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  FacultyControllers.getAllFaculties,
);

export const FacultyRoutes = router;
