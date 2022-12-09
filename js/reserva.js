document.getElementById("nomeReservaId").addEventListener("change", checkForm);
document.getElementById("numeroReservaId").addEventListener("change", checkForm);
document.getElementById("dataReservaId").addEventListener("change", checkForm);
document.getElementById("numPessoas").addEventListener("change", checkForm);
document.getElementById("horaReserva").addEventListener("change", checkForm);

function checkForm() {
    var nomeReserva = document.getElementById("nomeReservaId").value;
    var numeroReserva = document.getElementById("numeroReservaId").value;
    var dataReserva = document.getElementById("dataReservaId").value;
    var numPessoas = document.getElementById("numPessoas").innerHTML;
    var horaReserva = document.getElementById("horaReserva").value;
    if (nomeReserva !="" && /^([0-9]{9})$/.test(numeroReserva) && dataReserva != "" && numPessoas != "" && horaReserva != "") {
        document.getElementById("reservaBtn").disabled = false;
        document.getElementById('numeroReservaId').classList.remove('highlight');
        document.getElementById('numeroNotificacao').style.display = "none";
    }
    else if (!(/^([0-9]{9})$/.test(numeroReserva))) {
        document.getElementById('numeroReservaId').classList.add('highlight');
        document.getElementById('numeroNotificacao').style.display = "flex";
        document.getElementById("reservaBtn").disabled = true;
    }
    else {
        document.getElementById("reservaBtn").disabled = true;
        document.getElementById('numeroNotificacao').style.display = "none";
        document.getElementById('numeroReservaId').classList.remove('highlight');
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
    var nomeReserva = document.getElementById("nomeReservaId").value;
    var numeroReserva = document.getElementById("numeroReservaId").value;
    var dataReserva = document.getElementById("dataReservaId").value;
    var numPessoas = parseInt(document.getElementById("numPessoas").innerHTML);
    var horaReserva = document.getElementById("horaReserva").value;
    
    document.getElementById("nomeReservaId2").innerHTML = nomeReserva;
    document.getElementById("numeroReservaId2").innerHTML = numeroReserva;
    document.getElementById("dataReserva").innerHTML = dataReserva;
    document.getElementById("numPessoasShow").innerHTML = numPessoas;
    document.getElementById("horaReservaShow").innerHTML = horaReserva;

    document.getElementById("reservaNotificacao").style.display = "block";
}