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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeJob = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const employee_job_type_1 = require("./employee-job.type");
const employeeJobSchema = new mongoose_1.default.Schema({
    employee_id: {
        type: String,
        required: true,
    },
    job_type: {
        type: String,
        required: true,
        enum: employee_job_type_1.EJobType,
    },
    joining_date: {
        type: Date,
        required: true,
    },
    department: {
        type: String,
        enum: employee_job_type_1.EDepartment,
    },
    manager_id: {
        type: String,
    },
    designation: {
        type: String,
        required: true,
    },
    permanent_date: {
        type: Date,
    },
    company_name: {
        type: String,
        required: true,
        default: "themefisher",
    },
    company_website: {
        type: String,
        required: true,
        default: "https://themefisher.com",
    },
    resignation_date: {
        type: Date,
    },
    note: {
        type: String,
    },
    prev_jobs: {
        type: [
            {
                company_name: {
                    type: String,
                    required: true,
                },
                company_website: {
                    type: String,
                    required: true,
                },
                designation: {
                    type: String,
                    required: true,
                },
                start_date: {
                    type: Date,
                    required: true,
                },
                end_date: {
                    type: Date,
                },
                job_type: {
                    type: String,
                    required: true,
                    enum: employee_job_type_1.EJobType,
                },
            },
        ],
    },
    promotions: {
        type: [
            {
                designation: {
                    type: String,
                    required: true,
                },
                promotion_date: {
                    type: Date,
                    required: true,
                },
            },
        ],
    },
}, {
    timestamps: true,
});
exports.EmployeeJob = (0, mongoose_1.model)("employee_job", employeeJobSchema);
//# sourceMappingURL=employee-job.model.js.map