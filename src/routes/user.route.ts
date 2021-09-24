import { Router } from "express";
import UserEntity from "../domain/entities/User.entity";

const router = Router();

router.get("/users", async (req, res, next) => {
  res.json(await UserEntity.find());
});

router.post("/user", async (req, res, next) => {
  UserEntity.create({
    name: "User 1",
  }).then(
    (r) => res.json(r),
    (err) => next(err)
  );
});

export default router;
