import jwt from "jsonwebtoken";
import db from "../models/index.js";

import rateLimit from "express-rate-limit";
import serverMessage from "../utils/serverMessage.js";
const SECRET = process.env.JWT_SECRET || "base64:Zd2lT412686";

const unprotectedRoutes = [
  "/api/user/login",
  "/api/user/register",
  "/api/user/refresh",
  "/api/user/activities",
  "/api/user/verify-token",
  "/api/user/reset-password",
  "/api/user/forget-password",
  "/api/user/verify-mail",
  "/api/user/resend-mail",
];
const authorize = async (req, res, next) => {
  // if (unprotectedRoutes.includes(req.originalUrl)) {
  //   return next(); // Pas besoin de JWT ici
  // }

  const path = req.originalUrl.split("?")[0];
  if (unprotectedRoutes.includes(path)) {
    return next();
  }
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("FORBIDDEN_RESOURCE");
    return serverMessage(res, "ACCESS_DENIED");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET);

    const lead = await db.leads.findByPk(decoded.id);
    // const user = await db.Users.findByPk(decoded.id);
    if (!lead) {
      return serverMessage(res, "ACCOUNT_NOT_FOUND");
    }

    req.lead = lead;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return serverMessage(res, "TOKEN_EXPIRED");
    }

    if (err.name === "JsonWebTokenError") {
      return serverMessage(res, "TOKEN_INVALID");
    }
    console.log("ERROR: ", err);

    return serverMessage(res);
  }
};

// Middleware pour limiter les tentatives de login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limite chaque IP à 5 requêtes par windowMs
  message: serverMessage(null, "TOO_MANY_ATTEMPTS"),
  standardHeaders: true, // renvoie les headers rate limit standard
  legacyHeaders: false, // désactive les X-RateLimit-* headers
});

export { authorize, loginLimiter };
