$(document).ready(function() {
  // Init Masonry
  var $grid = $('.grid').masonry({
    columnWidth: '.grid-sizer',
    percentPosition: true,
    gutter: 0,
    horizontalOrder: true,
    itemSelector: '.grid-item',
  });
  // Layout Masonry after each image loads
  $grid.imagesLoaded().progress( function() {
    $grid.masonry('layout');
  });
});
