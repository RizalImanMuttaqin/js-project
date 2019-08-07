const express       = require('express');
const app           = express();
const bodyParser    = require('body-parser');
// const cors          = require('cors');
const PORT          = 5000;
const morgan        = require('morgan');
const mongoose      = require('mongoose');


// app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser());
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
})); 


app.use("/users", require('./routes/users')); 

app.listen(PORT, () => {
    console.log("Server is running on port "+ PORT);
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/todos', {useNewUrlParser: true});
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const connection = mongoose.connection;
connection.once('open', function(){
    console.log("Mongo DB connected");
});

