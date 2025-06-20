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
exports.payrollService = void 0;
const dateConverter_1 = require("../../lib/dateConverter");
const mailSender_1 = require("../../lib/mailSender");
const paginationHelper_1 = require("../../lib/paginationHelper");
const mongoose_1 = __importDefault(require("mongoose"));
const employee_model_1 = require("../employee/employee.model");
const payroll_model_1 = require("./payroll.model");
const roles_1 = require("../../enums/roles");
// get all data
const getAllPayrollService = (paginationOptions, filterOptions) => __awaiter(void 0, void 0, void 0, function* () {
    let matchStage = {
        $match: {},
    };
    const { limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    // Extract search and filter options
    const { search } = filterOptions;
    // Search condition
    if (search) {
        const searchKeyword = String(search).replace(/\+/g, " ");
        const keywords = searchKeyword.split("|");
        const searchConditions = keywords.map((keyword) => ({
            $or: [{ employee_id: { $regex: keyword, $options: "i" } }],
        }));
        matchStage.$match.$or = searchConditions;
    }
    matchStage.$match.status = { $ne: "archived" };
    let pipeline = [matchStage];
    pipeline.push({ $sort: { createdAt: -1 } });
    if (skip) {
        pipeline.push({ $skip: skip });
    }
    if (limit) {
        pipeline.push({ $limit: limit });
    }
    pipeline.push({
        $project: {
            _id: 0,
            employee_id: 1,
            gross_salary: 1,
            salary: 1,
            bonus: 1,
            increments: 1,
            status: 1,
        },
    });
    const result = yield payroll_model_1.Payroll.aggregate(pipeline);
    const total = yield payroll_model_1.Payroll.countDocuments();
    return {
        result: result,
        meta: {
            total: total,
        },
    };
});
const getPayrollBasicsService = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (filter = {}) {
    const query = { status: "active" };
    if (filter.employee_id) {
        query.employee_id = filter.employee_id;
    }
    const result = yield payroll_model_1.Payroll.find(query, {
        _id: 0,
        employee_id: 1,
        gross_salary: 1,
    });
    return result;
});
// get single data
const getPayrollService = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    // لو المستخدم عادي، لا ترجع إلا بياناته فقط
    if (user.role === roles_1.ENUM_ROLE.USER && user.id !== id) {
        throw new Error("Unauthorized access to payroll data");
    }
    const result = yield payroll_model_1.Payroll.findOne({ employee_id: id });
    return result;
});
// create monthly data
const createMonthlyPayrollService = (payData) => __awaiter(void 0, void 0, void 0, function* () {
    const salaryDate = (0, dateConverter_1.localDate)(new Date(payData.salary_date));
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        // Check if salaryDate already exists
        const existingPayroll = yield payroll_model_1.Payroll.findOne({
            "salary.date": salaryDate,
        }).session(session);
        if (existingPayroll) {
            throw new Error("Payroll data for this salary date already exists.");
        }
        const bulkOperations = payData.employees.map((data) => {
            const update = {
                $push: {
                    salary: {
                        amount: data.gross_salary,
                        date: salaryDate,
                    },
                },
            };
            if (data.bonus_amount) {
                update.$push.bonus = {
                    amount: data.bonus_amount,
                    type: data.bonus_type,
                    reason: data.bonus_reason,
                    date: salaryDate,
                };
            }
            return {
                updateOne: {
                    filter: { employee_id: data.employee_id },
                    update,
                    upsert: true,
                    new: true,
                },
            };
        });
        const result = yield payroll_model_1.Payroll.bulkWrite(bulkOperations, { session });
        // Send email to each employee
        for (const data of payData.employees) {
            const employee = yield employee_model_1.Employee.findOne({ id: data.employee_id }).session(session);
            if (employee) {
                yield mailSender_1.mailSender.salarySheet(employee.work_email, employee.name, payData.salary_date, data.gross_salary, data.bonus_type, data.bonus_amount);
            }
        }
        yield session.commitTransaction();
        return result;
    }
    catch (error) {
        yield session.abortTransaction();
        throw error;
    }
    finally {
        session.endSession();
    }
});
// update
const updatePayrollService = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    // Convert dates to local dates
    if (updateData.salary) {
        updateData.salary = updateData.salary.map((salary) => (Object.assign(Object.assign({}, salary), { date: (0, dateConverter_1.localDate)(new Date(salary.date)) })));
    }
    if (updateData.bonus) {
        updateData.bonus = updateData.bonus.map((bonus) => (Object.assign(Object.assign({}, bonus), { date: (0, dateConverter_1.localDate)(new Date(bonus.date)) })));
    }
    if (updateData.increments) {
        updateData.increments = updateData.increments.map((increment) => (Object.assign(Object.assign({}, increment), { date: (0, dateConverter_1.localDate)(new Date(increment.date)) })));
    }
    const result = yield payroll_model_1.Payroll.findOneAndUpdate({ employee_id: id }, updateData, {
        new: true,
        upsert: true,
    });
    return result;
});
// delete
const deletePayrollService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield payroll_model_1.Payroll.findOneAndDelete({ employee_id: id });
});
exports.payrollService = {
    getAllPayrollService,
    getPayrollBasicsService,
    getPayrollService,
    createMonthlyPayrollService,
    updatePayrollService,
    deletePayrollService,
};
//# sourceMappingURL=payroll.service.js.map