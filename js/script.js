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
    pedidoanterior[0] = pedidoanterior[0].replace("Menu ","");
    pedidoLocalStorage(pedidoanterior);
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
    console.log(array);
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
        pedido.sort();
        const counts = {};
        
        pedido.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
        console.log(counts);
        total=0;
        for (const elem of pedido) {
            console.log(elem);
            if(elem.length>1){
                if(elem[0].includes("Menu ")){
                    elem[0] = elem[0].replace("Menu ","");
                }
                item = menus.find(element => element.nome == elem[0]);
            }
            else{
                todos = Array.prototype.slice.call(pratos);
                todos = todos.concat(Array.prototype.slice.call(Array.prototype.slice.call(bebidas)));
                todos = todos.concat(Array.prototype.slice.call(Array.prototype.slice.call(sobremesas)));
                item = todos.find(element => element.nome == elem);
                
            }
            console.log(elem);
            
            total+= parseFloat(item.preco.replace(',','.'));
            let ns =Math.floor(Math.random()*20 )+1;
            console.log(item.nome);
            if(!(texto.includes(elem))){
                texto+="<div class='card d-block p-2 mb-2 font-weight-bold'><div style='float: left;margin-right: 5px;'><button class='menos' onclick='retirarDoMenu'>-</button><input type='text' min='1' value='"+counts[elem]+"' onKeyDown='return false' class='quantidade'><button class='mais'>+</button> </div>"+elem+" <span class='float-right font-weight-normal'>"+parseFloat(item.preco.replace(',','.'))*counts[elem]+"€</span><p class='small mb-0'>Tempo de espera: "+ns.toString()+"min</p></div>";
            }
            
            total = Math.ceil(total*100)/100;
            document.getElementById("total").innerHTML= "Total: "+(total.toString()).replace('.',',')+"€";
        }
        document.getElementById("pedidoDaAtualidade").innerHTML=texto;
    }
}

function retirarDoMenu(item){
    pedido = JSON.parse(localStorage.getItem('pedido'));
    item = item.split(",");
    console.log(pedido);
    console.log(item);

}


function filtros(){
    filtro = Array.prototype.slice.call(document.getElementsByClassName("form-check-input"));
    categorias = Array.prototype.slice.call(document.getElementsByClassName("categoria"));
    cats=[];
    classes = "";
    for(const elem of filtro){
        if(elem.checked==true){

            classes+="."+elem.value;
        }
    }
    for(const elem of categorias){
        if(elem.checked==true){

            cats.push(elem.value);
        }
    }
    
    if(classes==""){
        todos = Array.prototype.slice.call(document.querySelectorAll("#menusCompletos .col-3"));
        todos = todos.concat(Array.prototype.slice.call(document.querySelectorAll("#pratos .col-3")));
        for(const elem of todos){
            if(cats.length!=0){
                elem.style.display="none";
                for(const x of cats){
                    if(elem.classList.contains(x)){
                        elem.style.display="block";
                        /* break; */
                    }
               }
            }
            else{
                elem.style.display="block";
            }
           
            
        }
        todos = Array.prototype.slice.call(document.querySelectorAll("#bebidas .col-3"));
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
        for(const elem of selecionados){
            if(cats.length!=0){
                elem.style.display="none";
                for(const x of cats){
                    if(elem.classList.contains(x)){
                        elem.style.display="block";
                        /* break; */
                    }
               }
            }
            else{
                elem.style.display="block";
            }
           
            
        }
        selecionados = Array.prototype.slice.call(document.querySelectorAll("#bebidas "+classes));
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

function avaliar(){
    document.getElementById("mensagemRapida").style.display="flex";
    setTimeout( function() { document.getElementById("mensagemRapida").style.opacity="1";}, 500);
    document.getElementById("mensagemRapida").innerHTML = "<p class='font-weight-bold'>Obrigado pela sua avaliação!</p>";
    setTimeout( function() { document.getElementById("mensagemRapida").style.opacity="0";}, 2000);
    setTimeout( function() { document.getElementById("mensagemRapida").style.display="none";}, 2500);
}



function limpaStorage() {
    localStorage.removeItem('pedido');
    location.reload();
}

window.onload = lengthPedido();