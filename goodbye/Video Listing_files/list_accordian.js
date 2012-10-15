$(document).ready(function(){
    $('.list_header_link.contracted').next().hide();

    $('.list_header_link').click(function(event){
        event.preventDefault();
        var linkElem = $(this);
        var sectionElem = $(this).next();
        if(linkElem.hasClass('expanded')){
            linkElem.removeClass('expanded');
            linkElem.addClass('contracted');
            sectionElem.slideUp();
            linkElem.find('.list_header_state').html('(collapsed, click to expand)');
        }
        else if(linkElem.hasClass('contracted')){
            linkElem.removeClass('contracted');
            linkElem.addClass('expanded');
            sectionElem.slideDown();
            linkElem.find('.list_header_state').html('(expanded, click to collapse)');
        }
    });
});
