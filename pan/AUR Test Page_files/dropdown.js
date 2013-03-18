$(document).ready(function(){

	$("#primary-navigation li").hover(
		function(){$(this).addClass("ssfdd");},
		function(){$(this).removeClass("ssfdd");}
	);
	
	$('.jump-navi a.label').click(function() {
		return false;
	})

});
