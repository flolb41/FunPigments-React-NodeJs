import { Request, Response, NextFunction } from "express";
const user = require("../models/users/userModel");
const jwt = require("jsonwebtoken");


/* route authentication */
const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "Vous n'êtes pas authentifié, accès interdit" });
  }
  try {
    const decoded = jwt.verify(token, "secret");
    req.body.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Votre token n'est pas valide !" });
  }
}

export default auth;