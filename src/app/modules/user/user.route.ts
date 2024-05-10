import express from "express";
import { UserControllers } from "./user.controller";
import { ZCreateStudent } from "../student/student.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

router.post(
  "/create-student",
  validateRequest(ZCreateStudent),
  UserControllers.createStudent,
);

export const UserRoutes = router;
