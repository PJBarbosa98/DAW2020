$(function() {

	$.get('http://localhost:7710/paras', function (data) {
		data.forEach(p => {
			$("#paraList").append("<li>" + p.text + "</li>");
		})
	})

	$("#addPara").click(function () {
		$("#paraList").append("<li>" + $("#paraText").val() + "</li>");
		$.post("http://localhost:7710/paras", $("#myParaForm").serialize());
		//alert("Record inserted: " + JSON.stringify($("#myParaForm").serialize()));
		$("#paraText").val("");
	});

});