import Joi from "joi";

const VNameSchema = Joi.object({
  firstName: Joi.string().max(20).required(),
  middleName: Joi.string().max(20).required(),
  lastName: Joi.string().max(20).required(),
});

const VGuardianSchema = Joi.object({
  fatherName: Joi.string().required(),
  fatherOccupation: Joi.string().required(),
  fatherContactNo: Joi.string().required(),
  motherName: Joi.string().required(),
  motherOccupation: Joi.string().required(),
  motherContactNo: Joi.string().required(),
});

const VLocalGuardianSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  contactNo: Joi.string().required(),
  address: Joi.string().required(),
});

const VStudentSchema = Joi.object({
  id: Joi.string().required(),
  name: VNameSchema.required(),
  gender: Joi.string().required().valid("male", "female", "other"),
  dateOfBirth: Joi.string().isoDate(),
  email: Joi.string().email().required(),
  contactNo: Joi.string().required(),
  emergencycontactNo: Joi.string().required(),
  bloodGroup: Joi.string()
    .required()
    .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"),
  presentAddress: Joi.string().required(),
  parmanentAddress: Joi.string().required(),
  guardian: VGuardianSchema.required(),
  localGuardian: VLocalGuardianSchema.required(),
  profileImg: Joi.string(),
  isActive: Joi.string().valid("active", "blocked"),
});

export default VStudentSchema;
