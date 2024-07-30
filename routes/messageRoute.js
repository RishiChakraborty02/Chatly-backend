import { Router } from "express";

const router = Router();

router.get("/message", (req, res) => {
    res.send("Message Route");
    }
);

export default router;
