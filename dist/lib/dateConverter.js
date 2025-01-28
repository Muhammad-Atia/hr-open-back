"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOneYearPassed = exports.localDate = exports.formatDate = void 0;
const date_fns_1 = require("date-fns");
const formatDate = (date, pattern = "EEEE, dd MMMM, yyyy") => {
    if (!date)
        return;
    const dateObj = new Date(date);
    const output = (0, date_fns_1.format)(dateObj, pattern);
    return output;
};
exports.formatDate = formatDate;
const localDate = (date) => {
    const removeTime = new Date(date).toISOString().split("T")[0];
    const utcDate = new Date(removeTime);
    const dhakaTime = (0, date_fns_1.add)(utcDate, { hours: 6 });
    return dhakaTime;
};
exports.localDate = localDate;
const isOneYearPassed = (prevDate, currentDate) => {
    const oneYearLater = new Date(prevDate);
    oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
    // Compare only the date values
    const isPassed = oneYearLater.getFullYear() < currentDate.getFullYear() ||
        (oneYearLater.getFullYear() === currentDate.getFullYear() &&
            oneYearLater.getMonth() < currentDate.getMonth()) ||
        (oneYearLater.getFullYear() === currentDate.getFullYear() &&
            oneYearLater.getMonth() === currentDate.getMonth() &&
            oneYearLater.getDate() <= currentDate.getDate());
    return isPassed;
};
exports.isOneYearPassed = isOneYearPassed;
//# sourceMappingURL=dateConverter.js.map