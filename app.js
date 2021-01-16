const http = require('http');
var cors = require('cors')

var path = require('path');

const hostname = '0.0.0.0';
const port = 3000;

var express = require('express');
var app = express();

app.use(cors());

function cli(cmd){
    const { exec } = require("child_process");
    console.log(`Executing: ${cmd}`)
    exec(cmd, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
}

//assuming app is express Object.
app.get('/',function(req,res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/mute', function(req, res){
    cli('pactl set-sink-mute @DEFAULT_SINK@ toggle');
});

app.get('/volume/:action/:v', function(req, res){
    cli('pactl set-sink-volume @DEFAULT_SINK@ ' + (req.params.action === 'increase' ? '+' : '-') + req.params.v + '%');
});


app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});