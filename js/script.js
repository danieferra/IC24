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

function adicionarIndividual(item,target){
    pedido = [item];
    pedidoLocalStorage(pedido);
    document.getElementById(target).style.display="none";
    document.getElementsByClassName("modal-backdrop")[0].style.display="none";
}

function avancarMenu(){
    if(document.getElementById("btnMenuAvancar").innerHTML=="Confirmar Pedido"){
        prato = document.getElementById("menusCompletos").getElementsByClassName("escolhido")[0].getElementsByTagName('h5')[0].innerHTML;
        bebida = document.getElementById("seq-menu2").getElementsByClassName("escolhido")[0].getElementsByTagName('h5')[0].innerHTML;
        sobremesa = document.getElementById("seq-menu3").getElementsByClassName("escolhido")[0].getElementsByTagName('h5')[0].innerHTML;
        pedido = [prato,bebida,sobremesa];
        pedidoLocalStorage(pedido);
        document.getElementById("exampleModal").style.display="none";
        document.getElementsByClassName("modal-backdrop")[0].style.display="none";
    }
    else{
    modals = document.getElementsByClassName("modal-body2");
    Array.from(modals).forEach(function(elem) {
        if (elem.style.display!="none"){
            aberto = parseInt(elem.dataset.target)+1;
            elem.style.display="none";
        }

    })
    document.getElementById("btnMenuAvancar").disabled = true;
    modal="seq-menu"+aberto.toString();
    btnMenu(aberto);
    if(aberto==4){
        mostrarPedidoMenu();
    }
    document.getElementById(modal).style.display="block";
}
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
function mostrarPedidoMenu(){
    prato = document.getElementById("menusCompletos").getElementsByClassName("escolhido")[0].getElementsByTagName('h5')[0].innerHTML;
    bebida = document.getElementById("seq-menu2").getElementsByClassName("escolhido")[0].getElementsByTagName('h5')[0].innerHTML;
    sobremesa = document.getElementById("seq-menu3").getElementsByClassName("escolhido")[0].getElementsByTagName('h5')[0].innerHTML;
    document.getElementById("seq-menu4").innerHTML="<div class='text-center font-weight-bold'>Resumo do Pedido:</div><p class='card-title'>"+prato+"</p><p class='card-title'>"+bebida+"</p><p class='card-title'>"+sobremesa+"</p>";
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
            texto+="<div class='card'>"+elem+"ETA: "+ns.toString()+"</div>";
        }
        document.getElementById("pedidoDaAtualidade").innerHTML=texto;
    }
}



pratosMenu = document.querySelectorAll('#menusCompletos .card');
for (const prato of pratosMenu) {
    prato.addEventListener('click', function onClick() {
      deselect(pratosMenu);
      prato.style="border: 1px solid green";
      prato.classList.add("escolhido");
      document.getElementById("btnMenuAvancar").disabled = false;
    });
  }

bebidasMenu = document.querySelectorAll('#seq-menu2 .card');
for (const bebida of bebidasMenu) {
    bebida.addEventListener('click', function onClick() {
      deselect(bebidasMenu);
      bebida.style="border: 1px solid green";
      bebida.classList.add("escolhido");
      document.getElementById("btnMenuAvancar").disabled = false;
    });
  }

  sobremesasMenu = document.querySelectorAll('#seq-menu3 .card');
  for (const sobremsa of sobremesasMenu) {
    sobremsa.addEventListener('click', function onClick() {
        deselect(sobremesasMenu);
        sobremsa.style="border: 1px solid green";
        sobremsa.classList.add("escolhido");
        document.getElementById("btnMenuAvancar").disabled = false;
      });
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