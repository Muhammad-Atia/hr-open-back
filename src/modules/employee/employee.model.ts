import mongoose, { model } from "mongoose";
import {
  EBloodGroup,
  EDepartment,
  EEmployeeStatus,
  EGender,
  EMaritalStatus,
  EmployeeType,
  ERole,
} from "./employee.type";
import bcrypt from "bcryptjs";

const employeeSchema = new mongoose.Schema<EmployeeType>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
    },
    image: {
      type: String,
    },
    dob: {
      type: Date,
    },
    phone: {
      type: String,
    },
    work_email: {
      type: String,
      unique: true,
    },
    personal_email: {
      type: String,
      unique: true,
    },
    department: {
      type: String,
      enum: EDepartment,
    },
    designation: {
      type: String,
      required: true,
    },
    communication_id: {
      type: String,
    },
    password: {
      type: String,
    },
    nid: {
      type: String,
    },
    tin: {
      type: String,
    },
    gender: {
      type: String,
      enum: EGender,
    },
    blood_group: {
      type: String,
      enum: EBloodGroup,
    },
    marital_status: {
      type: String,
      enum: EMaritalStatus,
    },
    present_address: {
      type: String,
    },
    permanent_address: {
      type: String,
    },
    facebook: {
      type: String,
    },
    twitter: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    personality: {
      type: String,
    },
    note: {
      type: String,
    },
    status: {
      type: String,
      enum: EEmployeeStatus,
      default: EEmployeeStatus.ACTIVE,
    },
    role: {
      type: String,
      required: true,
      enum: ERole,
      default: ERole.USER,
    },
    employeeLanguage: {
      language: { type: String, enum: ["ar", "en"] },
      rtl: { type: Boolean },
    },
  },
  {
    timestamps: true,
  }
);
// Pre-save hook
employeeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
// index id for faster search
employeeSchema.index({ id: 1 });
employeeSchema.index({ role: 1 });

export const Employee = model<EmployeeType>("employee", employeeSchema);
