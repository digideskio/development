google.load('search', '1');

function init() {
	google.search.CustomSearchControl.attachAutoCompletion(
		'012219474299167704206:xxyp0barzlw',
		document.getElementById('query-input')
	);
}

function submitQuery() {
	window.location = '/results/?q='
		+ encodeURIComponent(
			document.getElementById('query-input').value);
	return false;
}

google.setOnLoadCallback(init);
