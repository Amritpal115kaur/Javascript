const Hapi =require('hapi');
const server= new Hapi.Server();
var Plugins = require('./plugins');
const app= require('./routes/route.js');
server.connection({ port:9000, host:'localhost'});
//resgister all plugins
server.register(Plugins, function (err) {
    if (err){
        console.log("----",err)
        server.error('Error while loading plugins : ' + err)
    }else {
        server.log('info','Plugins Loaded')
    }
});
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
})
server.route(app);