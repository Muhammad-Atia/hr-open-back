import { ELeaveRequestType } from "../leave-request/leave-request.type";

export type ModuleItem = {
  name: string;
  enable: boolean;
};

export type LeaveItem = {
  name: ELeaveRequestType;
  days: number;
};

export type TaskItem = {
  name: string;
  assigned_to: string;
};

export type ConditionalWeekend = {
  name: string;
  pattern: number[];
};

export type Payroll = {
  basic: string;
  house_rent: string;
  conveyance: string;
  medical: string;
};

export type SettingType = {
  app_name: string;
  app_url: string;
  favicon_url: string;
  logo_url: string;
  logo_width: number;
  logo_height: number;
  company_name: string;
  company_website: string;
  communication_platform: string;
  communication_platform_url: string;
  max_leave_per_day: number;
  leave_threshold_days: number;
  modules: ModuleItem[];
  weekends: string[];
  conditional_weekends: ConditionalWeekend[];
  leaves: LeaveItem[];
  payroll: Payroll;
  onboarding_tasks: TaskItem[];
  offboarding_tasks: TaskItem[];
  rtl: boolean;
  language: "ar" | "en";
};
