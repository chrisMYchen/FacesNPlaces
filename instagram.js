/*
 
 name: getPhotos

 task: takes photos from instagram based on location 

 - location: a location number (should default to 206258876 for MIT)

 - returns: all the photos , latitude , and longtitude 

*/
	var request = require("request");

function getPhotos(location){



	var latArray = [];
	var longArray = [];
	var imageArray = [];


 	var options = { method: 'GET',
	  url: 'https://api.instagram.com/v1/locations/'+ location + '/media/recent',
	  qs: { access_token: '3153740075.afaff3a.f5c8ae423d41455d96c2cf030d4bc4f8' },
	  headers: 
	   { 'postman-token': 'ae01ac45-6fa1-16ee-1a5b-e06e099d7d2c',
	     'cache-control': 'no-cache' } };


	return new Promise(function (resolve, reject) {
		request(options, function (error, response, body) {
		  	if (error) reject(error);
			 // console.log(JSON.parse(body).data);
			 // console.log(body.data.size);
			 try {

			 var jsonObject = JSON.parse(body);	
			 }
			 catch (err) {
				reject(body);
			 }

			for(i = 0;i < jsonObject.data.length; i++){
			 	latArray.push(jsonObject.data[i].location.latitude);
			 	longArray.push(jsonObject.data[i].location.longitude);
			 	imageArray.push(jsonObject.data[i].images.standard_resolution.url);
			}

			// console.log(latArray);
			// console.log(longArray);
			// console.log(imageArray);

			resolve({latArray,longArray,imageArray});
		  
		});
	});
}

module.exports = {
	getPhotos: getPhotos
}