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
exports.employeeOffboardingController = void 0;
const constants_1 = require("../../config/constants");
const catchAsync_1 = __importDefault(require("../../lib/catchAsync"));
const filterPicker_1 = __importDefault(require("../../lib/filterPicker"));
const sendResponse_1 = require("../../lib/sendResponse");
const employee_offboarding_service_1 = require("./employee-offboarding.service");
// get all data
const getAllEmployeeOffboardingController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = (0, filterPicker_1.default)(req.query, constants_1.paginationField);
    const filterOption = (0, filterPicker_1.default)(req.query, ["search"]);
    const employeeOffboarding = yield employee_offboarding_service_1.employeeOffboardingService.getAllEmployeeOffboardingService(paginationOptions, filterOption);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        result: employeeOffboarding.result,
        meta: employeeOffboarding.meta,
        message: "data get successfully",
    });
}));
// get single data
const getEmployeeOffboardingController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const employeeOffboarding = yield employee_offboarding_service_1.employeeOffboardingService.getEmployeeOffboardingService(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        result: employeeOffboarding,
        message: "data get successfully",
    });
}));
// create data
const createEmployeeOffboardingController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const employeeOffboardingData = req.body;
    const employeeOffboarding = yield employee_offboarding_service_1.employeeOffboardingService.createEmployeeOffboardingService(employeeOffboardingData);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        result: employeeOffboarding,
        message: "data created successfully",
    });
}));
// update data
const updateEmployeeOffboardingController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updateData = req.body;
    yield employee_offboarding_service_1.employeeOffboardingService.updateEmployeeOffboardingService(id, updateData);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "data updated successfully",
    });
}));
// update offboarding task status
const updateOffboardingTaskStatusController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const task = req.params.task;
    yield employee_offboarding_service_1.employeeOffboardingService.updateOffboardingTaskStatusService(id, task);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "task status updated successfully",
    });
}));
// delete data
const deleteEmployeeOffboardingController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield employee_offboarding_service_1.employeeOffboardingService.deleteEmployeeOffboardingService(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "data deleted successfully",
    });
}));
// get all pending onboarding task
const getPendingOffboardingTaskController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pendingTask = yield employee_offboarding_service_1.employeeOffboardingService.getPendingOffboardingTaskService();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        result: pendingTask,
        message: "data get successfully",
    });
}));
exports.employeeOffboardingController = {
    getAllEmployeeOffboardingController,
    getEmployeeOffboardingController,
    createEmployeeOffboardingController,
    updateEmployeeOffboardingController,
    updateOffboardingTaskStatusController,
    deleteEmployeeOffboardingController,
    getPendingOffboardingTaskController,
};
//# sourceMappingURL=employee-offboarding.controller.js.map