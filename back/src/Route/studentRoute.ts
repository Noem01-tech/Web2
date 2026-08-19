import { Router } from "express";
import { authentificationToken, authorized } from "../Security/jwt";

import{
    login,
    getAllStudents,
    getStudent,
    createNewStudent,
    updateAStudent,
    removeStudent,
    createNewUser
} from "../Controller/studentController";

const router= Router();

router.post("/login",login)

router.use(authentificationToken)

router.get("/",getAllStudents);

router.get("/:id",getStudent);

router.post("/",authorized("ADMIN"),createNewStudent);

router.post("/user",authorized("ADMIN"),createNewUser);

router.put("/:id",authorized("ADMIN"),updateAStudent);

router.delete("/:id",authorized("ADMIN"), removeStudent);

export default router;