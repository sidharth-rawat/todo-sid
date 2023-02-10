const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const todoSchema= new Schema({

  title:{
    type:String,
    require:true
  },

  content:{
    type : String,
    require: false
  },
  completed:{
    type:Boolean,
    default: false
  }

}, {
    timestamps: true,
});
module.exports = mongoose.model('Todo', todoSchema);