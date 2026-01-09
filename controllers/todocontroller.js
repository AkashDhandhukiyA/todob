const TODO = require("../model/todo");
exports.posttodoitem = async (req, res, next) => {
  try {
    const { task, date, time } = req.body;
    const todo = new TODO({
      task,
      date,
      time,
    });
    await todo.save();
    res.status(200).json({ success: true, message: "Data Send Successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:"internal error",
    });
  }
};
exports.gettodoitem = async (req, res, next) => {
  try {
    const todoitem = await TODO.find().sort({ createdAt: -1 });;
    res.status(200).json({ success: true, message: "data recived", todoitem });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "internal server", error: error });
  }
};
exports.deletetodoitem = async (req, res, next) => {
  try {
    const todoid = req.params.id;
    const todoitemid = await TODO.findById(todoid);
    if (!todoitemid) {
      return res
        .status(400)
        .json({ success: true, message: "todoitemID not exist" });
    }
    const tododelete = await TODO.findOneAndDelete(todoitemid);

    res
      .status(200)
      .json({ success: true, message: "item deleted succefullt ", tododelete });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "internal error", error: error });
  }
};
exports.puttodoitem = async (req, res, next) => {
  try {
    const { task, date, time } = req.body;
    const todoit = req.params.id;
    const todoitem = await TODO.findById(todoit);
    if (!todoitem) {
      return res
        .status(400)
        .json({ success: false, message: "todo not found" });
    }

    const todoupdate = await TODO.findByIdAndUpdate(
      todoitem,
      { task, date, time },
      { new: true }
    );
    if (!todoupdate) {
      return res
        .status(400)
        .json({ success: false, message: "todonot updated " });
    }
    res
      .status(200)
      .json({ success: true, message: "updated succesfully", todoupdate });
  } catch (error) {}
};
exports.completetodopatch =async(req,res,next)=>{
  try{
      const todoId = req.body.id;
      const todo = await TODO.findById(todoId);
      if(!todo){
        return res.status(401).json({success:true,message:"todo not found!"});
      }
      todo.completed = !todo.completed;
      await todo.save();

      res.status(200).json({success:true,message:todo.completed ? "todo marked completed!":"todo marked pending !",todo});
  }catch(error){
        res.status(404).json({success:false,error:error});
  }
}