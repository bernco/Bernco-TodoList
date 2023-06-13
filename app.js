// require dependencies
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const getDate = require(__dirname + "/mdate.js");
const mongoose = require("mongoose");

// initialise our express app
const app = express();

// use static public files
app.use(express.static(__dirname + "/public"));

// define port 3000
const port = process.env.PORT || 3000;

// set ejs view engine
app.set('view engine', 'ejs');

// use bodyparser
app.use(bodyParser.urlencoded({extended: true}));

//connect mongoose by creating a todoDB database
mongoose.connect("mongodb://localhost:27017/todoDB");

// create a mongoose todolist Schema
const todoListSchema = mongoose.Schema({
    task: {
        type: String,
        required: true
    }
});

const listSchema = {
    name: {
        type: String,
        required: true
    },
    todoItems: [todoListSchema]
};

// create a todolist collection model
const TodoList = mongoose.model('TodoList', todoListSchema);
const CustomList = mongoose.model('CustomList', listSchema);

// get todays date
const mdate = getDate.getDate();

// route for help and sponsor
app.get('/sponsor', (req, res)=>{
    res.render('sponsors');
})

app.get('/help', (req, res)=>{
    res.render('help');
})
// express routing parameter
app.get('/q/:taskType', (req, res) => {
    const taskType = req.params.taskType;
    CustomList
        .findOne({name: taskType})
        .then((foundItem) => {
            if (!foundItem) {
                // create new list
                const customlist = new CustomList({name: taskType, todoItems: []});
                customlist
                    .save()
                    .then((out) => {
                        res.redirect("/q/" + taskType);
                    });

            } else {
                res.render('list', {
                    kindOfDay: mdate,
                    todos: foundItem.todoItems,
                    listType: taskType,
                    taskType: taskType
                },)
            }
        });
});


// define get route to list.ejs
app.get("/", (req, res) => {
    TodoList
        .find({})
        .then(foundItems => {
            res.render('list', {
                kindOfDay: mdate,
                todos: foundItems,
                listType: "regular",
                taskType: "regular"
            },);
        });
});

// handle post route on home
app.post("/", (req, res) => {
    const newTodo = req.body.newTask;
    const todoListName = req.body.mlist;

    const todoItem = new TodoList({task: newTodo});

    if (todoListName === "regular") {
        todoItem
            .save()
            .then((out) => {
                res.redirect('/');
            })
            .catch((err) => {
                res.redirect('/');
                console.error(err);
            })
        } 
        else {
        CustomList
            .findOne({name: todoListName})
            .then((foundTodoList) => {
                foundTodoList
                    .todoItems
                    .push(todoItem);
                foundTodoList
                    .save()
                    .then((out) => {
                        res.redirect('/q/' + todoListName);
                    })
                    .catch((err) => {
                        res.redirect('/q/' + todoListName);
                        console.error(err);
                    });
            });
    }
});

// delete route for deleted todos
app.post("/delete", (req, res) => {
    const todoId = req.body.checked;
    const todoListName = req.body.listName;
    if (todoListName === "regular") {
        TodoList
            .deleteOne({_id: todoId})
            .then((outp) => {
                console.log('successfully deleted');
            });
        res.redirect("/");
    } else {
        CustomList.findOneAndUpdate({
            name: todoListName
        }, {
            $pull: {
                todoItems: {
                    _id: todoId
                }
            }
        }).then((foundList)=>{
            res.redirect(`/q/${todoListName}`);
        }).catch((err)=>{
            console.error(err)
        })
    }

});

// listen to our app listen to the defined porr
app.listen(port, () => {
    console.log("Server is running on port " + port);
})