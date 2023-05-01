

const express = require('express');
const _controller  = require('../Controller/business');
const router = express.Router();
// list all data
router.get('/', _controller.findAll)
router.get('/:employeeId', _controller.findOne)
router.delete('/:employeeId', _controller.delete)
router.put('/:employeeId', _controller.update)
router.post('/', _controller.create);
router.delete('/',_controller.deleteAll);

module.exports=router;