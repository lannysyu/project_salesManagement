$(document).ready(function () {

  $('.menu').niceScroll({
    cursorcolor: '#999999', // Changing the scrollbar color
    cursorwidth: 4, // Changing the scrollbar width
    cursorborder: 'none', // Rempving the scrollbar border
  });

  // when opening the sidebar
  $('.nav-icon').on('click', function () {
    // open sidebar
    $('.menu').toggleClass('open');
  });

  // if dismiss or overlay was clicked
  $('#dismiss').on('click', function () {
    $('#sidenav').removeClass('open');
  });
  
  	
});

$(function () {
  $('.jq-clickBtn').click(function (e) {
    e.preventDefault();
    $('.jq-clickBtn').toggleClass('active');
    $('.jq-dropdown').slideToggle();
  });
});

$(function () {
  $('.system-clickBtn').click(function (e) {
    e.preventDefault();
    $('.system-clickBtn').toggleClass('active');
    $('.system-dropdown').slideToggle();
  });
});
$(function () {
  $('.auth-clickBtn').click(function (e) {
    e.preventDefault();
    $('.auth-clickBtn').toggleClass('active');
    $('.auth-dropdown').slideToggle();
  });
});
