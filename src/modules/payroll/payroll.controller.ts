import { paginationField } from "@/config/constants";
import catchAsync from "@/lib/catchAsync";
import pick from "@/lib/filterPicker";
import { sendResponse } from "@/lib/sendResponse";
import { Request, Response } from "express";
import { payrollService } from "./payroll.service";
import { ENUM_ROLE } from "@/enums/roles";

// get all data
const getAllPayrollController = catchAsync(
  async (req: Request, res: Response) => {
    const paginationOptions = pick(req.query, paginationField);
    const filterOption = pick(req.query, ["search"]);

    const user = req.user;

    if (user?.role === ENUM_ROLE.USER) {
      // رجع له فقط راتبه هو
      const payroll = await payrollService.getPayrollService(user.id, user);
      return sendResponse(res, {
        success: true,
        statusCode: 200,
        result: [payroll],
        message: "data get successfully",
      });
    }

    const payroll = await payrollService.getAllPayrollService(
      paginationOptions,
      filterOption
    );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      result: payroll.result,
      meta: payroll.meta,
      message: "data get successfully",
    });
  }
);

// get payroll basic data
const getPayrollBasicsController = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user; // تأكد أن checkToken يضيف user في req

    let payroll;

    if (user?.role === "admin" || user?.role === "moderator") {
      // الأدمن أو المشرف: جلب جميع بيانات الرواتب
      payroll = await payrollService.getPayrollBasicsService();
    } else if (user?.role === "user" || user?.role === "former") {
      // الموظف العادي: جلب بيانات راتبه فقط
      payroll = await payrollService.getPayrollBasicsService({
        employee_id: user.id,
      });
    } else {
      // أي دور غير مسموح
      return sendResponse(res, {
        success: false,
        statusCode: 403,
        message: "Access denied.",
      });
    }

    sendResponse(res, {
      success: true,
      statusCode: 200,
      result: payroll,
      message: "Payroll data fetched successfully",
    });
  }
);

// get single data
const getPayrollController = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = req.user;
  const payroll = await payrollService.getPayrollService(id, user);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    result: payroll,
    message: "data get successfully",
  });
});

// create data
const createMonthlyPayrollController = catchAsync(
  async (req: Request, res: Response) => {
    const payData = req.body;
    await payrollService.createMonthlyPayrollService(payData);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "data created successfully",
    });
  }
);

// update data
const updatePayrollController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updateData = req.body;

    await payrollService.updatePayrollService(id, updateData);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "data updated successfully",
    });
  }
);

// delete data
const deletePayrollController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    await payrollService.deletePayrollService(id);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "data deleted successfully",
    });
  }
);

export const payrollController = {
  getAllPayrollController,
  getPayrollController,
  getPayrollBasicsController,
  createMonthlyPayrollController,
  updatePayrollController,
  deletePayrollController,
};
