function checkAddress() {
    localita = document.getElementById('localita').value;
    cap = document.getElementById('cap').value;
    provincia = document.getElementById('provincia').value;
    indirizzo = document.getElementById('indirizzo').value;
    civico = document.getElementById('civico').value;

    if (localita === "Località") {
        alert("Inserire una località");
        return;
    } else if (cap === "CAP") {
        alert("Inserire il CAP");
        return;
    } else if (cap.length != 5) {
        alert("Il CAP deve avere almeno 5 cifre");
        return;
    } else if (provincia === "Provincia") {
        alert("Inserire la provincia");
        return;
    } else if (indirizzo === "Indirizzo") {
        alert("Inserire un indirizzo");
        return;
    } else if (civico === "Numero Civico") {
        alert("Inserire un civico");
        return;
    }

    indirizzo += " ," + civico;

    var http = new XMLHttpRequest();
    var url = '/api/checkaddress';
    var params = `Localita=${localita}&CAP=${cap}&Provincia=${provincia}&Indirizzo=${indirizzo}`;
    http.open('POST', url, true);
    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function() { //Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            console.log(http.responseText);
            parser = new DOMParser();
            xmlDoc = parser.parseFromString(http.responseText, "text/xml");
            let esito = xmlDoc.getElementsByTagName("Esito");

            if (esito[0].childNodes[0].nodeValue === 'Destinazione corretta.') {
                esitoBtn = document.getElementById('esitoBtn').style.display = 'flex';
                esitoBtn = document.getElementById('esitoBtn').innerText = 'Esito Positivo';
                esitoBtn = document.getElementById('esitoBtn').classList.remove("btn-danger");
                esitoBtn = document.getElementById('esitoBtn').classList.add("btn-success");
            } else {
                esitoBtn = document.getElementById('esitoBtn').style.display = 'flex';
                esitoBtn = document.getElementById('esitoBtn').innerText = 'Esito Negativo';
                esitoBtn = document.getElementById('esitoBtn').classList.remove("btn-success");
                esitoBtn = document.getElementById('esitoBtn').classList.add("btn-danger");
            }
        }
    }
    http.send(params);
}