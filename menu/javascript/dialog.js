//提示框
function promptDialog(id, title,content, width){
	var html = "";
	html += '<div class="public-modal modal fade" id="' + id + '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">';
	html += '<div class="modal-dialog" role="document" style="width:' + width + '">';
	html += '<div class="modal-content">';
	html += '<div class="modal-header">';
	html += '<h4 class="modal-title" id="myModalLabel">' + title + '</h4>';
	html += '</div>';
	html += '<div class="modal-body">';
	html+='<div class="prompt-content">'+content+'</div>';
	html += '</div>';
	html += '<div class="mf modal-footer no-border">';
	html += '<button type="button" class="btn confirm-btn modal-btn" data-dismiss="modal">确认</button>';
	html += '</div>';
	html += '</div>';
	html += '</div>';
	html += '</div>';
	$('body').append(html);
}