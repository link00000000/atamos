
// Holds JSON data for all atoms
var atoms;
var currentAtoms = [];

$(function() {

  // Retrieves JSON data for all atoms
  var req = new XMLHttpRequest();
  req.onload = reqListener;
  req.open('get', '/json/atoms.json', true);
  req.send();

});

// Executes after JSON files have been loaded
function ready() {
  var cx, cy, r;
  var animationsFinished = true;

  findCenter();
  findRadius();
  populateBoard();
  addAtom(1);
  textSize();

  $('body').on('click', function(e) {

      console.clear();
      getCursorPos(e);
      addToCurrentAtoms();
      moveCursorBox(e);
      //addAtom();

  });

  // Executes when window size changes
  $(window).resize(function() {
    textSize();
    findCenter();
  });
}

// Callback after retrieving JSON data for all atoms
function reqListener(e) {
  atoms = JSON.parse(this.responseText);
  ready();
}

// Adds a new random atom
function addAtom(atom) {
  if(!atom) {
    atom = randomNum(1, 118);
  }
  $('.newest').removeClass('newest');
  $('#ring').append('<div class="atom newest ' +
                    atoms.atoms[atom].name.toLowerCase() +
                    '"><div class="symbol">' +
                    atoms.atoms[atom].symbol +
                    '</div><div class="number">'
                    + atom +
                    '</div><div class="atomCenter"></div></div>');
  $('.newest').animate({
    'width': '15%',
    'height': '15%',
    'opacity': '1',
  },{
    'duration': 250,
    'easing': 'easeOutBack',
    'step': function() {textSize();},
    'done': function() {textSize(true);},
  });
  return $('.newest');
}

// Sets the size of the text in atoms
function textSize(end) {

  var atomSize;

  atomSize = parseInt($('.atom').css('width'), 10);

  $('.symbol').css('font-size', atomSize / 3 + 'px');
  $('.number').css('font-size', atomSize / 6 + 'px');

  if(end) {
    console.log('[Text Size] Atom size ' + atomSize);
  }

}

// Returns the position of the center element
function findCenter() {
  cx = $('#center').offset().left;
  cy = $('#center').offset().top;
  console.log('[Center] ' + cx + ', ' + cy);
}

// Return sthe radius of the ring element
function findRadius() {
  r = $('#ring').width() / 2;
  console.log('[Radius] ' + r + 'px');
}

function populateBoard() {
  for(var i = 0; i < 4; i++) {
    var atom = randomNum(1, 3);
    currentAtoms.push(addAtom(atom));
  }
  updateAtomRing();
}

// Returns the current cursor position
function getCursorPos(e) {
  var x = e.pageX;
  var y = e.pageY;
  console.log('[Cursor] Position (' + x + ', ' + y +')');
  x = cx - x;
  y = cy - y;
  console.log('[Cursor] Relative position (' + x + ', ' + y +')');
  getAngle(x, y);
}

// Returns the angle of the cursor relative to the center position
function getAngle(x, y) {
  angle = Math.atan2(x, y);
  console.log('[Mouse] Current angle from center point: ' + angle + ' radians');
  getAtomPosition();
}

// Decides where to place the atom in the array
function getAtomPosition() {
  var spaces = [];

  for(i in currentAtoms) {
    var j = parseInt(i) + 1;
    var x, y;
    var start, finish;
    var obj;

    x = currentAtoms[i].children('.atomCenter').offset().left;
    y = currentAtoms[i].children('.atomCenter').offset().top;

    console.log(x + ', ' + y);

    start = Math.atan2(y, x);

    if(j !== currentAtoms.length) {
      x = cx - currentAtoms[j].children('.atomCenter').offset().left;
      y = cy - currentAtoms[j].children('.atomCenter').offset().top;
    } else {
      x = cx - currentAtoms[0].children('.atomCenter').offset().left;
      y = cy - currentAtoms[0].children('.atomCenter').offset().top;
    }

    finish = Math.atan2(y, x);

    obj = {'start': start, 'finish': finish};

    console.log(i + ': ' + start + ' - ' + finish);

    spaces.push(obj);
  }

  console.log(spaces);

  for(i in spaces) {
    if(spaces[i].start <  angle /*&& spaces[i].finish > angle*/) {
      console.log(i);
    }
  }

  currentAtoms[0].css('background-color', 'red');
  currentAtoms[1].css('background-color', 'orange');
  currentAtoms[2].css('background-color', 'yellow');
  currentAtoms[3].css('background-color', 'green');
  currentAtoms[4].css('background-color', 'blue');
  currentAtoms[5].css('background-color', 'purple');

}

// Adds newest atom to current atoms list
function addToCurrentAtoms() {
  var atom = $('.newest');
  //currentAtoms.push(atom);
  //updateAtomRing();
}

function updateAtomRing() {
  console.log('[Atoms] Current Atoms: ' + currentAtoms.length);

  var dividedAngle = 2 * Math.PI / currentAtoms.length;

  for(i in currentAtoms) {
    moveAtom(currentAtoms[i], dividedAngle * i);
  }

}

// Moves the atom to a new location on ring
function moveAtom(elem, angle) {
  var margin = ($('#ring').width() / 2) - ($('#ring').width() / 2) * .75;
  var radius = r - margin;
  angle -= Math.PI / 2;

  elem.animate({
    'left': Math.sin(angle) * radius,
    'top': Math.cos(angle) * radius,
  }, 200);
}

// Generates a random number between two numbers including the min and max
function randomNum(min, max) {
  var num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

//Moves the cursor box to the location of the cursor
function moveCursorBox(e) {
  $('#cursor').css({
    'left': e.pageX,
    'top': e.pageY,
  });
}

// Checks all atoms for a background color.
// Returns array with indexes of atoms without background color
function checkBackground() {
  var array = [];
  for(var i = 0; i < atoms.atoms.length; i++) {
    addAtom(i);
    var color = $('.' + atoms.atoms[i].name.toLowerCase()).css('background-color');
    if(color === 'rgba(0, 0, 0, 0)') {
      array.push(i);
    }
  }
}

// Auto fills ring with specified number of atoms
function randomAtoms(num) {
  for(var i = 0; i < num; i++) {
    var xVar = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
    var yVar = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
    var angle = Math.atan2(cy - yVar, cx - xVar) - Math.PI / 2;
    var margin = ($('#ring').width() / 2) - ($('#ring').width() / 2) * .75;
    var radius = r - margin;

    $('.newest').css({
      'left': Math.sin(angle) * radius,
      'top': Math.cos(angle) * -radius,
    });

    addAtom();
  }
}
