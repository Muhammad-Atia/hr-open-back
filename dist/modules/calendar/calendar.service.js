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
Object.defineProperty(exports, "__esModule", { value: true });
exports.calendarService = void 0;
const dateConverter_1 = require("../../lib/dateConverter");
const calendar_model_1 = require("./calendar.model");
// get all calendars
const getAllCalendarService = () => __awaiter(void 0, void 0, void 0, function* () {
    const calendars = yield calendar_model_1.Calendar.find();
    return calendars;
});
const getCalendarService = (year) => __awaiter(void 0, void 0, void 0, function* () {
    const calendars = yield calendar_model_1.Calendar.findOne({ year: year });
    return calendars;
});
// create calendar
const createCalendarService = (calendarData) => __awaiter(void 0, void 0, void 0, function* () {
    calendarData.holidays = calendarData.holidays.map((holiday) => (Object.assign(Object.assign({}, holiday), { start_date: (0, dateConverter_1.localDate)(new Date(holiday.start_date)), end_date: (0, dateConverter_1.localDate)(new Date(holiday.end_date)) })));
    calendarData.events = calendarData.events.map((event) => (Object.assign(Object.assign({}, event), { start_date: (0, dateConverter_1.localDate)(new Date(event.start_date)), end_date: (0, dateConverter_1.localDate)(new Date(event.end_date)) })));
    const calendar = yield calendar_model_1.Calendar.create(calendarData);
    return calendar;
});
// update calendar
const updateCalendarService = (year, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    updateData.holidays = updateData.holidays.map((holiday) => (Object.assign(Object.assign({}, holiday), { start_date: (0, dateConverter_1.localDate)(new Date(holiday.start_date)), end_date: (0, dateConverter_1.localDate)(new Date(holiday.end_date)) })));
    updateData.events = updateData.events.map((event) => (Object.assign(Object.assign({}, event), { start_date: (0, dateConverter_1.localDate)(new Date(event.start_date)), end_date: (0, dateConverter_1.localDate)(new Date(event.end_date)) })));
    const calendar = yield calendar_model_1.Calendar.findOneAndUpdate({ year }, updateData, {
        new: true,
    });
    return calendar;
});
// delete calendar
const deleteCalendarService = (year) => __awaiter(void 0, void 0, void 0, function* () {
    const calendar = yield calendar_model_1.Calendar.findOneAndDelete({ year });
    return calendar;
});
// get upcoming events and holidays
const getUpcomingEventsAndHolidaysService = (currentDate) => __awaiter(void 0, void 0, void 0, function* () {
    const year = currentDate.getFullYear();
    const nextMonth = new Date(currentDate);
    nextMonth.setDate(currentDate.getDate() + 30);
    const calendar = yield calendar_model_1.Calendar.findOne({ year });
    if (!calendar) {
        return { holidays: [], events: [] };
    }
    const upcomingHolidays = calendar.holidays.filter((holiday) => (new Date(holiday.start_date) >= currentDate &&
        new Date(holiday.start_date) <= nextMonth) ||
        (new Date(holiday.end_date) >= currentDate &&
            new Date(holiday.end_date) <= nextMonth));
    const upcomingEvents = calendar.events.filter((event) => (new Date(event.start_date) >= currentDate &&
        new Date(event.start_date) <= nextMonth) ||
        (new Date(event.end_date) >= currentDate &&
            new Date(event.end_date) <= nextMonth));
    return { holidays: upcomingHolidays, events: upcomingEvents };
});
exports.calendarService = {
    getAllCalendarService,
    getCalendarService,
    createCalendarService,
    updateCalendarService,
    deleteCalendarService,
    getUpcomingEventsAndHolidaysService,
};
//# sourceMappingURL=calendar.service.js.map