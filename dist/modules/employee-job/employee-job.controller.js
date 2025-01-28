"use strict";
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
exports.employeeJobController = exports.promoteEmployeeController = void 0;
const constants_1 = require("../../config/constants");
const catchAsync_1 = __importDefault(require("../../lib/catchAsync"));
const filterPicker_1 = __importDefault(require("../../lib/filterPicker"));
const sendResponse_1 = require("../../lib/sendResponse");
const employee_job_service_1 = require("./employee-job.service");
// get all data
const getAllEmployeeJobController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = (0, filterPicker_1.default)(req.query, constants_1.paginationField);
    const filterOption = (0, filterPicker_1.default)(req.query, ["search"]);
    const employeeJob = yield employee_job_service_1.employeeJobService.getAllEmployeeJobService(paginationOptions, filterOption);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        result: employeeJob.result,
        meta: employeeJob.meta,
        message: "data get successfully",
    });
}));
// get single data
const getEmployeeJobController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const employeeJob = yield employee_job_service_1.employeeJobService.getEmployeeJobService(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        result: employeeJob,
        message: "data get successfully",
    });
}));
// update data
const updateEmployeeJobController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updateData = req.body;
    yield employee_job_service_1.employeeJobService.updateEmployeeJobService(id, updateData);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "data updated successfully",
    });
}));
// delete data
const deleteEmployeeJobController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield employee_job_service_1.employeeJobService.deleteEmployeeJobService(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "data deleted successfully",
    });
}));
// promote employee
exports.promoteEmployeeController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = yield employee_job_service_1.employeeJobService.promoteEmployee(id, req.body.promotions);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        result: data,
        message: "Employee promoted successfully",
    });
}));
exports.employeeJobController = {
    getAllEmployeeJobController,
    getEmployeeJobController,
    deleteEmployeeJobController,
    updateEmployeeJobController,
    promoteEmployeeController: exports.promoteEmployeeController,
};
//# sourceMappingURL=employee-job.controller.js.map