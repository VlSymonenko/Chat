
exports.soc = io => {
io.on('connection', (socket) => {
   socket.on('SEND_MESSAGE', function(data){
       if(data.author && data.email){
         io.emit('RECEIVE_MESSAGE', data);
         return data;
     }
   })
 });
}

//We also can add some logic
exports.exit =()=>{process.exit()}
