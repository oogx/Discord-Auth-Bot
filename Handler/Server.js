const App = require('express')();
module.exports = (client) => {
    App.listen("80", () => {
        App.get("/", (req, res) => {
            res.status(200).end("Discord Bot Is Running!")
        });
        App.get("/api/check", (req, res) => {
            if ( req.query.key ) { // http://localhost/api/check?key=jR1yWX-kNGVYc-Nelwc5-VY9Q78
                client.MongoSchema.find().then((index) => {
                    index.forEach(async (data) => {
                        if ( data.Key == req.query.key ) {
                            if ( data.Blacklisted == "true" ) {
                                res.status(200).end({ "status": "Blacklisted" })
                            } else {
                                res.status(200).end({ "status": "Valid" })
                            }
                        } else {
                            res.status(200).end({ "status": "Invalid Key" })
                        }
                    })
                })
            } else {
                res.status(200).end({ "status": "Invalid" })
            }
       });
    });
}