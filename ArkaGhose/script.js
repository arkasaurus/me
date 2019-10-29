var container = document.getElementById('changeText');

var things = ['Front-end Development', 'Web Design', 'Industrial Design','User Experience'];
var t = -1;
var thing = '';
var mode = 'write';
var delay = 1000;
var message = container.innerHTML;
function updateText(txt) {
    container.innerHTML = txt;
}

function tick() {

    if(container.innerHTML.length == 0) {
        t++;
        thing = things[t];
        message = '';
        mode = 'write';
    }

    switch(mode) {
        case 'write' :
            message += thing.slice(0, 1);
            thing = thing.substr(1);

            updateText(message);

            if(thing.length === 0 && t === (things.length - 1)) {
                window.clearTimeout(timeout);
                return;
            }

            if(thing.length == 0){
                mode = 'delete';
                delay = 1500;
            } else {
                delay = 32 + Math.round(Math.random() * 40);
            }

            break;

        case 'delete' :
            message = message.slice(0, -1);
            updateText(message);

            if(message.length == 0)
            {
                mode = 'write';
                delay = 1500;
            } else {
                delay = 32 + Math.round(Math.random() * 100);
            }
            break;
    }

    timeout = window.setTimeout(tick, delay);
}

var timeout = window.setTimeout(tick, delay);





(function($) {
    
      $.fn.menumaker = function(options) {
          
          var cssmenu = $(this), settings = $.extend({
            title: "Menu",
            format: "dropdown",
            breakpoint: 768,
            sticky: false
          }, options);
    
          return this.each(function() {
            cssmenu.find('li ul').parent().addClass('has-sub');
            if (settings.format != 'select') {
              cssmenu.prepend('<div id="menu-button">' + settings.title + '</div>');
              $(this).find("#menu-button").on('click', function(){
                $(this).toggleClass('menu-opened');
                var mainmenu = $(this).next('ul');
                if (mainmenu.hasClass('open')) { 
                  mainmenu.hide().removeClass('open');
                }
                else {
                  mainmenu.show().addClass('open');
                  if (settings.format === "dropdown") {
                    mainmenu.find('ul').show();
                  }
                }
              });
    
              multiTg = function() {
                cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');
                cssmenu.find('.submenu-button').on('click', function() {
                  $(this).toggleClass('submenu-opened');
                  if ($(this).siblings('ul').hasClass('open')) {
                    $(this).siblings('ul').removeClass('open').hide();
                  }
                  else {
                    $(this).siblings('ul').addClass('open').show();
                  }
                });
              };
    
              if (settings.format === 'multitoggle') multiTg();
              else cssmenu.addClass('dropdown');
            }
    
            else if (settings.format === 'select')
            {
              cssmenu.append('<select style="width: 100%"/>').addClass('select-list');
              var selectList = cssmenu.find('select');
              selectList.append('<option>' + settings.title + '</option>', {
                                                             "selected": "selected",
                                                             "value": ""});
              cssmenu.find('a').each(function() {
                var element = $(this), indentation = "";
                for (i = 1; i < element.parents('ul').length; i++)
                {
                  indentation += '-';
                }
                selectList.append('<option value="' + $(this).attr('href') + '">' + indentation + element.text() + '</option');
              });
              selectList.on('change', function() {
                window.location = $(this).find("option:selected").val();
              });
            }
    
            if (settings.sticky === true) cssmenu.css('position', 'fixed');
    
            resizeFix = function() {
              if ($(window).width() > settings.breakpoint) {
                cssmenu.find('ul').show();
                cssmenu.removeClass('small-screen');
                if (settings.format === 'select') {
                  cssmenu.find('select').hide();
                }
                else {
                  cssmenu.find("#menu-button").removeClass("menu-opened");
                }
              }
    
              if ($(window).width() <= settings.breakpoint && !cssmenu.hasClass("small-screen")) {
                cssmenu.find('ul').hide().removeClass('open');
                cssmenu.addClass('small-screen');
                if (settings.format === 'select') {
                  cssmenu.find('select').show();
                }
              }
            };
            resizeFix();
            return $(window).on('resize', resizeFix);
    
          });
      };
    })(jQuery);
    
    (function($){
    $(document).ready(function(){
    
    $(document).ready(function() {
      $("#cssmenu").menumaker({
        title: "Menu",
        format: "dropdown"
      });
    
      $("#cssmenu a").each(function() {
          var linkTitle = $(this).text();
          $(this).attr('data-title', linkTitle);
      });
    });
    
    });
    })(jQuery);
    

 