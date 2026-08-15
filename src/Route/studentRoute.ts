import { Router } from "express";
import { authentificationToken } from "../Security/jwt";


import{
    login,
    getAllStudents,
    getStudent,
    createNewStudent,
    updateAStudent,
    removeStudent
} from "../Controller/studentController";

const router= Router();

router.post("/login",login)

router.get("/",authentificationToken,getAllStudents);

router.get("/:id",authentificationToken,getStudent);

router.post("/",authentificationToken,createNewStudent);

router.put("/:id",authentificationToken,updateAStudent);

router.delete("/:id",authentificationToken, removeStudent);

export default router;