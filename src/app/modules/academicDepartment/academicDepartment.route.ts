import express from "express";
import { ZUpdateDepartmentSchema } from "./academicDepartment.validation";
import {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
} from "./academicDepartment.controller";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

router.get("/", getAllDepartments);
router.get("/:departmentId", getSingleDepartment);
router.post(
  "/create-academic-department",
  // validateRequest(ZCreateDepartmentSchema),
  createDepartment,
);
router.patch(
  "/:departmentId",
  validateRequest(ZUpdateDepartmentSchema),
  updateDepartment,
);

export const AcademicDepartmentRoutes = router;
