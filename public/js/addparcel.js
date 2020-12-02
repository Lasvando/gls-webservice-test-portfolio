function addParcel() {
    //OBBLIGATORI
    ragionesociale = document.getElementById('ragioneSociale').value;
    colli = document.getElementById('colli').value;
    peso = document.getElementById('peso').value;
    localita = document.getElementById('localita').value;
    cap = document.getElementById('cap').value;
    provincia = document.getElementById('provincia').value;
    indirizzo = document.getElementById('indirizzo').value;
    civico = document.getElementById('civico').value;
    bda = document.getElementById('bda').value;

    //NON OBBLIGATORI
    contrassegno = document.getElementById('contrassegno').value;
    contrassegno = contrassegno.replace('.', ',')
    modalitaincasso = "";
    tipoporto = document.getElementById('tipoporto').value;
    notespedizioni = document.getElementById('notespedizioni').value;
    noteaggiuntive = document.getElementById('noteaggiuntive').value;
    assicurazione = document.getElementById('assicurazione').value;

    //CONTROLLI OBBLIGATORI
    if (ragionesociale === "") {
        alert('Inserire una ragione sociale');
        return;
    } else if (colli < 1) {
        alert('La quantità di colli minima è 1')
        return;
    } else if (peso < 1) {
        alert('Il peso minimo è 1');
        return;
    } else if (bda === "") {
        alert('Inserire una BDA');
        return;
    }

    //CONTROLLI NON OBBLIGATORI
    if (contrassegno === "Contrassegno") {
        contrassegno = "";
    } else if (modalitaincasso != "Modalità di incasso" && contrassegno > 0) {
        modalitaincasso = document.getElementById('modalitaincasso').value;
    } else if (tipoporto === "Tipo Porto") {
        modalitaincasso = "";
    } else if (notespedizioni === "Note") {
        notespedizioni = "";
    } else if (noteaggiuntive === "Note Aggiuntive") {
        noteaggiuntive = "";
    } else if (assicurazione === "Assicurazione in &#8364") {
        assicurazione = "";
    }

    if (document.getElementById('esitoBtn').style.display == "none") {
        alert("Eseguire prima la verifica dell'indirizzo.");
        return;
    }
    if (document.getElementById('esitoBtn').innerText != "Esito Positivo") {
        alert('Destinazione errata');
        return;
    }

    //TODO: CREARE UN XML
    let xmlParcel =
        `<Parcel>` +
        `<CodiceContrattoGls>1000</CodiceContrattoGls>` +
        `<RagioneSociale>${ragionesociale}</RagioneSociale>` +
        `<Indirizzo>${indirizzo}</Indirizzo>` +
        `<Localita>${localita}</Localita>` +
        `<Zipcode>${cap}</Zipcode>` +
        `<Provincia>${provincia}</Provincia>` +
        `<Bda>${bda}</Bda>` +
        `<Colli>${colli}</Colli>` +
        `<Incoterm></Incoterm>` +
        `<PesoReale>${peso}</PesoReale>` +
        `<ImportoContrassegno>${contrassegno}</ImportoContrassegno>` +
        `<NoteSpedizione>${notespedizioni}</NoteSpedizione>` +
        `<TipoPorto>${tipoporto}</TipoPorto>` +
        `<Assicurazione>${assicurazione}</Assicurazione>` +
        `<PesoVolume></PesoVolume>` +
        `<TipoCollo></TipoCollo>` +
        `<FrancoAnticipata></FrancoAnticipata>` +
        `<RiferimentoCliente></RiferimentoCliente>` +
        `<NoteAggiuntive>${noteaggiuntive}</NoteAggiuntive>` +
        `<CodiceClienteDestinatario></CodiceClienteDestinatario>` +
        `<Email></Email>` +
        `<Cellulare1></Cellulare1>` +
        `<ServiziAccessori></ServiziAccessori>` +
        `<ModalitaIncasso>${modalitaincasso}</ModalitaIncasso>` +
        `<DataPrenotazioneGDO></DataPrenotazioneGDO>` +
        `<OrarioNoteGDO></OrarioNoteGDO>` +
        `<GeneraPdf></GeneraPdf>` +
        `<ContatoreProgressivo></ContatoreProgressivo>` +
        `<NumDayListSped></NumDayListSped>` +
        `<IdentPIN></IdentPIN>` +
        `<AssicurazioneIntegrativa></AssicurazioneIntegrativa>` +
        `<TipoSpedizione></TipoSpedizione>` +
        `<ValoreDichiarato></ValoreDichiarato>` +
        `<PersonaRiferimento></PersonaRiferimento>` +
        `<Contenuto></Contenuto>` +
        `<TelefonoDestinatario></TelefonoDestinatario>` +
        `<CategoriaMerceologica></CategoriaMerceologica>` +
        `<FatturaDoganale></FatturaDoganale>` +
        `<DataFatturaDoganale></DataFatturaDoganale>` +
        `<PezziDichiarati></PezziDichiarati>` +
        `<NazioneOrigine></NazioneOrigine>` +
        `<TelefonoMittente></TelefonoMittente>` +
        `</Parcel>`;

    var http = new XMLHttpRequest();
    var url = '/api/addparcel';
    var params = `xmlParcel=${xmlParcel}`
    http.open('POST', url, true);
    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function() { //Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            parser = new DOMParser();
            xmlDoc = parser.parseFromString(http.responseText, "text/xml");
            console.log(xmlDoc);

            let NumeroSpedizione = xmlDoc.getElementsByTagName("NumeroSpedizione");

            alert(`Spedizione creata\nNumero Spedizione -> ${NumeroSpedizione[0].childNodes[0].nodeValue}`);

            document.getElementById('addparcelCodeDiv').style.display = 'flex';

            codeTag = document.getElementById('addparcelCodeDiv').style.display = 'flex';

            //SEND XML
            codeTag = document.getElementById('addParcelxmltitle').style.display = 'flex';
            codeTag = document.getElementById('addparcelCode').style.display = 'flex';

            codeTag = document.getElementById('addparcelCode').innerText = prettifyXml(xmlParcel);

            //RETURN XML
            codeTag = document.getElementById('addParcelxmlreturntitle').style.display = 'flex';
            codeTag = document.getElementById('addparcelreturnCode').style.display = 'flex';

            codeTag = document.getElementById('addparcelreturnCode').innerText = prettifyXml(http.responseText);

            listSped();
        }
    }
    http.send(params);
}