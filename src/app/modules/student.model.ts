import bcrypt from "bcrypt";
import validator from "validator";
import { Schema, model } from "mongoose";
import {
  IGuardian,
  ILocalGuardian,
  IName,
  IStudent,
  StudentModel,
} from "./student/student.interface";
import config from "../config";

const INameSchema = new Schema<IName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, "First name is required"],
    maxlength: [20, "First name can not be more than 20 caracters"],
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: "{VALUE} is not in capitalize formate",
    },
  },
  middleName: {
    type: String,
    trim: true,
    required: [true, "Middle name is required"],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, "Last name is required"],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: "{VALUE} is not valid",
    },
  },
});

const IGuardianSchema = new Schema<IGuardian>({
  fatherName: {
    type: String,
    required: [true, "Father name is required"],
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father occupation is required"],
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father contact number is required"],
  },
  motherName: {
    type: String,
    required: [true, "Mother name is required"],
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother occupation is required"],
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother contact number is required"],
  },
});

const ILocalGuardianSchema = new Schema<ILocalGuardian>({
  name: {
    type: String,
    required: [true, "Local guardian name is required"],
  },
  occupation: {
    type: String,
    required: [true, "Local guardian occupation is required"],
  },
  contactNo: {
    type: String,
    required: [true, "Local guardian contactNo is required"],
  },
  address: {
    type: String,
    required: [true, "Local guardian is address required"],
  },
});

const studentSchema = new Schema<IStudent, StudentModel>({
  id: { type: String, required: [true, "ID is required"], unique: true },
  password: { type: String, required: [true, "Password is required"] },
  name: {
    type: INameSchema,
    required: [true, "Name is required"],
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female", "other"],
      message: "{VALUE} is not valid",
    },
    required: [true, "Gender is required"],
  },
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    // validate: {
    //   validator: (value: string) => validator.isEmail(value),
    //   message: "{VALUE} is not valid email type",
    // },
  },
  contactNo: {
    type: String,
    required: [true, "Contact number is required"],
  },
  emergencycontactNo: {
    type: String,
    required: [true, "Emergency contact number is required"],
  },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    required: [true, "Blood Group is required"],
  },
  presentAddress: {
    type: String,
    required: [true, "Present address is required"],
  },
  parmanentAddress: {
    type: String,
    required: [true, "Parmanent address is required"],
  },
  guardian: {
    type: IGuardianSchema,
    required: [true, "Gurdian information is required"],
  },
  localGuardian: {
    type: ILocalGuardianSchema,
    required: [true, "Local gurdian information is required"],
  },
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: ["active", "blocked"],
    default: "active",
  },
});

// pre save moddleware/hook: we work on create() save()
studentSchema.pre("save", async function (next) {
  // console.log(this, "pre hook: we will save the data");
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const student = this;
  // hashing pass & save into db
  student.password = await bcrypt.hash(
    student.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// post save moddleware/hook
studentSchema.post("save", function () {
  console.log(this, "post hook: we saved our data");
});

// create a custom static method
studentSchema.statics.isStudentExists = async (id: string) => {
  const existingStudent = await Student.findOne({ id });
  return existingStudent;
};

// custom instance method
// studentSchema.methods.isStudenExists = async (id: string) => {
//   const existingStudent = await Student.findOne({ id });
//   return existingStudent;
// };

export const Student = model<IStudent, StudentModel>("Student", studentSchema);
