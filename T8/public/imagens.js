function showImage (name, type) {

	if (type == 'image/png' || type == 'image/jpeg')
		var ficheiro = '<img src="/fileStore/' + name + '" width="80%"/>';
	else
		var ficheiro = '<p>' + name + ', ' + type + '</p>';

	var fileObj = $(`
		<div class="w3-row w3-margin">
			<div class="w3-col s6">
				${ficheiro}
			</div>
			<div class="w3-col s6 w3-border">
				<p>File Name: ${name}</p>
				<p>Mime Type: ${type}</p>
			</div>
		</div>
	`);

	var download = $('<div><a href="/files/download/' + name + '">Download</a></div>');
	// clear div that holds image (useful when opening another pic, so as not to see the previous)
	$("#display").empty();
	$("#display").append(fileObj, download);
	$("#display").modal();
}