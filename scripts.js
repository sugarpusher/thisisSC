document.addEventListener("DOMContentLoaded", function() {
  "use strict"

  var links = document.querySelectorAll("a.scroll")
  var i = links.length
  var root = /firefox|trident/i.test(navigator.userAgent) ? document.documentElement : document.body
  var easeInOutCubic = function(t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t + b
    return c/2*((t-=2)*t*t + 2) + b
  }

  while (i--) 
    links.item(i).addEventListener("click", function(e) {
      var startTime
      var startPos = root.scrollTop
      var endPos = document.getElementById(/[^#]+$/.exec(this.href)[0]).getBoundingClientRect().top
      var maxScroll = root.scrollHeight - window.innerHeight
      var scrollEndValue = startPos + endPos < maxScroll ? endPos : maxScroll - startPos
      var duration = 900
      var scroll = function(timestamp) {
        startTime = startTime || timestamp
        var elapsed = timestamp - startTime
        var progress = easeInOutCubic(elapsed, startPos, scrollEndValue, duration)
        root.scrollTop = progress
        elapsed < duration && requestAnimationFrame(scroll)
      }   
      requestAnimationFrame(scroll)
      e.preventDefault()
    }) 
})

$(document).ready(function(){

  $('.slider-top').slick({
    infinite: true,
    slidesToScroll: 1,
    slidesToShow: 3,
    centerMode: true,
    autoplaySpeed: 5000,
    asNavFor: ".slider-bottom",
    prevArrow: "<i class='fa fa-angle-left slick-prev' aria-hidden='true'></i>",
    nextArrow: "<i class='fa fa-angle-right slick-next' aria-hidden='true'></i>",
    responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
  });

  $('.slider-bottom').slick({
    // infinite: true,
    slidesToScroll: 1,
    slidesToShow: 1,
    asNavFor: ".slider-top",
    fade: true,
    arrows: false
  });
});

