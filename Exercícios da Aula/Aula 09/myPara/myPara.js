$(function() {

	$("#addPara").click(function () {
		$("#paraList").append("<li>" + $("#paraText").val() + "</li>");
		$("#paraText").val("");
	});

});