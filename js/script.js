function changeMenu(place) {
    document.getElementsByClassName("nav-link active")[0].classList.remove("active");
    btn = document.getElementById('nav'+place);
    texto= btn.innerHTML;
    document.querySelector('.menus h1').innerHTML=texto;
    btn.classList.add("active");
    zonas = document.getElementsByClassName("container menut");
    Array.from(zonas).forEach(function(elem) {
        elem.style.display="none";
    })
    document.getElementById(place).style.display="block";
  }

function btnMenu(aberto){
    modal="seq-menu"+aberto.toString();
    if(aberto>1){
        document.getElementById("btnMenuRetroceder").disabled=false;
        if(document.getElementById(modal).getElementsByClassName("escolhido")[0]!=null){
            document.getElementById("btnMenuAvancar").disabled=false;
        }
        
    }
    else{
        document.getElementById("btnMenuRetroceder").disabled=true;
        document.getElementById("btnMenuAvancar").disabled=false;
    }
    if(aberto==4){
        document.getElementById("btnMenuAvancar").innerHTML="Confirmar Pedido";
        document.getElementById("btnMenuAvancar").disabled=false;
    }
    else{
        document.getElementById("btnMenuAvancar").innerHTML="Avançar";
    }
}

function repetirPedido(){
    //split string from id pedidoanterior1 and add to a list
    var pedidoanterior = document.getElementById("pedidoanterior1").innerHTML.split(",");
    pedidoLocalStorage (pedidoanterior);
}





function deselect(array){
    for (const elem of array) {
        elem.style="border: 1px solid rgba(0,0,0,.125)";
        elem.classList.remove("escolhido");
    }

}

function lengthPedido(){
    pedido = JSON.parse(localStorage.getItem('pedido'));
    if(pedido == null){
        document.getElementsByClassName("pedidoAtual")[0].style.display="none";
    }
    else{
        document.getElementsByClassName("pedidoAtual")[0].style.display="block";
        document.getElementById("numPedido").innerHTML=pedido.length;
    }
    
}

function pedidoLocalStorage(array){
    
    document.getElementById("mensagemRapida").style.display="flex";
    setTimeout( function() { document.getElementById("mensagemRapida").style.opacity="1";}, 500);
    document.getElementById("mensagemRapida").innerHTML = "<p class='font-weight-bold'>Item adicionado com sucesso</p><img class='verified' src='./img/icons8-checkmark.gif' alt=''>";
    setTimeout( function() { document.getElementById("mensagemRapida").style.opacity="0";}, 2000);
    setTimeout( function() { document.getElementById("mensagemRapida").style.display="none";}, 2500);
    pedido = [];
    if (localStorage.getItem("pedido") === null) {
        pedido.push(array);
        localStorage.setItem('pedido',JSON.stringify(pedido));
    }
    else{
        pedido = JSON.parse(localStorage.getItem('pedido'))
        pedido.push(array);
        localStorage.setItem('pedido',JSON.stringify(pedido));
    }
    lengthPedido();

}

function pedidoAtual(){
    texto="";
    if (localStorage.getItem("pedido") === null) {
        return 0;
    }
    else{ 
        pedido = JSON.parse(localStorage.getItem('pedido'));
        for (const elem of pedido) {
            let ns =Math.floor(Math.random()*20 )+1;
            texto+="<div class='card d-block p-2 mb-2'>"+elem+" <span class='float-right'> ETA: "+ns.toString()+"</span></div>";
        }
        document.getElementById("pedidoDaAtualidade").innerHTML=texto;
    }
}




function filtros(){
    filtro = Array.prototype.slice.call(document.getElementsByClassName("form-check-input"));

    classes = "";
    for(const elem of filtro){
        if(elem.checked==true){

            classes+="."+elem.value;
        }
    }
    
    if(classes==""){
        todos = Array.prototype.slice.call(document.querySelectorAll("#menusCompletos .col-3"));
        todos = todos.concat(Array.prototype.slice.call(document.querySelectorAll("#pratos .col-3")));
        todos = todos.concat(Array.prototype.slice.call(document.querySelectorAll("#bebidas .col-3")));
        todos = todos.concat(Array.prototype.slice.call(document.querySelectorAll("#sobremesas .col-3")));
        todos = todos.concat(Array.prototype.slice.call(document.querySelectorAll("#seq-menu3 .col-2")));
        for(const elem of todos){
            elem.style.display="block";
        }
    }
    else{
        todos = Array.prototype.slice.call(document.querySelectorAll("#menusCompletos .col-3"));
        todos = todos.concat(Array.prototype.slice.call(document.querySelectorAll("#pratos .col-3")));
        todos = todos.concat(Array.prototype.slice.call(document.querySelectorAll("#bebidas .col-3")));
        todos = todos.concat(Array.prototype.slice.call(document.querySelectorAll("#sobremesas .col-3")));
        todos = todos.concat(Array.prototype.slice.call(document.querySelectorAll("#seq-menu3 .col-2")));

        for(const elem of todos){
            elem.style.display="none";
        }
        selecionados = Array.prototype.slice.call(document.querySelectorAll("#menusCompletos "+classes));
        selecionados = selecionados.concat(Array.prototype.slice.call(document.querySelectorAll("#pratos "+classes)));
        selecionados = selecionados.concat(Array.prototype.slice.call(document.querySelectorAll("#bebidas "+classes)));
        selecionados = selecionados.concat(Array.prototype.slice.call(document.querySelectorAll("#sobremesas "+classes)));
        selecionados = selecionados.concat(Array.prototype.slice.call(document.querySelectorAll("#seq-menu3 "+classes)));
        for(const elem of selecionados){
            elem.style.display="block";
        }
    }

   /*  filtro = Array.prototype.slice.call(document.getElementsByClassName("categoria"));
    todos = Array.prototype.slice.call(document.querySelectorAll("#menusCompletos .col-3"));
    todos = todos.concat(Array.prototype.slice.call(document.querySelectorAll("#pratos .col-3")));
    classes = "";
    for(const elem of filtro){
        if(elem.checked==true){
            for(const item of todos){
                if(item.classList.contains(elem.value)){
                    item.style.display="block";
                }
                else{
                    item.style.disaplay="none";
                }
            }
        }
    } */
   
    
    
   
   
}



function limpaStorage() {
    localStorage.removeItem('pedido');
    location.reload();
}

window.onload = lengthPedido();