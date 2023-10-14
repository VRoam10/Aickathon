var express = require('express');
var http = require('http');
var path = require("path");
var bodyParser = require('body-parser');
var fs = require('fs');
var chatGPT = require("./chatGPT");
var leonardo = require("./leonardo")
var list = require("./createlist");

var app = express();
var server = http.createServer(app);

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'./public')));

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname,'./public/index.html'));
});

app.get("/styles", function(req,res) {
    res.sendFile(path.join(__dirname,'./styles/styles.css'));
})

app.post("/typearticle", function(req,res) {
    var data = fs.readFileSync(__dirname + '/public/formType.html', 'utf-8');

    if (req.body.article) {
        var newValue = data.replace("article#12345", req.body["article"]);
        res.send(newValue);
    } else
    res.status(400).send("Wrong Request");

    
})

app.post('/moderation', async(req,res) => {
    var data = fs.readFileSync(__dirname + '/public/moderation.html', 'utf-8');
    newData = "<ul>";

    if (req.body.article && Object.keys(req.body).length > 1) {
        for (const key in req.body) {
            var reponse;

            if (Object.hasOwnProperty.call(req.body, key) && key != "article") {
                if (key == "enfant") {
                    reponse = await chatGPT.enfant_prompt(req.body.article);
                    prompt_img = await chatGPT.enfant_prompt_img(req.body.article);
                    var result = await leonardo.postAIImageId(prompt_img.choices[0].message.content);
                    id = result.data.sdGenerationJob.generationId;
                }
                else if (key == "ado") {
                    reponse = await chatGPT.ado_prompt(req.body.article);
                    prompt_img = await chatGPT.ado_prompt_img(req.body.article);
                    var result = await leonardo.postAIImageId(prompt_img.choices[0].message.content);
                    id = result.data.sdGenerationJob.generationId;
                }
                newData += await list.createList(reponse.choices[0].message.content, id);
            }
        }

        newData += "</ul>";

        var newValue = data.replace("article#12345", newData);

        res.send(newValue);
    } else
    res.status(400).send("Wrong Request");

});

app.get('/postarticle', function(req,res){
    res.sendFile(path.join(__dirname,'./public/postArticle.html'));
});

server.listen(3000,function(){ 
console.log("Server listening on port: 3000");
})