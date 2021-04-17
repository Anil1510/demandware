
function initialize() {
	$('.availability-novariation').html('This item does not exist.');

	$('#backInStock-btn').on('click',function(e) {
		$('#backinstock-msg').html('').removeClass('backinstock-error');
		$('#backinstock-div').css('display','block').dialog('open');
	});

	$('#backinstock-div').dialog({
	    autoOpen: false,  
	    modal: true,
	    width: "350px"
	 });
}

function backInStockSubmit(url) {
	
	var email = $('#backinstock-email').val();
	if(!validateEmail(email)){
		$('#backinstock-msg').addClass('backinstock-error').html('Please enter valid email address');
		return ;
	}
	
	var firstName = $('#backinstock-firstName').val();
	var lastName = $('#backinstock-lastName').val();
	var pid = $('#backinstock-pid').val();
	
	var data = 'firstName='+firstName+'&lastName='+lastName+'&email='+email+'&pid='+pid;
	
	var options = {
			data : data,
			url : url,
			type : 'post'
	};

	$.ajax(options).done(function (response) {
		if (response.success) {
			$('#backinstock-div').addClass('backinstock-success').html(response.message);
		}else {
			$('#backinstock-msg').html(response.message).addClass('backinstock-error');
		}
	});
}

/**
 * The function is called from newsletterwidget.isml and validates mandatory email 
 * 
 */
function validateEmail(email){
	var regex = /^[\w.%+-]+@[\w.-]+\.[\w]{2,6}$/;
	return regex.test(email);
}

if ( document.readyState === 'complete'  ) {
	initialize();
}

document.addEventListener( 'DOMContentLoaded', initialize); 