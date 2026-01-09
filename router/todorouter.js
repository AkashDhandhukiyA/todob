const express =require("express");
const todoRouter= express.Router();
const todocontroller =require("../controllers/todocontroller");


todoRouter.post("/",todocontroller.posttodoitem);
todoRouter.get("/",todocontroller.gettodoitem);
todoRouter.delete("/:id",todocontroller.deletetodoitem);
todoRouter.put("/:id",todocontroller.puttodoitem);
todoRouter.patch("/:id/complete",todocontroller.completetodopatch);
module.exports=todoRouter;