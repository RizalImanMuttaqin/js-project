const express       = require('express');
const app           = express();
const bodyParser    = require('body-parser');
const cors          = require('cors');
const PORT          = 4000;
const mongoose      = require('mongoose');
let Todo            = require('./model/todo.model');
const router    = express.Router();

app.use(cors());
app.use(bodyParser());
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
})); 

router.get('/', function(req, res){
    Todo.find(function(err, todos){
        if(err){
            console.log(err)
        }else{
            res.json(todos);
        }
    });
});

router.route('/adds').post(function(req, res){
    // let array = req.body.array.replace(/]|[/g,"");
    // console.log(array);
    // // array.map(function(val, i){
    // //     console.log(i+"---"+val);
    // // });
    // res.send(array);
});


router.route('/:id').get(function(req, res){
    let id = req.params.id;
    // res.json(id);
    Todo.findById(id, function(err, todo){
        res.json(todo);
    })
}); 

router.post('/add', function(req, res){
    let todo = new Todo(req.body);
    todo.save()
        .then(todo=>{
            res.status(200).json({'todo':'todo addes successfully'});
        })
        .catch(err =>{
            res.status(400).send('adding new todo failed');
        });
});

router.route('/update/:id').post(function(req, res){
    Todo.findById(req.params.id, function(err, todo){
        if(!todo){
            res.status(404).send("data is not found");
        }else{
            todo.todo_description = req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_priority    = req.body.todo_priority;
            todo.todo_completed   = req.body.todo_completed;
            
            todo.save().then(todo=>{
                res.json("Todo Updated");
            })
            .catch(err=>{
                res.status(400).send("Update not possible");
            });
        }
    });
});

router.route("/delete").post(function(req, res){
    console.log(req.body.id);
    Todo.deleteOne({"_id" :req.body._id}, function(err, res){
        console.log(err);
    })
    .then(todo=>{
        res.status(200).json("todo deleted");
    })
    .catch(err =>{
        res.status(400).send("failed delete");
    });
});

// router.route("/delete").get(function(req, res){
//     Todo.deleteOne({"_id" :req.params._id}, function(err, res){
//         console.log(err);
//     })
//     .then(todo=>{
//         res.status(200).json("todo deleted");
//     })
//     .catch(err =>{
//         res.status(400).send("failed delete");
//     });
// });

app.use('/todos', router); 

app.listen(PORT, function(){
    console.log("Server is running on port "+ PORT);
});

mongoose.connect('mongodb://localhost:27017/todos', {useNewUrlParser: true});

const connection = mongoose.connection;

connection.once('open', function(){
    console.log("Mongo DB connected");
});

