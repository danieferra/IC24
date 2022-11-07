function changeMenu(place) {
    zonas = document.getElementsByClassName("container menut");
    Array.from(zonas).forEach(function(elem) {
        elem.style.display="none";
    })
    document.getElementById(place).style.display="block";
  }

function avancarMenu(){
    modals = document.getElementsByClassName("modal-body");
    Array.from(modals).forEach(function(elem) {
        if (elem.style.display!="none"){
            aberto = parseInt(elem.dataset.target)+1;
            elem.style.display="none";
        }

    })
    modal="seq-menu"+aberto.toString();
    document.getElementById(modal).style.display="block";
}