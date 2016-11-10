var appRouter = function(app) {
    app.get("/", function(req, res) {
    res.send("Hello World");
    });
    app.get("/account", function(req, res) {
        var accountMock = {
            "username": "Bharath",
            "password": "hello",
            "twitter": "@nraboy"
        }
        if(!req.query.username) {
            return res.send({"status": "error", "message": "missing username"});
        } else if(req.query.username != accountMock.username) {
            return res.send({"status": "error", "message": "wrong username"});
        } else {
            return res.send(accountMock);
        }
    });
   
    app.post("/accountPost", function(req, res) {
        if(!req.body.username || !req.body.password || !req.body.twitter) {
            return res.send({"status": "error", "message": "missing a parameter"});
        } else {
            return res.send(req.body);
        }
    });
    //athena api gateway
    app.get("/athenaservice", function(req,res) {
        var options = {
            host: '10.211.116.221',
            port: 3000,
            path: '/account?username=bharath',
            method: 'GET'
        };

        http.request(options, function(res) {
            console.log('STATUS: ' + res.statusCode);
            console.log('HEADERS: ' + JSON.stringify(res.headers));
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                console.log('BODY: ' + chunk);
            });
        }).end();
    });

}

module.exports = appRouter;


