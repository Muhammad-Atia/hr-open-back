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
const variables_1 = __importDefault(require("../config/variables"));
const jwtTokenHelper_1 = require("../lib/jwtTokenHelper");
const auth = (...requestRoles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("==> AUTH MIDDLEWARE REACHED <==");
        const token = req.headers.authorization;
        if (!token) {
            res.status(401).json({ message: "User is not authenticated" });
            return;
        }
        const verifyToken = token.split(" ")[1];
        const verifiedToken = jwtTokenHelper_1.jwtHelpers.verifyToken(verifyToken, variables_1.default.jwt_secret);
        req.user = verifiedToken;
        console.log("Allowed roles:", requestRoles);
        console.log("User role:", verifiedToken.role);
        if (requestRoles.length > 0 &&
            !requestRoles.includes(verifiedToken.role)) {
            res.status(403).json({ message: "Forbidden: Insufficient role" });
            return; // <== هذا السطر هو الأهم!
        }
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
});
exports.default = auth;
// This middleware checks if the user is authenticated and has the required roles.
//# sourceMappingURL=auth.js.map