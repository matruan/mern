const express = require('express');
const router = express.Router();
const {addTodo, updateTodo, getTodo, getTodos, deleteTodo, updateStatusTodo} = require('../controllers/todo.controller');
const { verifyToken } = require('../controllers/verify.controller')


router.post('/', verifyToken, addTodo);
router.put('/:id', verifyToken, updateTodo);
router.get('/:id', verifyToken, getTodo);
router.get('/', verifyToken, getTodos);
router.delete('/:id', verifyToken, deleteTodo);
router.post('/status/:id', verifyToken, updateStatusTodo);


module.exports = router;