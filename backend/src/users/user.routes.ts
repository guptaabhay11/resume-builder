
import { Router } from "express";
import passport from "passport";
import { catchError } from "../common/middleware/catch-error.middleware";
import { roleAuth } from "../common/middleware/role-auth.middleware";
import { sendFile } from "../common/helper/sendFile";
import * as userController from "./user.controller";
import { createResponse } from "../common/helper/response.helper";

import * as userValidator from "./user.validation";
import { authenticateUser } from "./auth.middleware";
import multer from "multer";
import upload from "../common/middleware/multer";
const router = Router();


router
        .post("/register", userValidator.createUser, catchError, userController.createUser)
        .post("/login", userValidator.login, catchError, passport.authenticate('login', { session: false }), userController.login)
        .get("/me", roleAuth(['USER']), userController.getUserInfo)
       // .post("/upload-pdf", authenticateUser,upload.single('pdf'), userController.uploadPdf)
        router.post("/send-email", upload.single("file"), async (req, res) => {
          const { email, subject, html } = req.body;
          const file = req.file;
        
          console.log(req.body)
          console.log(file)
        
          if (!file) {
            throw new Error("Failed to file not found");
          }
        
          const filePath = file.path;
          const fileName = file.originalname;
        
          const result = await sendFile({
            email,
            subject,
            html,
            filePath,
            fileName,
          });
        
          if (result) {
            res.send(createResponse(result, "File Sent Successfully"));
        
          } else {
        
            throw new Error("Failed to send file");
          }})


export default router;