/*
steps to take when wanting to visualize data:
1 sanitize data !done
2 display names on y axis
3 sort by latitude
4 draw graphs on x axis (in two directions)
5 display x and y axis
6 make it beautiful
*/

let table;
let cities = [];
let tempNow = [];
let tempFuture = [];

let zeroX;
let zeroY;
let _yOffset = 5;
let _xOffset = 45;

let _alignCities = 10;
let _rectHeight = 10;
let _rectFactor = 4;
let _textOffset = 10;

let _hue = 275;
let nowPos, futurePos;

function preload() {
  table = loadTable("future_cities_data_sorted.csv", "csv", "header");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();
  rectMode(CORNER);

  for (r = 0; r < 26; r++) {
    cities.push(table.getString(r, "current_city"));
    tempNow.push(table.getString(r, "Annual_Mean_Temperature"));
    tempFuture.push(table.getString(r, "future_Annual_Mean_Temperature"));
  }

  print(cities[1]);
  print(tempNow[1]);

  colorMode(HSB);

  zeroX = width / 2;
  zeroY = 40;
}

function draw() {
  background(0);
  textSize(5);
  noStroke();
  textAlign(CENTER, CENTER);

  translate(zeroX, zeroY);

  //title
  fill(255);
  textSize(8);
  textFont("Helvetica");
  text("TEMPERATURES NOW vs IN 50 YEARS", 0, -30);

  //x axis texts
  noStroke();
  fill(255);
  textAlign(CENTER);
  textSize(6);
  textFont("Times New Roman");
  text("temperature", 0, -15);
  text("0°", -_xOffset, -15);
  text("0°", _xOffset, -15);
  text("15°", -_xOffset - 15 * _rectFactor, -15);
  text("15°", _xOffset + 15 * _rectFactor, -15);
  text("30°", -_xOffset - 30 * _rectFactor, -15);
  text("30°", _xOffset + 30 * _rectFactor, -15);
  //y axis texts
  text("geographical latitude", -_rectFactor * 53, ((_alignCities + _yOffset) * cities.length) / 2);
  text("0°", -_rectFactor * 50 + 20, ((_alignCities + _yOffset) * cities.length) / 2);

  //draw x axis
  stroke(200);
  strokeCap(ROUND);
  strokeWeight(0.5);
  line(-50 * _rectFactor, -10, 50 * _rectFactor, -10);

  //draw y axes
  line(0 - _xOffset, -10, 0 - _xOffset, (_alignCities + _yOffset) * cities.length);
  line(_xOffset, -10, _xOffset, (_alignCities + _yOffset) * cities.length);
  line(-_rectFactor * 50 + 30, -10, -_rectFactor * 50 + 30, (_alignCities + _yOffset) * cities.length);
  line(-_rectFactor * 50 + 30, ((_alignCities + _yOffset) * cities.length) / 2, _rectFactor * 50, ((_alignCities + _yOffset) * cities.length) / 2);

  //visualize data
  for (i = 0; i < cities.length; i++) {
    //draw now rectangles
    noStroke();
    fill(_hue, 80, 100);
    rect(
      0 - tempNow[i] * _rectFactor - _xOffset,
      (_alignCities + _yOffset) * i,
      tempNow[i] * _rectFactor,
      _rectHeight
    );
    //draw future rectangles
    fill(_hue - 75, 80, 100);
    rect(
      0 + _xOffset,
      (_alignCities + _yOffset) * i,
      tempFuture[i] * _rectFactor,
      _rectHeight
    );
    //city names
    fill(255);
    textSize(8);
    textFont("Helvetica");
    text(cities[i], 0, (_yOffset + _textOffset) * i + _rectHeight / 2);
  }
}
