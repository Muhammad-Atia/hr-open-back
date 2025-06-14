"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const employee_type_1 = require("./employee.type");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const employeeSchema = new mongoose_1.default.Schema({
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
        enum: employee_type_1.EDepartment,
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
        enum: employee_type_1.EGender,
    },
    blood_group: {
        type: String,
        enum: employee_type_1.EBloodGroup,
    },
    marital_status: {
        type: String,
        enum: employee_type_1.EMaritalStatus,
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
        enum: employee_type_1.EEmployeeStatus,
        default: employee_type_1.EEmployeeStatus.ACTIVE,
    },
    role: {
        type: String,
        required: true,
        enum: employee_type_1.ERole,
        default: employee_type_1.ERole.USER,
    },
    employeeLanguage: {
        language: { type: String, enum: ["ar", "en"] },
        rtl: { type: Boolean },
    },
}, {
    timestamps: true,
});
// Pre-save hook
employeeSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password"))
            return next();
        this.password = yield bcryptjs_1.default.hash(this.password, 10);
        next();
    });
});
// index id for faster search
employeeSchema.index({ id: 1 });
employeeSchema.index({ role: 1 });
exports.Employee = (0, mongoose_1.model)("employee", employeeSchema);
//# sourceMappingURL=employee.model.js.map