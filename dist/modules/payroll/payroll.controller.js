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
exports.payrollController = void 0;
const constants_1 = require("../../config/constants");
const catchAsync_1 = __importDefault(require("../../lib/catchAsync"));
const filterPicker_1 = __importDefault(require("../../lib/filterPicker"));
const sendResponse_1 = require("../../lib/sendResponse");
const payroll_service_1 = require("./payroll.service");
const roles_1 = require("../../enums/roles");
// get all data
const getAllPayrollController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = (0, filterPicker_1.default)(req.query, constants_1.paginationField);
    const filterOption = (0, filterPicker_1.default)(req.query, ["search"]);
    const user = req.user;
    if ((user === null || user === void 0 ? void 0 : user.role) === roles_1.ENUM_ROLE.USER) {
        // رجع له فقط راتبه هو
        const payroll = yield payroll_service_1.payrollService.getPayrollService(user.id, user);
        return (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 200,
            result: [payroll],
            message: "data get successfully",
        });
    }
    const payroll = yield payroll_service_1.payrollService.getAllPayrollService(paginationOptions, filterOption);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        result: payroll.result,
        meta: payroll.meta,
        message: "data get successfully",
    });
}));
// get payroll basic data
const getPayrollBasicsController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user; // تأكد أن checkToken يضيف user في req
    let payroll;
    if ((user === null || user === void 0 ? void 0 : user.role) === "admin" || (user === null || user === void 0 ? void 0 : user.role) === "moderator") {
        // الأدمن أو المشرف: جلب جميع بيانات الرواتب
        payroll = yield payroll_service_1.payrollService.getPayrollBasicsService();
    }
    else if ((user === null || user === void 0 ? void 0 : user.role) === "user" || (user === null || user === void 0 ? void 0 : user.role) === "former") {
        // الموظف العادي: جلب بيانات راتبه فقط
        payroll = yield payroll_service_1.payrollService.getPayrollBasicsService({
            employee_id: user.id,
        });
    }
    else {
        // أي دور غير مسموح
        return (0, sendResponse_1.sendResponse)(res, {
            success: false,
            statusCode: 403,
            message: "Access denied.",
        });
    }
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        result: payroll,
        message: "Payroll data fetched successfully",
    });
}));
// get single data
const getPayrollController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = req.user;
    const payroll = yield payroll_service_1.payrollService.getPayrollService(id, user);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        result: payroll,
        message: "data get successfully",
    });
}));
// create data
const createMonthlyPayrollController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payData = req.body;
    yield payroll_service_1.payrollService.createMonthlyPayrollService(payData);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "data created successfully",
    });
}));
// update data
const updatePayrollController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updateData = req.body;
    yield payroll_service_1.payrollService.updatePayrollService(id, updateData);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "data updated successfully",
    });
}));
// delete data
const deletePayrollController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield payroll_service_1.payrollService.deletePayrollService(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "data deleted successfully",
    });
}));
exports.payrollController = {
    getAllPayrollController,
    getPayrollController,
    getPayrollBasicsController,
    createMonthlyPayrollController,
    updatePayrollController,
    deletePayrollController,
};
//# sourceMappingURL=payroll.controller.js.map