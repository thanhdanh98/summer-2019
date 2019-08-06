var socket = io("http://localhost:3000");
var username = ""
socket.on("fail", function(){
    alert("user da ton tai");
});
socket.on("login_success", function(data){
    username = data;
    $("#currentUser").html(data);
    $("#login_form").hide(2000);
    $("#chat_form").show(1000);
});

socket.on("list_user", function(data){
    $("#boxContent").html("");
    data.forEach(function(i){
        $("#boxContent").append("<div class = 'user' >" + i + "</div>");
    });
});

socket.on("server_send_message", function(data){
    $("#txtMessage").html("");
    $("#listMessage").append("<div class='message'> <span id ='userName'>" + data.us + ": </span>" + data.nd + "</div");
});

socket.on("user_inputting", function(data){
    $("#thongbao").html(data);
})

socket.on("user_not_inputting", function(data){
    $("#thongbao").html("");
})
$(document).ready(function () {
    $("#login_form").show();
    $("#chat_form").hide();

    $("#btn-login").click(function () {
        socket.emit("user_dang_nhap", $("#txtUsername").val());
    });

    $("#btn-logout").click(function () {
        socket.emit("user_dang_xuat");
        $("#login_form").show();
        $("#chat_form").hide();
    });

    $("#btn-send").click(function(){
        socket.emit("user_send_message", $("#txtMessage").val());
    });

    $("#txtMessage").focusin(function(){
        socket.emit("user_input");
    });

    $("#txtMessage").focusout(function(){
        socket.emit("user_not_input");
    });
});


