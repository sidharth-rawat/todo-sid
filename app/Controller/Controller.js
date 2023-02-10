const http_formatter = require('../../_util/Formtter')
const Schema = require('../model/todo')
const { StatusCodes } = require('http-status-codes');

const  getTodo = async(request,response)=>{
    try {
        const {pageNo, perPage} = request.query;
        const users = await Schema.find({isDeleted: false}).skip(perPage * (pageNo - 1)).limit(perPage);
    
        return response.status(StatusCodes.OK).json(http_formatter(users, "User got successfully"));
        
} catch (error) {
    return response.status(StatusCodes.BAD_REQUEST).json(http_formatter({}, "somethig went wrong in get",false));
    
}

}
 const createTodo= async (request,response)=>{
    try {
        const users = await Schema.create(request.body);
        return response.status(StatusCodes.CREATED).json(
            http_formatter(users, "User created successfully")
        );
        
    } catch (error) {
        return response.status(StatusCodes.BAD_REQUEST).json(http_formatter(error, "Something went wrong, please try again", false));
   
    } 
 }
const updateTodo = async  (request,response)=>{
    try {
    const { title, content }  =  request.body;
    const query ={_id : request.params.id}
            if(!query) {
            throw (new Error('users ID is mandatory'));
        }
    const users = await Schema.findByIdAndUpdate(
        query,{
            title,
            content
        }
    );
        return response.status(StatusCodes.OK).json(http_formatter(users, "Scuccse"));
               
        
} catch (error) {
    return response.status(StatusCodes.BAD_REQUEST).json(http_formatter(error, "SOmething went wrong in update", false));
        
}   
}
const deleteTodo = async (request,response)=>{
try {
    const {todo_id} = request.params;
    const deleted = await Schema.deleteOne(todo_id, {isDeleted: true});
    return response.status(StatusCodes.OK).json(http_formatter(deleted, "Card deleted successfully"));
    
} catch (error) {
    return response.status(StatusCodes.BAD_GATEWAY).json(http_formatter(error, "SOmething went wrong in delete", false));

}
}
module.exports = {getTodo ,createTodo ,deleteTodo,updateTodo}