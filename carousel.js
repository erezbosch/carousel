$.Carousel = function (el) {
  this.$el = $(el);
  this.activeIdx = 0;
  $('div.items :first-child').addClass("active");
  $('.slide-left').on("click", this.slide.bind(this, 1));
  $('.slide-right').on("click", this.slide.bind(this, -1));
}

$.Carousel.prototype.slide = function (dir) {
  if (this.transitioning) { return; }
  this.transitioning = true;

  var length = $('div.items img').length;
  var toAdd = dir === -1 ? "right" : "left";

  var $oldImg = $('div.items img').eq(this.activeIdx);

  this.activeIdx = (this.activeIdx + dir) % length;
  this.activeIdx < 0 ? this.activeIdx += length : "";

  var $activeImg = $('div.items img').eq(this.activeIdx);
  $activeImg.addClass("active").addClass(toAdd);

  $oldImg.one("transitionend", function () {
    $oldImg.removeClass("active").removeClass("left").removeClass("right");
    this.transitioning = false;
  }.bind(this));

  setTimeout(function () {
    $oldImg.addClass(toAdd === "left" ? "right" : "left");
    $activeImg.removeClass(toAdd);
  }, 0);
}

$.fn.carousel = function () {
  return this.each(function () {
    new $.Carousel(this)
  })
}
