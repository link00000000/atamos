$(function() {

  sizeCanvas();

  $(window).on('resize', function() {
    sizeCanvas();
  });

});

// Sizes the canvas to width or height
function sizeCanvas() {

  var height, width;

  height = $(window).innerHeight();
  width = $(window).innerWidth();

  if(height > width) {
    console.log('[Setup] ' + width + 'x' + height + ' - Height is larger');
    $('#canvas').css({
      'width': width + 'px',
      'height': width + 'px',
    });
  } else {
    console.log('[Setup] ' + width + 'x' + height + ' - Width is larger');
    $('#canvas').css({
      'width': height + 'px',
      'height': height + 'px',
    });
  }

}
