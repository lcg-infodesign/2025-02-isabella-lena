let table; //creo una variabile vuota che si chiama table
function preload() {
  // put preload code here
  //dove si caricano le informazioni
  table = loadTable("dataset.csv", "csv", "header"); 
  //la variabile table deve contenere quello che arriva dal dataset
}

function setup() {
  //controllo se ho caricato i dati
  console.log(table)
  let outerPadding = 50;
  let padding = 20;
  let itemSize = 35;

  //calcolo il numero di colonne
  let cols = floor((windowWidth - outerPadding*2)/(itemSize+padding));
  //floor serve per arrotondare per difetto
  let rows = ceil(table.getRowCount()/cols);

  let totalHeight = outerPadding * 2 + rows * itemSize + (rows-1) * padding;

  //creo il canvas
  createCanvas(windowWidth, windowHeight);

  background('rgba(91, 218, 52, 1)');

  let colCount = 0;
  let rowCount = 0;
  for(let rowNumber = 0; rowNumber < table.getRowCount(); rowNumber++) {
    let data = table.getRow(rowNumber).obj;
    let xPos = outerPadding + colCount * (itemSize + padding);
    let yPos = outerPadding + rowCount * (itemSize + padding);
    //carico dati della riga
    console.log("riga numero", rowNumber);
    
    console.log(data);

    //prendo valore per dimensione
    let myValue = data["column0"];

    //calcolo min e massimo
    let allValues = table.getColumn("column0");
    let minValue = min(allValues);
    let maxValue = max(allValues);
    //se usiamo lerpcolor al posto di map e si danno due colori al posto del valore max e min
    let scaledValue = map(myValue, minValue, maxValue, 1, itemSize);

    //seconda variabile per il colore 
    let value2 = data["column2"];
    let allValues2 = table.getColumn("column2");
    let minValue2 = min(allValues2);
    let maxValue2 = max(allValues2);
    let value2Mapped = map(value2, minValue2, maxValue2, 0, 1);

    let c1 = color("black");
    let c2 = color("white");

    let mappedColor = lerpColor(c1, c2, value2Mapped);

    fill(mappedColor);

    //terza variabile numero di gocce
    let value3 = data["column3"];
    let allValues3 = table.getColumn("column3");
    let minValue3 = min(allValues3);
    let maxValue3 = max(allValues3);
    let numDrips = map(value3, minValue3, maxValue3, 0, 15);
    let numDripsInt = floor(numDrips); // Mi assicuro che sia un numero intero

    let radius = scaledValue / 2;

    //quarta variabile per la lunghezza delle gocce
    let value4 = data["column4"];
    let allValues4 = table.getColumn("column4");
    minValue4 = min(allValues4);
    let maxValue4 = max(allValues4);
    let dripLength = map(value4, minValue4, maxValue4, 3, 25);
    let dripLengthInt = floor(dripLength); // Mi assicuro che sia un numero intero

    for (let i = 0; i < numDripsInt; i++) {
      // Scelgo un punto di partenza sulla metà inferiore del cerchio
      let angle = random(0, PI);
      let startX = xPos + cos(angle) * radius;
      let startY = yPos + sin(angle) * radius;
      
      // Chiamo la funzione per disegnare la scia statica
      drawStaticDrip(startX, startY, mappedColor, dripLength);
    }

    ellipse(xPos, yPos, scaledValue, scaledValue);
    strokeWeight (0);

    //aumento colCount
    colCount++;
    //controllo se siamo a fine riga
    if(colCount == cols) {
      colCount = 0;
      rowCount++; //il conteggio delle colonne aumenta di uno
    }
  }
}

function drawStaticDrip(startX, startY, col, length) {
  let currentX = startX;
  let currentY = startY;

  fill(col);
  noStroke();

  for (let i = 0; i < length; i++) {
    // Disegno un piccolo pezzo della goccia
    ellipse(currentX, currentY, 2, 2); // Disegno un punto

    // Sposto il "pennello" per il prossimo pezzo
    currentY += 1; // Sempre verso il basso
  }
}

function draw() {
  // put drawing code here
}