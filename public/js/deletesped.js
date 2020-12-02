function deleteSped(codicesped) {
    if (confirm(`ATTENZIONE\nSei sicuro di voler eliminare la spedizione ${codicesped}?`)) {
        var http = new XMLHttpRequest();
        var url = '/api/deletesped';
        var params = `NumSpedizione=${codicesped}`;
        http.open('POST', url, true);
        //Send the proper header information along with the request
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        http.onreadystatechange = function() { //Call a function when the state changes.
            if (http.readyState == 4 && http.status == 200) {
                parser = new DOMParser();
                xmlDoc = parser.parseFromString(http.responseText, "text/xml");

                let esito = xmlDoc.getElementsByTagName("DescrizioneErrore");

                alert(esito[0].childNodes[0].nodeValue);

                listSped();
            }
        }
        http.send(params);
    }

}