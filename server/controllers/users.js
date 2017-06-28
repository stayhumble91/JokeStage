const mongoose = require("mongoose");
const User = mongoose.model("User")

module.exports ={
    login: (req, res) => {
		console.log("login function", req.body)
		if(req.body.username){
			User.findOne({username: req.body.username})
				.then(user => {
					console.log("Found user")
					if(user){
						console.log("There is a user")
						if(user.password === req.body.password){
							console.log("Passwords match")
							console.log()
							req.session.user_id = user._id
							req.session.username = user.username
							res.json(true)
						}else{
							console.log("Username and Password doesn't match")
							res.json("Username and Password doesn't match")
						}
					}
				})
		} else {
			console.log("No name given")
			res.status(500).json("No name given")
		}

		// console.log("login function", req.body)
        // let new_user = new User(req.body)
        // new_user.save( (err, user) => {
		// 				if(err){
		// 					console.log("Error while saving... " + err)
		// 				}else{
		// 					// console.log(user)
		// 					req.session.user_id = new_user._id
		// 					req.session.username = new_user.username
		// 					// console.log("Logged in as " + req.session.username + " with id of " + req.session.user_id)
		// 					res.json(true)
		// 				}
		// 			})
                // .then((user) => {
                //     req.session.user_id = new_user._id
                //     req.session.username = new_user.username
                //     res.json(true)
                // })
                // .catch((err) => {
                //     console.log("User create error", err)
                //     res.status(500).json(err)
                // })
	},
	checkStatus: (req, res) => {
		if(req.session.user_id){
			res.json({username: req.session.username, _id: req.session.user_id})
		} else {
			// console.log("no user_id " + req.session.user_id)
			res.status(500).json("Not logged in")
		}
	},
	logout: (req, res) => {
		req.session.destroy()
		res.redirect("/")
	},

    get_current_user: (req, res) => {
		if(req.session.user_id){
			User.findOne({_id: req.body.user_id})
				.then((data) => {
					console.log("data retrieved... " + data)
					res.json(data)
				} )
				.catch( err => res.status(500).json (err0))
		} else {
			res.status(500).json("Not logged in")
		}
	},

	register: (req, res) => {
		// console.log("in contollers for registration")
		let user = new User(req.body);
        user.save()
            .then(() => {
				console.log("User info... id.. " + user)
                req.session.user_id = user._id
                req.session.username = user.username
                res.json(true);
            })
            .catch(() => {
                console.log("error while saving user ugh")
                res.status(500).json(err);
            })
	}

}