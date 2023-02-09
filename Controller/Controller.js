const http_formatter = require('../_util/Formtter')
const Schema = require('../model/todo')
const  getTodo = async(request,response)=>{

    
    // const {pageNo = 1, perPage = 20} = request.query; // can be undefined in the query params.
    // const total_count = await Product.find({isDeleted: false}).count();
    // const has_more = total_count > pageNo * perPage;
    // const product = await Schema.find({isDeleted: false}).skip(perPage * (pageNo - 1)).limit(perPage);
    const {pageNo, perPage} = request.query;
    const users = await Schema.find({}).skip(perPage * (pageNo - 1)).limit(perPage);

    return response.status(200).json(http_formatter(users, "User got successfully"));


    // const page = req.query.page || 1 ;
    // const limit = req.query.limit ||  3;
    // const skip = (page-1)*limit;


    // Todo.find()
    // .skip(parseInt(skip))
    // .limit((parseInt(limit)))
    // .exec((err,todos)=>{
      

    //      if (err) {
    //     return res.json({error:err});

    //      }
    //      return res.json({data:todos});
    // });
}
 const createTodo= async (request,response)=>{
    try {
        const product = await Schema.create(request.body);
        return response.status(201).json(
            http_formatter(product, "User created successfully"),
        );
        
    } catch (err) {
        return response.status(400).json(http_formatter(err, "Something went wrong, please try again", false));
   
    }
    // const todo = Todo({
    //     title:req.body.title,
    //     content: req.body.content,
    // });
    // todo.save((err,todo)=>{
    //     if (err) {
    //         return res.json({error:err});
    
    //     }
    //     return res.json({data:todo});
    // }); 
 }
const updateTodo = async  (request,response)=>{
try {
    
    const {todo_id} = request.params;
        if(!todo_id) {
            throw (new Error('Product ID is mandatory'));
        }
        const current_product = await Product.findById(product_id);
        if(!current_product) {
            return response.status(400).json(http_formatter({}, "Invalid user id", false));
        }
        
} catch (error) {
    
}
    // Todo.findById(req.params.id).exec((err,todo)=>{
    //     if (err) {
    //         return res.json({error:err});
    //  }
    //  todo.title = req.body.title ?? todo.title;
    //  todo.content = req.body.content ?? todo.content;
    //  todo.completed = req.body.completed ?? todo.completed;
    //  todo.save((err, todo)=>{
    //     if (err) {
    //         return res.json({error:err});
    //  }return res.json({data:todo});
    //  })
    // })
    
}
const deleteTodo = async (request,response)=>{
try {
    const {todo_id} = request.params;
    const deleted = await Cart.findOneAndUpdate(todo_id, {isDeleted: true});
    return response.status(200).json(http_formatter(deleted, "Card deleted successfully", true));
    
} catch (error) {
    
}

    // Todo.remove({
    //     _id : req.params.id
    // }).exec((err,result)=>{
    //     if (err) {
    //         return res.json({error:err});
    //  }if (result.deleteCount == 0) {
    //     return res.json({data:"No todo found in id"});
    //  }
    //     return res.json({data:"deleted successfully"});
    // })

}
module.exports = {getTodo ,createTodo ,deleteTodo,updateTodo}