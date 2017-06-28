const path = require("path")
const users = require("./../controllers/users.js")
const queue = require("./../controllers/queues.js")

module.exports = (app) => {
		app.post("/login", users.login);
		app.get('/checkStatus', users.checkStatus);
		app.get("/logout", users.logout)
		app.get("/get_current_user", users.get_current_user)
		app.post("/join_queue", queue.join_queue)
		app.get("/get_queue", queue.get_queue)
		app.get("/get_jokester", queue.get_jokester)
		app.post("/register", users.register)

    app.get("*", (req, res) => {
		res.sendFile(path.resolve("./client/dist/index.html"))
	})
}