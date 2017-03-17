
$(function(){


        var stickyHeaderTop = $('#stickyheader').offset().top;



        $(window).scroll(function(){

                if( $(window).scrollTop() > stickyHeaderTop ) {

                        $('#stickyheader').css({position:'fixed', top: '0px'});

                        $('#stickyalias').css('display', 'block');

                } else {

                        $('#stickyheader').css({position: 'static', top: '0px'});

                        $('#stickyalias').css('display', 'none');

                }

        });

  });
  
  
