const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

function postAIImageId(context) {
    return axios.post(
        'https://cloud.leonardo.ai/api/rest/v1/generations',
        {
            'height': 512,
            'modelId': '6bef9f1b-29cb-40c7-b9df-32b51c1f67d3',
            'prompt': context,
            'width': 512
        },
        {
            headers: {
                'accept': 'application/json',
                'authorization': 'Bearer ' + process.env.LEONARDO_API_KEY,
                'content-type': 'application/json'
            }
        }
    );
}

function getAIImage(id) {
    return axios.get('https://cloud.leonardo.ai/api/rest/v1/generations/' + id, {
        headers: {
            'accept': 'application/json',
            'authorization': 'Bearer ' + process.env.LEONARDO_API_KEY
        }
    });
}

module.exports = {postAIImageId, getAIImage}