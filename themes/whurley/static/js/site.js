$(function(){

  //Vimeo Background Cover
  var timeoutId;
  var $videoBgAspect = $(".videobg-aspect");
  var $videoBgWidth = $(".videobg-width");
  var videoAspect = $videoBgAspect.outerHeight() / $videoBgAspect.outerWidth();

  function videobgEnlarge() {
    console.log('resize');
    windowAspect = ($(window).height() / $(window).width());
    if (windowAspect > videoAspect) {
      $videoBgWidth.width((windowAspect / videoAspect) * 100 + '%');
    } else {
      $videoBgWidth.width(100 + "%")
    }
  }

  $(window).resize(function() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(videobgEnlarge, 100);
  });

  $(function() {
    videobgEnlarge();
  });

  var iframe = $('#videobg-video')[0],
  player = $f(iframe),
  status = $('.status');

  player.addEvent('ready', function() {
    player.api('setVolume', 0);
    console.log('shh....');
  });

  var waypointElement = 'digital-citizen';
  var waypoint = new Waypoint({
    element: document.getElementById(waypointElement),
    handler: function(direction) {
      console.log(waypointElement)
    }
  })
});
