const User = require('../models/users');
const Todo = require('../models/todos')
const JWT  = require('jsonwebtoken');
const Bcrypt = require('../helpers/bcrypt')
const { JWT_SECRET } = require('../config/config')
signToken = async function (user) {
    // console.log(JWT_SECRET);  
    return "Bearer "+JWT.sign({
        iss : "authapp",
        sub : user.id,
        iat : new Date().getTime(),
        exp : new Date().setDate(new Date().getDate() + 1) 
}, JWT_SECRET);
}

module.exports = {
    signUp : async (req, res, _next) => {
        const { email, password } = req.value.body;
        
        let foundUser = await User.findOne({$or: [{'local.email': email}, {'facebook.email': email}, {'google.email': email}]});
        console.log("foundUser", foundUser);
        if(foundUser){
            // console.log("stop becauce alreadey")
            return res.status(403).json({
                msg : "user failed to create",
                error : "email alrready sign up"
            });
        }

        //if user already login it with other 3 party email system will refuse that email
        // //already sign up with google
        // foundUser = await User.findOne({"google.email" : email});
        // if(foundUser){
        //     foundUser.methods.push('local');
        //     foundUser.local = {
        //         email : email,
        //         password : password
        //     }
        //     await foundUser.save();
            
        //     const token = signToken(foundUser);
        //     return res.status(200).json({ 
        //         msg : "success link account to google",
        //         token : token })
        // }

        // foundUser = await User.findOne({"facebook.email" : email});
        // if(foundUser){
        //     foundUser.methods.push('local');
        //     foundUser.local = {
        //         email : email,
        //         password : password
        //     }
        //     await foundUser.save();
            
        //     const token = signToken(foundUser);
        //     console.log(token);
        //     return res.status(200).json({ 
        //         msg : "success link account to facebook",
        //         token : token })
        // }
        // console.log(Bcrypt.hashingPassword(password));
        const user = new User({
            methods : ['local'],
            local : {
                email : email,
                password : await Bcrypt.hashingPassword(password)
            }
        });
        user.save().then( user =>{
            signToken(user).then((token)=>{
                res.status(200).json({
                    msg : "user created",
                    new_user : user,
                    token : token,
                })
            })
        })
        .catch(err=>{
            res.status(400).send("Sign up failed "+err);
        });
        // user.save();
    },
    
    signIn : async (req, res, _next) => {
        //generate token
        console.log("SignIn");
        signToken(req.user).then((token)=>{
            res.status(200).json({
                msg : "Sign in successfull",
                token : token,

            })
        });
    },
    
    dashboard : async (req, res, _next) => {
        res.json({
            resource : "resource",
            methods : req.user.methods
        })
    },
    
    googleOauth : async (req, res, _next) => {
        signToken(req.user).then((token)=>{
            res.status(200).json({
                msg : "Sign in with google successfull",
                token : token,
            })
        });
    },

    facebookOauth : async (req, res, _next) => {
        signToken(req.user).then((token)=>{
            res.status(200).json({
                msg : "Sign in with facebook successfull",
                token : token,
            })
        });
    },

    linkGoogle : async (req, res, _next) => {
        // console.log("req controoler usres", req)
        // console.log("req controoler usres", req)
        if(req.account == 'error'){
            res.status(200).json({
                success : false,
                methods : req.user.methods,
                msg     : "email already linked with other users"
            })
        }else{
            res.status(200).json({
                success : true,
                methods : req.user.methods,
                msg     : "Successfully linked account with google"
            })
        }
        
    },

    unlinkGoogle : async (req, res, _next) => {
        if(req.user.google){
            req.user.google = undefined;
        }
        const googleStriPos = req.user.methods.indexOf('google')
        if(googleStriPos >=0 ){
            req.user.methods.splice(req.user.methods.indexOf('google'), 1);
        }
        await req.user.save();
        res.status(200).json({
            success : true,
            methods : req.user.methods,
            msg     : "Successfully unlinked account with google"
        })
    },


    linkFacebook : async (req, res, _next) => {
        if(req.account == 'error'){
            res.status(200).json({
                success : false,
                methods : req.user.methods,
                msg     : "facebook already linked with other users"
            })
        }else{
            res.status(200).json({
                success : true,
                methods : req.user.methods,
                msg     : "facebook linked account with google"
            })
        }
    },

    unlinkFacebook : async (req, res, _next) => {
        if(req.user.facebook){
            req.user.facebook = undefined;
        }
        const facebookStriPos = req.user.methods.indexOf('facebook')
        if(facebookStriPos >=0 ){
            req.user.methods.splice(req.user.methods.indexOf('facebook'), 1);
        }
        await req.user.save();
        res.status(200).json({
            success : true,
            methods : req.user.methods,
            msg     : "Successfully unlinked account with facebook"
        })
    },


    todoList : async (_req, res, _next) => {
        try{
            const data = await Todo.aggregate([
                { $lookup:
                    {
                        from: 'users',
                        localField: 'todo_create_by',
                        foreignField: '_id',
                        as: 'create_by',
                    },
                }
            ]);
            res.status(200).json({
                success : true,
                data    : data,
                msg     : "success get todos"
            })
        } catch(err){
            res.status(200).json({
                success : false,
                msg     : err
            })
        }
    },

    createTodo : async (req, res, _next) => {
        try{
            // console.log("ini req.user", req.user);
            const user_id = req.user._id;
            let newTodo = new Todo({
                todo_description : req.body.description,
                todo_responsible : req.body.responsible,
                todo_priority    : req.body.priority,
                todo_create_by   : user_id,
            })
            newTodo = await newTodo.save();
            res.status(200).json({
                success : true,
                data    : newTodo,
                msg     : "successfully create todo"
            })
        } catch(err){
            res.status(200).json({
                success : false,
                msg     : err
            })
        }
    },

    detailTodo : async (req, res, _next) => {
        try{
            // console.log("ini req.user", req.user);
            let user_id = req.user._id;
            let todo_id = req.params.id;
            data = await Todo.findOne({$and: [{_id: todo_id}, {todo_create_by: user_id}]});
            res.status(200).json({
                success : true,
                data    : data,
                msg     : "success get todo"
            })
        } catch(err){
            res.status(200).json({
                success : false,
                msg     : err
            })
        }
    },

    todoListId : async (req, res, _next) => {
        try{
            // console.log("ini req.user", req.user);
            let user_id = req.user._id;
            data = await Todo.aggregate([
                {$match:{ todo_create_by : user_id }},
                { $lookup:
                    {
                        from: 'users',
                        localField: 'todo_create_by',
                        foreignField: '_id',
                        as: 'create_by'
                    }
                }
              ]);

            console.log(data);
            res.status(200).json({
                success : true,
                methods : req.user.methods,
                data    : data,
                msg     : "success get todo by id_user"
            })
        } catch(err){
            res.status(200).json({
                success : false,
                msg     : err
            })
        }
    },

    todoUpdate : async (req, res, _next) => {
        try{
            // console.log("ini req.user", req.user);
            let user_id = req.user._id;
            let todo_id = req.params.id;
            let todo = await Todo.findOne({$and: [{_id: todo_id}, {todo_create_by: user_id}]});
            if(!todo){
                return res.status(200).json({
                    success : false,
                    msg     : "data not found"
                })
            }else{
                console.log(todo);
                todo.todo_description = req.body.description;
                todo.todo_responsible = req.body.responsible;
                todo.todo_priority    = req.body.priority;
                todo.todo_completed   = req.body.completed;
                todo.todo_completed   = req.body.completed;
                todo = await todo.save();
                res.status(200).json({
                    success : true,
                    data    : todo,
                    msg     : "success update todo"
                })
            }
        } catch(err){
            res.status(200).json({
                success : false,
                msg     : err
            })
        }
    },
    
    todoDelete : async (req, res, _next) => {
        try{
            // console.log("ini req.user", req.user);
            let user_id = req.user._id;
            let todo_id = req.params.id;
            let todo = await Todo.findOne({$and: [{_id: todo_id}, {todo_create_by: user_id}]});
            if(!todo){
                return res.status(200).json({
                    success : false,
                    methods : req.user.methods,
                    msg     : "data not found"
                })
            }else{
                todo = await Todo.deleteOne({$and: [{_id: todo_id}, {todo_create_by: user_id}]});
                res.status(200).json({
                    success : true,
                    // data    : todo,
                    methods : req.user.methods,
                    msg     : "todo deleted"
                })
            }
        } catch(err){
            res.status(200).json({
                success : false,
                msg     : err
            })
        }
    },
};
