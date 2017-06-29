let express = require("express");
let path = require("path");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
const session = require("express-session") 



mongoose.Promise = global.Promise;

let app = express();

let PORT = 8000;

app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, "./client/dist")));


app.use(session({
	secret: "My Secret key...  Buwahahahaha",
	resave: false,
	saveUninitialized: true
}))


require('./server/config/mongoose.js');

let routes_setter = require('./server/config/routes.js');

routes_setter(app);

app.joke = "Why did the chicken cross the road?...  To get to the other side."
app.jokester = {user_id: "", username: ""}
app.queue = []

const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});

const io = require("socket.io").listen(server)

io.on("connection", (socket => {
	// console.log("New connection", socket.id)

	socket.emit("update_joke", app.joke)
	socket.emit("update_jokester", app.jokester)
	socket.emit("update_queue", app.queue)

	socket.on("join_queue", (user) => {
		app.queue.push(user)
		io.emit("update_queue", app.queue)
	})

	socket.on("next_jokester", () => {
		if(app.queue.length>0){
			app.joke = ""
			app.jokester = app.queue[0]
			for(var i=0; i<app.queue.length; i++){
				app.queue[i] = app.queue[i+1]
			}
			app.queue.pop()
			io.emit("update_joke", app.joke)
			io.emit("update_queue", app.queue)
			io.emit("update_jokester", app.jokester)
		}else{
			app.joke = ""
			app.jokester = {user_id: "", username: ""}
			io.emit("update_joke", app.joke)
			io.emit("update_queue", app.queue)
			io.emit("update_jokester", app.jokester)
		}
	})

	socket.on("share_joke", (data) => {
		console.log("in server.js to share joke")
		console.log(" data received is " + data)
		app.joke = data
		io.emit("update_joke", app.joke)
	})
}))