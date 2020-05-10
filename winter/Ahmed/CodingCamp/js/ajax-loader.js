$(document).ready(function() {
  //**** OPTIONAL ****
    // Example of a custom ajax insert function
    (function($) {
      $.fn.fadeInsert = function(options) {
        //console.log(options);
        //the option is an array : {html:the ajax html, scripts: the scripts that already are in the html, customData:any data you associated to this state during navigate} 
        var that = $(this);
        that.fadeOut(300, function(){
          that.html(options.html);
          that.fadeIn(300, function(){
            that.trigger({type:"finishrefreshinsert"});
          });
        });
        return this;
      };
    })(jQuery); 

    //show you the events of navigate
    $("html")
    .on('donerefresh', "body", function(){
      $("#info").html(document.location.href+" loaded");
    })
    .on('startrefresh', "body", function(){
      $("#info").html('loading....');
    })
    .on('failrefresh', "body", function(){
      $("#info").html('Error loading....');
    });
  //**** /OPTIONAL ****
  
  //THIS IS THE ONLY NEEDED LINE
  //Just init navigate and any link without target="_blank" will become an ajax link
//how to create a custom function : 
(function($) {
    $.fn.insertPageHtml = function(options) {
        //the option is an array : {html:the ajax html, scripts: the scripts that already are in the html, customData:any data you associated to this state during navigate} 
        //switch elements
        $('#page-content').html($("#page-content", options.html).html());
        $(this).trigger({type:"finishrefreshinsert"});
    };
})(jQuery);

//and then in your init function you do : 
$(document).ready(function() {
    $.navigate.init({
		ajaxLinks:'#ajax-loader a:not(.zoom), a.link-next, a.link-prev, a.link-index, body.onepage-home .breadcrumb a, body.onepage-home #content-inner a:not(.zoom)',
        defaultInsertFunction:'insertPageHtml'
    });
});
});  