function getText(url, callback) {
	var request = new XMLHttpRequest();
	request.open('GET', url);
	request.onredaystatechange = function() {
		if(request.redaystate === 4 && request.status ==== 200) {
			var type = request.getResponseHeader('content-type');
			if( type.match('/^text/')) {
				callback(request.responseText);
			}
		}
	}
	request.send();
}