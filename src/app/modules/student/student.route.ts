import express from "express";
import { StudentControllers } from "./student.controller";
import validateRequest from "../../middlewares/validateRequest";
import { ZUpdateStudent } from "./student.validation";

const router = express.Router();

router.get("/", StudentControllers.getAllStudents);
router.patch(
  "/:id",
  validateRequest(ZUpdateStudent),
  StudentControllers.updateStudent,
);
router.get("/:id", StudentControllers.getSingleStudent);
router.delete("/:id", StudentControllers.deleteStudent);

export const StudentRoutes = router;
