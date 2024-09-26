var botao = document.getElementById("botao");
var flag = false;

botao.onclick = function(){
    if(flag==false){
        flag = true;
    } else {
        flag = false;
    }
}

function func(){
    //console.log("clicado");
    color = "#";
    letter = "0123456789ABCDEF";
    for(i = 0; i < 6; i++){
        color += letter[Math.floor(Math.random() * letter.length)];
    }
    if(flag == true){
        document.body.style.backgroundColor = color;
    } else {
        document.body.style.backgroundColor = "#ffffff";
    }
    //console.log(color);

}

window.onload = function(){
    setInterval(func, 1000/10);
}

