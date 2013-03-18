google.load('search', '1');

function getQuery() {
	var url = '' + window.location;
	var queryStart = url.indexOf('?') + 1;
	
	if (queryStart > 0) {
	  var parts = url.substr(queryStart).split('&');
	  for (var i = 0; i < parts.length; i++) {
		if (parts[i].length > 2 && parts[i].substr(0, 2) == 'q=') {
		  return decodeURIComponent( parts[i].split('=')[1].replace(/\+/g, ' '));
		}
	  }
	}
	return '';
}

function onLoad() {		
	var customSearchControl = new google.search.CustomSearchControl('012219474299167704206:hxpmgsbob68');
	var drawOptions = new google.search.DrawOptions();

	drawOptions.setInput(document.getElementById('hidden-input'));

	customSearchControl.setLinkTarget(google.search.Search.LINK_TARGET_SELF);
	customSearchControl.draw('results', drawOptions);
	customSearchControl.execute(getQuery());
	
}

google.setOnLoadCallback(onLoad);
