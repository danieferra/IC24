document.getElementById("dataReservaId").addEventListener("change", checkForm);
document.getElementById("numPessoas").addEventListener("change", checkForm);
document.getElementById("horaReserva").addEventListener("change", checkForm);

function checkForm() {
    var dataReserva = document.getElementById("dataReservaId").value;
    var numPessoas = document.getElementById("numPessoas").innerHTML;
    var horaReserva = document.getElementById("horaReserva").value;
    if (dataReserva != "" && numPessoas != "" && horaReserva != "") {
        document.getElementById("reservaBtn").disabled = false;
    }
    else {
        document.getElementById("reservaBtn").disabled = true;
    }
}

function menosPessoas(){
    n = parseInt(document.getElementById("numPessoas").innerHTML);
    n--;
    if(n>=1){
        document.getElementById("numPessoas").innerHTML=n;
    }
}

function maisPessoas(){
    n = parseInt(document.getElementById("numPessoas").innerHTML);
    n++;
    document.getElementById("numPessoas").innerHTML=n;
}

function reserva() {
    var dataReserva = document.getElementById("dataReservaId").value;
    var numPessoas = parseInt(document.getElementById("numPessoas").innerHTML);
    var horaReserva = document.getElementById("horaReserva").value;
    
    document.getElementById("dataReserva").innerHTML = dataReserva;
    document.getElementById("numPessoasShow").innerHTML = numPessoas;
    document.getElementById("horaReservaShow").innerHTML = horaReserva;

    document.getElementById("reservaNotificacao").style.display = "block";
}