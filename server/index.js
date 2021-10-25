const express = require('express')
const http=require('http')
const cors=require('cors')
const fs=require('fs')
const app=express()
app.use(cors())
const server=http.createServer(app)
const io =require('socket.io')(server,{
    cors:{
        origin:'http://localhost:3000',
        methods: ['POST','GET']
    }
})
const PORT = 5000

io.on('connection', (socket)=>{
    socket.emit('me', socket.id);

    socket.on('disconnect', ()=>{
        socket.broadcast.emit("callEnded");
    })

    socket.on('callUser', (data)=>{
        io.to(data.userToCall).emit('callUser',{signal: data.signalData, from: data.from, name: data.name})
    })

    socket.on('answerCall', (data)=>{
        io.to(data.to).emit('callAccepted', data.signal);
    })
})

app.get('/',(req,res)=>{
    res.send("HELLO")
})

app.get('/live',(req,res)=>{
    const range= req.headers.range;
    const videoPath='./video.mp4';
    const videoSize=fs.statSync(videoPath).size;
    const chunkSize= 1 * 1e+6;
    const start=Number(range.replace(/\D/g, ''));
    const end=Math.min(start+chunkSize, videoSize-1);
    const contentLength=end - start +1;

    const headers={
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4"
    };
    
    res.writeHead(206,headers);

    const stream=fs.createReadStream(videoPath,{start,end});
    stream.pipe(res);
})


app.listen(PORT,()=>console.log(`app running on ${PORT}`));