var request = require("request");
var instagram = require("./instagram.js");
/*

takes a lot of image urls and finds the most common emotion in them

-images = an array of url images
-return = the most common emotion


*/

function findMyEmotion(images) {
	var promises = images.map(processImage);

	return Promise.all(promises)
		.then(function (analysis) {
			return analysis.reduce(function (imageAnalysis, cur) {
				Object.keys(imageAnalysis).forEach(function (attitude) {
					cur[attitude] += imageAnalysis[attitude];
				});
				return cur
			}, {
				'anger':0,
				'contempt':0,
				'disgust':0,
				'fear':0,
				'happiness':0,
				'neutral':0,
				'sadness':0,
				'surprise':0
			});
		})
		.then(function (value) {
			console.log(value);
			return value;
		})
		.then(findMax)
}

function processImage(image) {
		var options = { method: 'POST',
			url: 'https://api.projectoxford.ai/emotion/v1.0/recognize',
			headers: 
			 { 'postman-token': '2498de8f-3599-b6dc-5f99-36f29a22390f',
				 'cache-control': 'no-cache',
				 'content-type': 'application/json',
				 'ocp-apim-subscription-key': 'a76ae506fef04403809ef7606261e5ca' },
			body: { url: image },
			json: true };


		var emotions = {
				'anger':0,
				'contempt':0,
				'disgust':0,
				'fear':0,
				'happiness':0,
				'neutral':0,
				'sadness':0,
				'surprise':0
			};

		return new Promise(function (resolve, reject) {
			request(options, function (error, response, body) {
				var jsonObject = body;
				if (error) reject(error);

				if (!jsonObject) reject("no response")

				jsonObject.forEach(function (obj) {
					Object.keys(emotions).forEach(function (attitude) {
						emotions[attitude] += obj.scores[attitude];
					});
				})

				resolve(emotions);
			});
		});
	}

function findMax(dictionary){
	var maxEmotion = '';
	var max = 0
	for (var key in dictionary) {
		if(dictionary[key] > max){
			max = dictionary[key];
			maxEmotion = key;
		}  
	}
	return maxEmotion;
}

instagram.getPhotos(206258876)
	.then(function (instagramData) {
		return findMyEmotion(instagramData.imageArray);
	})
	.then(function (emotions) {
		console.log("Final emotion: ", emotions);
	})
	.catch(function (error) {
		console.log(error)
	})









