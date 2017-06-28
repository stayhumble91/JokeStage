const mongoose = require("mongoose");
const Queue = mongoose.model("Queue")

module.exports ={
    join_queue: (req, res) => {
        if(req.body){
            let user = new Queue(req.body)
            user.save()
                .then(() => {
                    res.json(true)
                })
                .catch((err) => {
                    console.log("error adding user to queue")
                    res.status(500)
                })
        } else {
            console.log("no user to add to queue")
            res.status(500)
        }
    },
    get_queue: (req, res) => {
        console.log("finding users in queue")
        Queue.find({})
            .then( data => res.json(data))
            .catch( err => res.status(500).json( err ))
	},
    get_jokester: (req, res) => {
        console.log("In queues controllers...  Finding first in queue?")
        Queue.findOneAndRemove({})
            .then( data => res.json(data))
            .catch( err => res.status(500).json( err ))
    }
}