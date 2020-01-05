const express = require('express');
const app = express();

let url = '';
let topUsers = [];

class WebServer {
    constructor(config, database) {
        const port = config.settings.webserverPort;
        const debug = config.funixbot.options.debug;
        this.database = database;
        this.server = app.listen(port, function () {
            if (debug) {
                url = 'http://localhost:' + port;
                console.log("Webserver running on " + url);
            } else {
                url = 'http://funixgaming.fr:' + port;
                console.log("Webserver running on " + url);
            }
            database.getUserClassment(function (data) {
                topUsers = data;
            });
        });
    }

    updateTopUsers() {
        this.database.getUserClassment(function (data) {
            topUsers = data;
        });
    }
}

app.get('/api/topusers', function (req, res) {
    res.send(topUsers);
});

module.exports = WebServer;