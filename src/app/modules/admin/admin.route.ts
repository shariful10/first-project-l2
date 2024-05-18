import express from "express";
import { AdminControllers } from "./admin.controller";
import { ZUpdateAdminSchema } from "./admin.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

router.get(
  "/",
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  AdminControllers.getAllAdmins,
);

router.get(
  "/:id",
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  AdminControllers.getSingleAdmin,
);

router.patch(
  "/:id",
  // auth(USER_ROLE.superAdmin),
  validateRequest(ZUpdateAdminSchema),
  AdminControllers.updateAdmin,
);

router.delete(
  "/:adminId",
  // auth(USER_ROLE.superAdmin),
  AdminControllers.deleteAdmin,
);

export const AdminRoutes = router;
