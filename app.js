var express = require("express");
var app = express();
app.use(express.static("./public"));
var server = require("http").Server(app);
var io = require("socket.io")(server)

app.set("view engine", "ejs");
app.set("views", "./views");

var listUser = ["admin"];

io.on("connection", function (socket) {
    console.log("A new user have just connected + " + socket.id);

    socket.on("user_dang_nhap", function(data){
        if(listUser.indexOf(data) >= 0){
            socket.emit("fail");
        }else{
            listUser.push(data);
            socket.username = data;
            socket.emit("login_success", data);
            io.sockets.emit("list_user", (listUser));
        }
    });


    socket.on("user_dang_xuat", function(){
        let index = listUser.indexOf(socket.username);
        if(index > -1)
        {
            listUser.splice(index,1);
        }
        socket.broadcast.emit("list_user", (listUser));
    });
    socket.on("user_send_message", function(data){
        io.sockets.emit("server_send_message", {us:socket.username , nd : data});
    });

    socket.on("disconnect", function () {
        console.log(socket.id + " have just Disconnected!");
    });
});
server.listen("3000");

app.get("/", function (req, res) {
    res.render("trangchu");
})