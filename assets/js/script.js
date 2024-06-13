window.onload = gestoreLoad;

function gestoreLoad() {
  var btn = document.getElementById("add");

  btn.onclick = add;
  var btn1 = document.getElementById("btn1");
  btn1.onclick = ordina;
  //inizializzo classe scarpe (per inserire primi elementi)
  class scarpe {
    constructor(marca, modello, prezzo, url, tipologia, qnt) {
      this.modello = modello;
      this.marca = marca;
      this.prezzo = prezzo;
      this.url = url;
      this.tipologia = tipologia;
      this.qnt = qnt;
    }
  }

  var listaScarpe = [];
  //inserire elementi per popolare il sito
  var o1 = new scarpe(
    "Nike",
    "Air Force 1",
    130,
    "img/scarpa1.jpg",
    "sneakers",
    100
  );

  var o2 = new scarpe(
    "Nike",
    "Air Jordan 1",
    150,
    "img/scarpa2.jpg",
    "sneakers",
    100
  );

  var o3 = new scarpe(
    "Vans",
    "Old School",
    100,
    "img/scarpa3.jpg",
    "sneakers",
    100
  );

  var o4 = new scarpe(
    "Nike",
    "Air max",
    150,
    "img/scarpa4.jpg",
    "sneakers",
    100
  );

  //sezione che ricarica sull'html gli elementi inseriti
  listaScarpe.push(o1);
  listaScarpe.push(o2);
  listaScarpe.push(o3);
  listaScarpe.push(o4);
  salva(); //salvo
  show(); //mostro

  function show() { //funziona mostra crea gli elementi html div e inserisce le varie parti della card
    remove();
    var nodo = document.getElementById("show");
    listaScarpe = JSON.parse(localStorage.getItem("lista2"));
    for (var i = 0; i < listaScarpe.length; i++) {
      var nuovoNodo = document.createElement("div");

      nuovoNodo.className = "card";
      var nodoImmagine = document.createElement("img");
      nodoImmagine.src = listaScarpe[i].url;
      nodoImmagine.className = "card-img-top";
      nodoImmagine.className += " mx-auto";

      nuovoNodo.appendChild(nodoImmagine);
      var nodoCardBody = document.createElement("div");
      nodoCardBody.className = "card-body";
      nuovoNodo.appendChild(nodoCardBody);

      var nodoTitolo = document.createElement("h5");
      nodoTitolo.className = "card-title";
      nodoTitolo.textContent = listaScarpe[i].modello;
      nodoCardBody.appendChild(nodoTitolo);

      var nodoTesto = document.createElement("p");
      nodoTesto.className = "card-text";
      nodoTesto.textContent = "Marca: " + listaScarpe[i].marca;
      nodoCardBody.appendChild(nodoTesto);

      var nodoTesto1 = document.createElement("p");
      nodoTesto1.className = "card-text";
      nodoTesto1.textContent = "Prezzo: " + listaScarpe[i].prezzo;
      nodoCardBody.appendChild(nodoTesto1);

      var nodoTesto2 = document.createElement("p");
      nodoTesto2.className = "card-text";
      nodoTesto2.textContent = "Qnt: " + listaScarpe[i].qnt;
      nodoCardBody.appendChild(nodoTesto2);

      if (listaScarpe[i].qnt <= 3 && listaScarpe[i].qnt != 0) {
        var nodoTesto3 = document.createElement("p");
        nodoTesto3.className = "card-text";
        nodoTesto3.textContent =
          "Ne sono rimasti solo " +
          listaScarpe[i].qnt +
          " APPROFITTANE SUBITO!";
        nodoCardBody.appendChild(nodoTesto3);
      }

      var nodoNumber = document.createElement("input");
      nodoNumber.type = "number";
      nodoNumber.value = "0";
      nodoNumber.id = listaScarpe[i].modello;

      nodoCardBody.appendChild(nodoNumber);
      nodo.appendChild(nuovoNodo);
    }
  }
  //funziona salva , carica il nuovo prodotto
  function salva() {
    localStorage.setItem("lista2", JSON.stringify(listaScarpe));
  }
  //rimuove il prodotto 
  function remove() {
    var nodo = document.getElementById("show");

    while (nodo.firstChild) {
      nodo.removeChild(nodo.firstChild);
    }
  }
  //funzione aggiungo gli elementi del  nuovo prodotto
  function add() {
    var modello = document.getElementById("modello").value;
    var marca = document.getElementById("marca").value;
    var prezzo = document.getElementById("prezzo").value;
    var modello = document.getElementById("modello").value;
    var url = document.getElementById("url").value;
    var tipologia = document.getElementById("tipologia").value;
    var qnt = document.getElementById("qnt").value;

    var o1 = new scarpe(marca, modello, prezzo, url, tipologia, qnt);
    listaScarpe.push(o1);
    console.log(listaScarpe);
    salva();
    show();
  }
  // funzione ordina -lista dei prodotti ordinati
  function ordina() {
    var listaScelte = new Array();
    for (var i = 0; i < listaScarpe.length; i++) {
      var valoreInput = document.getElementById(
        listaScarpe[i].modello
      ).value;
      listaScelte.push(valoreInput);
    }

    var somma = 0;
    var riepilogo = "Hai ordinato";
    var nodo = document.getElementById("result");
    nodo.textContent = riepilogo;
    for (var i = 0; i < listaScarpe.length; i++) {
      if (listaScelte[i] != "0") {

        // controllo se ci sono pezzi disponibili
        if (listaScarpe[i].qnt >= listaScelte[i]) {

          // vado a sttrarre il numero dei pezzi acuistati dell'articolo
          listaScarpe[i].qnt = listaScarpe[i].qnt - listaScelte[i];
          var nodoOrdine = document.createElement("p");
          nodoOrdine.textContent =
            " n. " + listaScelte[i] + " " + listaScarpe[i].modello;
          nodo.appendChild(nodoOrdine);
          somma += listaScarpe[i].prezzo * listaScelte[i];
          salva();
          show();
        } else {
          var nodoOrdine = document.createElement("p");
          nodoOrdine.textContent = "Prodotto non disponibile";
          nodo.appendChild(nodoOrdine);
        }
      }
    }

    var nodoPrezzo = document.createElement("h3");
    nodoPrezzo.textContent = "Il totale da pagare è: " + somma + " euro";
    nodo.appendChild(nodoPrezzo);
  }
}
// funzione per caricare sfondo img
function setBgImage() {
  4
  document.body.style.backgroundImage = "url('assets/img/sfondo-spiaggia.jpg')";
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundPosition = "center center";
}