import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ZUpdateDepartmentSchema } from "./academicDepartment.validation";
import { AcademicDepartmentControllers } from "./academicDepartment.controller";

const router = express.Router();

router.get("/", AcademicDepartmentControllers.getAllDepartments);
router.get("/:departmentId", AcademicDepartmentControllers.getSingleDepartment);
router.post(
  "/create-academic-department",
  // validateRequest(ZCreateDepartmentSchema),
  AcademicDepartmentControllers.createDepartment,
);
router.patch(
  "/:departmentId",
  validateRequest(ZUpdateDepartmentSchema),
  AcademicDepartmentControllers.updateDepartment,
);

export const AcademicDepartmentRoutes = router;
