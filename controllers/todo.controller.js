const todoMethods = {};
const todoModel = require('../models/todoModel');


todoMethods.addTodo = async (req, res, next) => {
    console.log("add todo");
    const { title, description } = req.body;
    const userID = req.userID;

    const newTodo = new todoModel({
        title,
        description,
        "owner": userID
    })

    newTodo.save();

    res.json({
        status: true,
        description: "Todo added successfully"
    })
}

todoMethods.updateTodo = async (req, res) => {
    console.log("update todo");
    const {title, description} = req.body;
    const noteID = req.params;

    const updateTodo = await todoModel.findOne({_id: noteID}).updateOne({$set: {
        title, description
    }})
    
    return res.json({
        status: true,
        message: "Todo update successfully"
    })

}

todoMethods.updateStatusTodo = async (req, res) => {
    const { id } = req.params;
    const todo = await todoModel.findOne({_id: id});
    const newStatus = todo.isComplete();
    if(newStatus) {
        console.log("verdad:", newStatus);
        await todo.update({$set: {todoStatus: newStatus, complete_at: new Date()}})
    } else {
        console.log("mentira:",newStatus);
        await todo.update({$set: {todoStatus: newStatus, complete_at: null }})
    }
    
    return res.json({
        status: true,
        message: "Todo status change succesfully"
    })
}


todoMethods.getTodo = async (req, res) => {
    console.log("get todo"); 
    const todoId = req.params.id;

    const findTodo = await todoModel.findById(todoId);
    return res.json({
        status: true,
        todo: findTodo
    })
}

todoMethods.getTodos = async (req, res) => {
    console.log("get todos");
    console.log(req.userID);
    const userID = req.userID;
    const todos = await todoModel.find({"owner": userID});
    return res.json({
        status: true,
        todos: todos
    })
}

todoMethods.deleteTodo = async (req, res) => {
    console.log("delete todo");
    const todoID = req.params.id;
    await todoModel.findByIdAndRemove(todoID);
    return res.json({
        status: true,
        message: "Todo remove succesfully"
    })
}

module.exports = todoMethods;