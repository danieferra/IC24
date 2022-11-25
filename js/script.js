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
    if(aberto>1){
        document.getElementById("btnMenuRetroceder").disabled=false;
    }
    else{
        document.getElementById("btnMenuRetroceder").disabled=true;
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




function retrocederMenu(){
    modals = document.getElementsByClassName("modal-body2");
    Array.from(modals).forEach(function(elem) {
        if (elem.style.display!="none"){
            aberto = parseInt(elem.dataset.target)-1;
            elem.style.display="none";
        }

    })
    modal="seq-menu"+aberto.toString();
    btnMenu(aberto);
    document.getElementById(modal).style.display="block";
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
            texto+="<div class='card'>"+elem+", ETA: "+ns.toString()+"</div>";
        }
        document.getElementById("pedidoDaAtualidade").innerHTML=texto;
    }
}




function filtros(){
    filtro = document.getElementsByClassName("form-check-input");
    classes = "";
    for(const elem of filtro){
        if(elem.checked==true){

            classes+="."+elem.value;
        }
    }
    if(classes==""){
        todos = Array.prototype.slice.call(document.querySelectorAll("#menusCompletos .col-3"));
        todos = todos.concat(Array.prototype.slice.call(document.querySelectorAll("#pratos .col-3")));
        todos = todos.concat(Array.prototype.slice.call(document.querySelectorAll("#sobremesas .col-3")));
        todos = todos.concat(Array.prototype.slice.call(document.querySelectorAll("#seq-menu3 .col-2")));
        for(const elem of todos){
            elem.style.display="block";
        }
    }
    else{
        todos = Array.prototype.slice.call(document.querySelectorAll("#menusCompletos .col-3"));
        todos = todos.concat(Array.prototype.slice.call(document.querySelectorAll("#pratos .col-3")));
        todos = todos.concat(Array.prototype.slice.call(document.querySelectorAll("#sobremesas .col-3")));
        todos = todos.concat(Array.prototype.slice.call(document.querySelectorAll("#seq-menu3 .col-2")));
        console.log(todos);
        for(const elem of todos){
            elem.style.display="none";
        }
        selecionados = Array.prototype.slice.call(document.querySelectorAll("#menusCompletos "+classes));
        selecionados = selecionados.concat(Array.prototype.slice.call(document.querySelectorAll("#pratos "+classes)));
        selecionados = selecionados.concat(Array.prototype.slice.call(document.querySelectorAll("#sobremesas "+classes)));
        selecionados = selecionados.concat(Array.prototype.slice.call(document.querySelectorAll("#seq-menu3 "+classes)));
        for(const elem of selecionados){
            elem.style.display="block";
        }
    }
   
}

function limpaStorage() {
    localStorage.removeItem('pedido');
    location.reload();
}