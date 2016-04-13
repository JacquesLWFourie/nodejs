var http = require('http');
var pages = [
	{route:'',output:'wooHooaaaa'},
	{route:'/about/this',output:'multi level routing'},
	{route:'/about/node',output:'some more routing'},
	{route:'another page',output:function(){return 'Heres '+this.route;}}
];
http.createServer(function (request,response){
	var lookup = (decodeURI(request.url));
	console.log('lookup ' + lookup);
	
	pages.forEach(function(page){
		
		if(page.route === lookup){
			response.writeHead(200,{'Content-type':'text/html'});
			response.end(typeof page.output === 'function' ? page.output() : page.output);
		}
	});
	if(!response.finished){
		response.writeHead(404);
		response.end('page not found !!!');
	}
	
}).listen(8080);