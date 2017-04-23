/* ---------- Footer Year Update ---------- */

	var theYear = new Date().getFullYear();

	$("#year").html(theYear);

/* ---------- Regular Expressions For Frorm Validations ---------- */

var reProperName = /^([A-Z][A-Za-z]+ )*[A-Z][A-Za-z']+$/;
var reEmail = /^(\w+[\-\.])*\w+@(\w+\.)+[A-Za-z]+$/;
var rePhone = /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/;
var reZipCode = /^\d{5}(\-\d{4})?$/;
//var reUserName = /^[A-Za-z\d]{6,15}$/;
//var rePassword = /^[A-Za-z\d]{6,8}$/;


/* ---------- Contact Us Form ---------- */

/* Validate First and Last Names */

$("#fname").blur(function(){
	if ($(this).val() == "") {
		$(this).parent().addClass("has-error");
		$(this).next("span").addClass("glyphicon-remove");
		$(this).next("span").next().html("Required information.")
		$("#sendmessage").disabled = true;

	} else if (!reProperName.test($(this).val())) {
		$(this).parent().addClass("has-error");
		$(this).next("span").addClass("glyphicon-remove");
		$(this).next("span").next().html("Not a valid proper name.")
		$("#sendmessage").disabled = true;
	} else {
		$(this).parent().removeClass("has-error");
		$(this).next("span").removeClass("glyphicon-remove");
		$(this).next("span").next().html("");
		$("#sendmessage").disabled = false;
	};
});


/* Validate Email Address */

$("#email").blur(function(){
if ($(this).val() == "") {
		$(this).parent().addClass("has-error");
		$(this).next("span").addClass("glyphicon-remove");
		$(this).next("span").next().html("Email address required.")
		$("#sendmessage").disabled = true;

	} else if (!reEmail.test($(this).val())) {
		$(this).parent().addClass("has-error");
		$(this).next("span").addClass("glyphicon-remove");
		$(this).next("span").next().html("Not a valid email address")
		$("#sendmessage").disabled = true;
	} else {
		$(this).parent().removeClass("has-error");
		$(this).next("span").removeClass("glyphicon-remove");
		$(this).next("span").next().html("");
		$("#sendmessage").disabled = false;
	};
});

/* Validate Message Body Address */


$("#message").blur(function(){
		if ($(this).val() == "") {
			$(this).parent().addClass("has-error");
			$(this).next("span").addClass("glyphicon-remove");
			$(this).next("span").next().html("Required information.")
			$("#requestbutton").disabled = true;
		}  else if ($(this).val().length < 5) {
			$(this).parent().addClass("has-error");
			$(this).next("span").addClass("glyphicon-remove");
			$(this).next("span").next().html("More information is required. Keep typing...")
			$("#requestbutton").disabled = true;
		} else if ($(this).val().length > 1000) {
			$(this).parent().addClass("has-error");
			$(this).next("span").addClass("glyphicon-remove");
			$(this).next("span").next().html("You typed " + $(this).val().length + " characters. Maximum message limit is 1000 characters.")
			$("#requestbutton").disabled = true;
		} else {
			$(this).parent().removeClass("has-error");
			$(this).next("span").removeClass("glyphicon-remove");
			$(this).next("span").next().html("");
			$("#requestbutton").disabled = false;
		};
});


function submitForm() {
	
	var $firstName = $("#fname");
	var $email = $("#email");
	var $message = $("#message");
	
	function submitValidate(element) {
		$(element).parent().addClass("has-error");
		$(element).next("span").addClass("glyphicon-remove");
		$(element).next("span").next().html("Required information.")
	};

	if ($firstName.val() == "" || $lastName.val() == "" || $email.val() == "" || $message.val() == "") {
		
		$("#sendmessage").disabled = true;

		if ($firstName.val() == "") {
			submitValidate($firstName);
		};

		if ($email.val() == "") {
			submitValidate($email);
		};

		if ($message.val() == "") {
			submitValidate($message);
		};				
	} else {
		sendForm();
	}
}

/* SendForm via AJAX*/

function sendForm() {
		
	$('#sendmessage').disabled = true;

	var $firstName = $("#fname");
	var $email = $("#email");
	var $message = $("#message");

	var formdata = new FormData();
	formdata.append("fname", $firstName.val());
	formdata.append("email", $email.val());
	formdata.append("message", $message.val());	
	var ajax = new XMLHttpRequest();
	ajax.open("POST", "email_parser.php");
	ajax.onreadystatechange = function() {
		if (ajax.readyState == 4 && ajax.status == 200) {
			if (ajax.responseText == "success") {
				$('#mymodal').modal({show: true});
				$("#statusheader").innerHTML = "Message Status";		
				$("#status").html("Thank you, " + $firstName.val() + "! Your message has been sent!");						
				$firstName.val("");
				$email.val("");
				$message.val("");
				$("#sendmessage").disabled = false;		
			} else {
				$('#mymodal').modal({show: true});				
				$("#statusheader").html("Oops! There was an error...");				
				$("#status").html(ajax.responseText);
				$("#sendmessage").disabled = false;
			}
		}
	}
	ajax.send(formdata);
}