import { Request, Response, NextFunction, RequestHandler } from "express";
import config from "@/config/variables";
import { jwtHelpers } from "@/lib/jwtTokenHelper";
import { Secret } from "jsonwebtoken";

const auth =
  (...requestRoles) =>
  async (req, res, next) => {
    try {
      console.log("==> AUTH MIDDLEWARE REACHED <==");
      const token = req.headers.authorization;
      if (!token) {
        res.status(401).json({ message: "User is not authenticated" });
        return;
      }
      const verifyToken = token.split(" ")[1];
      const verifiedToken = jwtHelpers.verifyToken(
        verifyToken,
        config.jwt_secret! as Secret
      );
      req.user = verifiedToken;

      console.log("Allowed roles:", requestRoles);
      console.log("User role:", verifiedToken.role);

      if (
        requestRoles.length > 0 &&
        !requestRoles.includes(verifiedToken.role)
      ) {
        res.status(403).json({ message: "Forbidden: Insufficient role" });
        return; // <== هذا السطر هو الأهم!
      }

      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid or expired token" });
    }
  };

export default auth;
// This middleware checks if the user is authenticated and has the required roles.
