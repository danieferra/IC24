function changeMenu(place) {
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
        document.getElementById("btnMenuAvancar").innerHTML="Finalizar Pedido";
    }
    else{
        document.getElementById("btnMenuAvancar").innerHTML="Avançar";
    }
}
function avancarMenu(){
    modals = document.getElementsByClassName("modal-body");
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
        mostrarPedidoMenu()
    }
    document.getElementById(modal).style.display="block";
}
function retrocederMenu(){
    modals = document.getElementsByClassName("modal-body");
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
    document.getElementById("seq-menu4").innerHTML="<div class='text-center font-weight-bold'>Resumo do Pedido:</div><p class='card-title'>"+prato+"</p><p class='card-title'>"+bebida+"</p><p class='card-title'>"+sobremesa+"</p>"
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