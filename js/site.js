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
  
  var mainWaypoints = ['digital-citizen', 'entrepreneur-innovator', 'speaker-author'];
  var wayPointContents = [];
  var menu = $('#main-header').clone();
  
  for(var i=0; i<mainWaypoints.length;i++){
    var waypointElement =  document.getElementById(mainWaypoints[i]);
    wayPointContents.push(waypointElement.innerHTML);

    new Waypoint({
      element: waypointElement,
      handler: function (dir) {
        var currentWayPoint = parseInt($(this)[0].key.split("-")[1]);
        for (var x = 0; x < mainWaypoints.length; x++) {
          var resetElem = document.getElementById(mainWaypoints[x]);
          resetElem.innerHTML = wayPointContents[x];
        }
        menu.addClass('active-pane-menu');
        menu[0].style.marginTop = "-180px";
        menu[0].style.paddingBottom = "100px";
        var activeMenu = mainWaypoints[currentWayPoint];
        $(menu.find('.navbar-nav')[0].children).each(function(i, nav){
          var item = (($(nav).find('a:first').attr('href')).substring(2));
          if (item == activeMenu) {
            $(nav).addClass('active-nav-item');
          }
          else {
            $(nav).removeClass('active-nav-item');
          }
        });
        $(this)[0].element.innerHTML = menu[0].outerHTML + $(this)[0].element.innerHTML;

      },
      offset: "100px"
    });
  }

  //Instafeed
  var feed = new Instafeed({
    accessToken: '1774741907.ba4c844.16245f6b6ef34f35b3bd57eb39fbe266',
    resolution: 'standard_resolution',
    template: '<div class="col-md-3"><a href="{{link}}" target="_blank"><div class="fadeInUp animated" style="background-image: url({{image}});"></div></a></div>',
    get: 'user',
    userId: '609171954', //whurley
    /* uncomment once a tag is provided
    filter: function(image) {
      return image.tags.indexOf('unicorn') >= 0;
    }*/
  });
  feed.run();

  // bind the load more button
  var loadButton = document.getElementById('more-instagram');
  loadButton.addEventListener('click', function() {
    feed.next();
  });
  

  
});
