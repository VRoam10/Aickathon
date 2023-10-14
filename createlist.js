var leonardo = require("./leonardo");
const delay = ms => new Promise(res => setTimeout(res, ms));

async function createList(prompt, id) {
    string = "<li><p>";
    string += prompt;
    string += "</p>" +
    "<label class='switch'>" +
    "<input type='checkbox'>" +
    "<span class='slider round'></span>" +
    "</label>";
    
    await delay(20000);
    var res = await leonardo.getAIImage(id);
    url = res.data.generations_by_pk.generated_images[0].url;
    string += "<img src='" + url + "' />";
    string += "</li>";

    return string;
}


module.exports = {createList}