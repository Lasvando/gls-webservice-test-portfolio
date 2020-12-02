function listSped() {
    //Controllo se esistono già elementi nel ListSped e li elimino in modo da non avere duplicati
    let allATag = document.getElementById('listaspedizioni').querySelectorAll('a');
    if(allATag.length > 0){
        Array.prototype.forEach.call( allATag, function( node ) {
            node.parentNode.removeChild(node);
        });
    }
    document.getElementById('listaspedizioni').style.display = 'none'

    var http = new XMLHttpRequest();
    var url = '/api/listsped';
    http.open('POST', url, true);
    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function () { //Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            //console.log(http.responseText);
            document.getElementById('listaspedizioni').style.display = 'flex'
            parser = new DOMParser();
            xmlDoc = parser.parseFromString(http.responseText, "text/xml");
            let numSped = xmlDoc.getElementsByTagName("NumSpedizione");
            let ragioneSociale = xmlDoc.getElementsByTagName("DenominazioneDestinatario");
            let statoSped = xmlDoc.getElementsByTagName("StatoSpedizione");
            var li = document.createElement("li");
            li.setAttribute("class", "list-group-item mb-1");
            for (i = 0; i < numSped.length; i++) {
                document.getElementById('listaspedizioni').appendChild(newLi(numSped[i].childNodes[0].nodeValue, ragioneSociale[i].childNodes[0].nodeValue, statoSped[i].childNodes[0].nodeValue));
            }
            window.location.href = "#listsped";
        }
    }
    http.send();
}

function newLi(numSped, ragioneSociale, statoSped) {

    var li = document.createElement("a");
    li.setAttribute("class", "list-group-item list-group-item-action mb-1 border");
    li.setAttribute("href", "#deletesped");
    li.setAttribute("onclick", "deleteSped(this.id);");
    li.setAttribute("id", `${numSped}`);
    numSpedHtml = `<b>${numSped}</b>`;
    ragioneSocialeHtml = `${ragioneSociale}`;
    statoSpedHtml = "";
    if (statoSped === 'CHIUSA.')
        statoSpedHtml = `<span class="bg-success text-white float-right rounded">${statoSped}</span>`;
    else
        statoSpedHtml = `<span class="bg-danger text-white float-right rounded">${statoSped}</span>`;

    li.innerHTML = `${numSpedHtml} - ${ragioneSocialeHtml} ${statoSpedHtml}`;
    return li;


}