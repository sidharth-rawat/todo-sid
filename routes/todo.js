const express = require('express');
const _controller  = require('../Controller/Controller');
const router = express.Router();
// list all data
router.get('/', _controller.getTodo )
// create data
router.post('/create', _controller.createTodo);
//update data
router.put('/:id',_controller.updateTodo);
// delete data
router.delete('/:id',_controller.deleteTodo);
module.exports=router;