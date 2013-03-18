function initPage(){
	$('div.scrollGallery').mouseGallerySlide();
}
if (window.addEventListener) window.addEventListener("load", initPage, false);
else if (window.attachEvent && !window.opera) window.attachEvent("onload", initPage);
