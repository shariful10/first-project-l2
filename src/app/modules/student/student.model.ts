import bcrypt from "bcrypt";
import config from "../../config";
import { Schema, model } from "mongoose";
import {
  IGuardian,
  ILocalGuardian,
  IName,
  IStudent,
  StudentModel,
} from "./student.interface";

const INameSchema = new Schema<IName>({
  firstName: { type: String, trim: true, required: true },
  middleName: { type: String, trim: true, required: true },
  lastName: { type: String, trim: true, required: true },
});

const IGuardianSchema = new Schema<IGuardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});

const ILocalGuardianSchema = new Schema<ILocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

const studentSchema = new Schema<IStudent, StudentModel>(
  {
    id: { type: String, required: true, unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User is required"],
      unique: true,
      ref: "User",
    },
    password: { type: String, required: true },
    name: { type: INameSchema, required: true },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    dateOfBirth: { type: String },
    email: { type: String, required: true, unique: true },
    contactNo: { type: String, required: true },
    emergencycontactNo: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      required: true,
    },
    presentAddress: { type: String, required: true },
    parmanentAddress: { type: String, required: true },
    guardian: { type: IGuardianSchema, required: true },
    localGuardian: { type: ILocalGuardianSchema, required: true },
    profileImg: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  {
    toJSON: { virtuals: true },
  },
);

// virtual
studentSchema.virtual("fullName").get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

// pre save moddleware/hook: we work on create() save()
studentSchema.pre("save", async function (next) {
  // console.log(this, "pre hook: we will save the data");
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const student = this; // doc
  // hashing pass & save into db
  student.password = await bcrypt.hash(
    student.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// post save moddleware/hook
studentSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

// create a custom static method
studentSchema.statics.isStudentExists = async (id: string) => {
  const existingStudent = await Student.findOne({ id });
  return existingStudent;
};

// query middleware
studentSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// custom instance method
// studentSchema.methods.isStudenExists = async (id: string) => {
//   const existingStudent = await Student.findOne({ id });
//   return existingStudent;
// };

export const Student = model<IStudent, StudentModel>("Student", studentSchema);
