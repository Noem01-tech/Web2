import { Router } from "express";

import{
    getAllStudents,
    getStudent,
    createNewStudent,
    updateAStudent,
    removeStudent
} from "../Controller/studentController";

const router= Router();

router.get("/",getAllStudents);

router.get("/:id",getStudent);

router.post("/",createNewStudent);

router.put("/:id",updateAStudent);

router.delete("/:id", removeStudent);

export default router;