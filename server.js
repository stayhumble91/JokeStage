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

app.joke = "Waiting for the first comedian to take the stage..."
app.jokester = {user_id: "", username: ""}
app.queue = []
app.soundsToPlay = []
app.sound = ""
app.laugh = "./../../assets/Laugh03.wav"
app.boo = "./../../assets/Boo02.wav"
app.laughs = ["./../../assets/BigLaugh01.wav", "./../../assets/BigLaugh03.wav", "./../../assets/BigLaugh04.wav", "./../../assets/Laugh02.wav", "./../../assets/Laugh03.wav", "./../../assets/Laugh04.wav", "./../../assets/Laugh05.wav", "./../../assets/Laugh06.wav", "./../../assets/Laugh07.wav", "./../../assets/Laugh08.wav", "./../../assets/Laugh09.wav", "./../../assets/Laugh10.wav"]
app.boos = ["./../../assets/Boo01.wav", "./../../assets/Boo02.wav", "./../../assets/Boo03.wav", "./../../assets/Boo04.wav", "./../../assets/Boo05.wav", "./../../assets/Boo06.wav", "./../../assets/Boo07.wav", "./../../assets/Boo08.wav", "./../../assets/Boo09.wav"]
app.chuckles = ["./../../assets/Chuckle01.wav", "./../../assets/Chuckle02.wav", "./../../assets/Chuckle03.wav", "./../../assets/Chuckle04.wav", "./../../assets/Chuckle05.wav", "./../../assets/Chuckle06.wav", "./../../assets/Chuckle07.wav", "./../../assets/Chuckle08.wav"]
app.chuckle = ""
app.courtesyLaughs = ["./../../assets/CurtesyLaugh01.wav", "./../../assets/CurtesyLaugh02.wav", "./../../assets/CurtesyLaugh03.wav", "./../../assets/CurtesyLaugh04.wav", "./../../assets/CurtesyLaugh05.wav", "./../../assets/FakeLaugh01.wav"]
app.courtesyLaugh = ""
app.groans = ["./../../assets/Groan01.wav", "./../../assets/Groan02.wav", "./../../assets/Groan03.wav"]
app.groan = ""
app.heckles = ["./../../assets/DoesntDeserveABoo.wav", "./../../assets/DontKnowHowToLaugh.wav", "./../../assets/FaceLooksLikeAThumb.wav", "./../../assets/ForgotToLaugh.wav", "./../../assets/GetOffTheStage01.wav", "./../../assets/GetOffTheStage02.wav", "./../../assets/GetOffTheStage03.wav", "./../../assets/IPaidForThis.wav", "./../../assets/MommyWearsArmyBoots01.wav", "./../../assets/OhThisIsAwesome.wav", "./../../assets/PleaseGoHome.wav", "./../../assets/RaiseYourHand.wav", "./../../assets/ShavedMyLegs.wav", "./../../assets/SoBad02.wav", "./../../assets/SoundsLikeAFart.wav", "./../../assets/ThatIsJustAwful.wav", "./../../assets/ThatsHorrible01.wav", "./../../assets/ThatsCute.wav", "./../../assets/ThatsHorrible02.wav", "./../../assets/ThisSucks01.wav", "./../../assets/WasThatAJoke.wav", "./../../assets/WontWasteTomato.wav", "./../../assets/WeAreAllTheJoke.wav", "./../../assets/YouSuck01.wav", "./../../assets/YouSuck02.wav", "./../../assets/YouSuck03.wav"]
app.heckle = ""
app.cricket = "./../../assets/cricketSound.wav"



const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});

const io = require("socket.io").listen(server)

io.on("connection", (socket => {
	// console.log("New connection", socket.id)

	socket.emit("update_joke", app.joke)
	socket.emit("update_jokester", app.jokester)
	socket.emit("update_queue", app.queue)
	// socket.emit("send_sound", app.sound)

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

	socket.on("laugh", () => {
		let idx = Math.floor(Math.random()*app.laughs.length)
		app.laugh = app.laughs[idx]
		console.log("laughing " + app.laugh)
		if(app.joke.length > 0){
		io.emit("send_sound", app.laugh)
		}
	})

	socket.on("chuckle", () => {
		let idx = Math.floor(Math.random()*app.chuckles.length)
		app.chuckle = app.chuckles[idx]
		console.log("chuckling " + app.chuckle)
		if(app.joke.length > 0){
		io.emit("send_sound", app.chuckle)
		}
	})

	socket.on("boo", () => {
		console.log("booing " + app.boo)
		let idx = Math.floor(Math.random()*app.boos.length)
		app.boo = app.boos[idx]
		if(app.joke.length > 0){
		io.emit("send_sound", app.boo)
		}
	})

	socket.on("groan", () => {
		let idx = Math.floor(Math.random()*app.groans.length)
		app.groan = app.groans[idx]
		console.log("groaning " + app.groan)
		if(app.joke.length > 0){
		io.emit("send_sound", app.groan)}
	})

	socket.on("courtesyLaugh", () => {
		let idx = Math.floor(Math.random()*app.courtesyLaughs.length)
		app.courtesyLaugh = app.courtesyLaughs[idx]
		console.log("courtesy laughing " + app.courtesyLaugh)
		if(app.joke.length > 0){
		io.emit("send_sound", app.courtesyLaugh)}
	})

	socket.on("heckle", () => {
		let idx = Math.floor(Math.random()*app.heckles.length)
		app.heckle = app.heckles[idx]
		console.log("heckling " + app.heckle)
		if(app.joke.length > 0){
		io.emit("send_sound", app.heckle)
		}
	})

	socket.on("cricket", () => {
		console.log("heckling " + app.cricket)
		if(app.joke.length > 0){
			io.emit("send_sound", app.cricket)
		}
	})
	

}))