const http = require('http');
const { exec } = require("child_process");

var cors = require('cors')

var path = require('path');

const hostname = '0.0.0.0';
const port = 3000;

var express = require('express');
var app = express();

    
app.use(cors());

function cli(cmd){
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

    res.sendStatus(200).send();
});

app.get('/volume/:action/:v', function(req, res){
    cli('pactl set-sink-volume @DEFAULT_SINK@ ' + (req.params.action === 'increase' ? '+' : '-') + req.params.v + '%');

    res.sendStatus(200).send();
});

app.get('/mouse/click/left', function(req, res){
    cli('xdotool click 1');
    
    res.sendStatus(200).send();
});

app.get('/mouse/click/middle', function(req, res){
    cli('xdotool click 2');

    res.sendStatus(200).send();
});

app.get('/mouse/click/right', function(req, res){
    cli('xdotool click 3');

    res.sendStatus(200).send();
});

app.get('/mouse/scroll/up', function(req, res){
    cli('xdotool click 4');

    res.sendStatus(200).send();
});

app.get('/mouse/scroll/down', function(req, res){
    cli('xdotool click 5');

    res.sendStatus(200).send();
});

app.get('/mouse/x/:x/y/:y', function(req, res){
    cli('xdotool mousemove ' + req.params.x + ' ' + req.params.y);

    res.sendStatus(200).send();
});

app.get('/alt/down', function(req, res){
    cli('xdotool keydown alt');

    res.sendStatus(200).send();
});

app.get('/alt/up', function(req, res){
    cli('xdotool keyup alt');

    res.sendStatus(200).send();
});

app.get('/ctrl/down', function(req, res){
    cli('xdotool keydown ctrl');

    res.sendStatus(200).send();
});

app.get('/ctrl/up', function(req, res){
    cli('xdotool keyup ctrl');

    res.sendStatus(200).send();
});

app.get('/tab', function(req, res){
    cli('xdotool key Tab');

    res.sendStatus(200).send();
});

app.get('/key/:key', function(req, res){
    cli('xdotool key ' + req.params.key);

    res.sendStatus(200).send();
});

app.get('/cli', function(req, res){
    cli(req.query.cmd);

    res.sendStatus(200).send();
});

app.get('/kill/active-window', function(req, res){
    cli('xdotool getactivewindow | xargs xdotool windowkill');

    res.sendStatus(200).send();
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});