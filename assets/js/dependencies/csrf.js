/**
 * Created by root on 3/3/15.
 */
$(document).ready(function(){
	$.get('/csrfToken', function(data){
		$('._csrf').val(data._csrf);
	});
});
