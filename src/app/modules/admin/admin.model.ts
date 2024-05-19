import { Schema, model } from "mongoose";
import { BloodGroup, Gender } from "./admin.constant";
import { AdminModel, TAdmin, TUserName } from "./admin.interface";

const UserName = new Schema<TUserName>({
  firstName: { type: String, required: true, trim: true, maxlength: 20 },
  middleName: { type: String, trim: true },
  lastName: { type: String, trim: true, required: true, maxlength: 20 },
});

const adminSchema = new Schema<TAdmin, AdminModel>(
  {
    id: {
      type: String,
      required: [true, "ID is required"],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User id is required"],
      unique: true,
      ref: "User",
    },
    designation: {
      type: String,
      required: true,
    },
    name: {
      type: UserName,
      required: [true, "Name is required"],
    },
    gender: {
      type: String,
      enum: {
        values: Gender,
        message: "{VALUE} is not a valid gender",
      },
      required: true,
    },
    dateOfBirth: { type: Date },
    email: { type: String, required: true, unique: true },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: {
        values: BloodGroup,
        message: "{VALUE} is not a valid blood group",
      },
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    profileImg: { type: String, default: "" },
    isDeleted: { type: Boolean, default: false },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// generating full name
adminSchema.virtual("fullName").get(function () {
  return `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`;
});

// filter out deleted documents
adminSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

adminSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

adminSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//checking if user is already exist!
adminSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Admin.findOne({ id });
  return existingUser;
};

export const Admin = model<TAdmin, AdminModel>("Admin", adminSchema);
