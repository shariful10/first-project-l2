import express from "express";
import { UserControllers } from "./user.controller";
import { ZCreateStudent } from "../student/student.validation";
import validateRequest from "../../middlewares/validateRequest";
import { ZCreateFacultySchema } from "../faculty/faculty.validation";

const router = express.Router();

router.post(
  "/create-student",
  validateRequest(ZCreateStudent),
  UserControllers.createStudent,
);

router.post(
  "/create-faculty",
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  // upload.single('file'),
  // (req: Request, res: Response, next: NextFunction) => {
  //   req.body = JSON.parse(req.body.data);
  //   next();
  // },
  validateRequest(ZCreateFacultySchema),
  UserControllers.createFaculty,
);

export const UserRoutes = router;
