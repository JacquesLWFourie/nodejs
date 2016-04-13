var http = require('http');
var url = require('url');

var pages = [
	{id:'1',route:'',output:'wooHooaaaa'},
	{id:'2',route:'about',output:'simple routing with node'},
	{id:'3',route:'/about/node',output:'some more routing'},
	{id:'4',route:'another page',output:function(){return 'Heres '+this.route;}}
];
http.createServer(function (request,response){
	var id = url.parse(decodeURI(request.url),true).query.id;
	console.log('id ' + id);
	if(id){
		pages.forEach(function(page){
			if(page.id === id){
				response.writeHead(200,{'Content-type':'text/html'});
				response.end(typeof page.output === 'function' ? page.output() : page.output);
			}
		});

	}
	if(!response.finished){
		response.writeHead(404);
		response.end('page not found !!!');
	}
	
}).listen(8080);