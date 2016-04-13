var http = require('http');
var path = require('path');
var pages = [
	{route:'',output:'wooHoo'},
	{route:'about',output:'the about page'},
	{route:'another page',output:function(){return 'Heres '+this.route;}}
];
http.createServer(function (request,response){
	var lookup = path.basename(decodeURI(request.url));
	console.log('lookup ' + lookup);
	
	pages.forEach(function(page){
		console.log(page.route);
		if(page.route === lookup){
			response.writeHead(200,{'Content-type':'text/html'});
			response.end(typeof page.output === 'function' ? page.output() : page.output);
		}
	});
	if(!response.finished){
		response.writeHead(404);
		response.end('page not found !!!');
	}
	/*
	if(!response.finished){
		response.writeHead(404);
		response.end('page not found');
	}
	*/
}).listen(8080);