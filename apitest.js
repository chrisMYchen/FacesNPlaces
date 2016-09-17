var request = require('request');
request({
    url: 'https://api.projectoxford.ai/emotion/v1.0/recognize', //URL to hit
    method: 'POST', //Specify the method
    headers: { //We can define headers too
        'Ocp-Apim-Subscription-Key':
    }
}, function(error, response, body){
    if(error) {
        console.log(error);
    } else {
        console.log(response.statusCode, body);
    }
});
