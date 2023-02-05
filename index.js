const express = require("express");
const bodyParser = require("body-parser");
const colors = require('colors');
const app = express();
const port = 5000;
const prompt = require("prompt-sync")();
let p = document.getElementById("command")
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

colors.enable()
let command = ''

function betterOutput(string) {
    return string.replace(/^.*?: /mgi, "");
}

function getInput(){
    command = prompt("> ");
    if (command === "exit") process.exit(1);  
    p.innerHTML = command
    return
}

function print(text){
    console.log("\n"+text+"\n")
}

app.get("/", (req, res) => {
    getInput();
    res.send(command);
});

app.post("/", (req, res) => {
    let successful = req.body.successful
    let output = req.body.data

    if (successful === "true"){
        print(output.green)
    }else{
        print(betterOutput(output).red)
    }

    res.sendStatus(200)
});

app.listen(port,"https://roblox-terminal-site.netlify.app/", () => {
    console.log(`Example app listening on port ${port}`);
});