const http = require('http')
const WebSocketServer = require('websocket').server
let connection = null

const httpServer =  http.createServer((req, res) => {
    console.log(`we have received a request`);
})
// the handshake
const websocket =  new WebSocketServer({
    httpServer
})

websocket.on('request', request => {
    connection = request.accept(null, request.origin)
    connection.on('open', () => console.log('Opened!'))
    connection.on('close', () => console.log('Closed!'))
    connection.on('message', message => {
        console.log(`Received message ${message.utf8Data}`);
        connection.send(`got your message: ${message.utf8Data}`)
        
    })
    sendevery5seconds()
})

httpServer.listen(8080, () => console.log(`server is listening...`));

function sendevery5seconds(){

    connection.send(`Message ${Math.random()}`);

    setTimeout(sendevery5seconds, 5000);


}