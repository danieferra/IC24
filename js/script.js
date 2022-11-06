function changeMenu(place) {
    zonas = document.getElementsByClassName("container menut");
    Array.from(zonas).forEach(function(elem) {
        elem.style.display="none";
    })
    document.getElementById(place).style.display="block";
  }