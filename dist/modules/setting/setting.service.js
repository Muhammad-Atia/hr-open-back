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
exports.settingService = void 0;
const setting_model_1 = require("./setting.model");
// get single data
const getSettingService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield setting_model_1.Setting.findOne();
    return result;
});
// update
const updateSettingService = (updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield setting_model_1.Setting.findOneAndUpdate({}, { $set: updateData }, {
        new: true,
    });
    return result;
});
// get weekends and conditional weekends
const getWeekendsService = () => __awaiter(void 0, void 0, void 0, function* () {
    const setting = yield setting_model_1.Setting.findOne().exec();
    if (!setting) {
        throw new Error("Settings not found");
    }
    return {
        weekends: setting.weekends,
        conditionalWeekends: setting.conditional_weekends,
    };
});
exports.settingService = {
    getSettingService,
    updateSettingService,
    getWeekendsService,
};
//# sourceMappingURL=setting.service.js.map