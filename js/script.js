/* ---------- Footer Year Update ---------- */

	var theYear = new Date().getFullYear();

	$("#year").html(theYear);

/* ---------- Regular Expressions For Frorm Validations ---------- */

var reProperName = /^[a-z ,.'-]+$/i;
var reEmail = /^(\w+[\-\.])*\w+@(\w+\.)+[A-Za-z]+$/;

/* ---------- Contact Us Form ---------- */

/* Validate First and Last Names */

$("#fname").blur(function(){
	if ($(this).val() == "") {
		$(this).parent().addClass("has-error");
		$(this).next("span").addClass("glyphicon-remove");
		$(this).next("span").next().html("Required information.")
		$("#sendmessage").addClass("disabled");

	} else if (!reProperName.test($(this).val())) {
		$(this).parent().addClass("has-error");
		$(this).next("span").addClass("glyphicon-remove");
		$(this).next("span").next().html("Not a valid name.")
		$("#sendmessage").addClass("disabled");
	} else {
		$(this).parent().removeClass("has-error");
		$(this).next("span").removeClass("glyphicon-remove");
		$(this).next("span").next().html("");
		$("#sendmessage").removeClass("disabled");
	};
});


/* Validate Email Address */

$("#email").blur(function(){
if ($(this).val() == "") {
		$(this).parent().addClass("has-error");
		$(this).next("span").addClass("glyphicon-remove");
		$(this).next("span").next().html("Email address required.")
		$("#sendmessage").addClass("disabled");

	} else if (!reEmail.test($(this).val())) {
		$(this).parent().addClass("has-error");
		$(this).next("span").addClass("glyphicon-remove");
		$(this).next("span").next().html("Not a valid email address")
		$("#sendmessage").addClass("disabled");
	} else {
		$(this).parent().removeClass("has-error");
		$(this).next("span").removeClass("glyphicon-remove");
		$(this).next("span").next().html("");
		$("#sendmessage").removeClass("disabled");
	};
});

/* Validate Message Body Address */


$("#message").blur(function(){
		if ($(this).val() == "") {
			$(this).parent().addClass("has-error");
			$(this).next("span").addClass("glyphicon-remove");
			$(this).next("span").next().html("Required information.")
			$("#sendmessage").addClass("disabled");
		}  else if ($(this).val().length < 5) {
			$(this).parent().addClass("has-error");
			$(this).next("span").addClass("glyphicon-remove");
			$(this).next("span").next().html("More information is required. Keep typing...")
			$("#sendmessage").addClass("disabled");
		} else if ($(this).val().length > 1000) {
			$(this).parent().addClass("has-error");
			$(this).next("span").addClass("glyphicon-remove");
			$(this).next("span").next().html("You typed " + $(this).val().length + " characters. Maximum message limit is 1000 characters.")
			$("#sendmessage").addClass("disabled");
		} else {
			$(this).parent().removeClass("has-error");
			$(this).next("span").removeClass("glyphicon-remove");
			$(this).next("span").next().html("");
			$("#sendmessage").removeClass("disabled");
		};
});


function submitForm() {
	
	var $firstName = $("#fname");
	var $email = $("#email");
	var $message = $("#message");
	
	function submitValidate(element) {
		$(element).parent().addClass("has-error");
		$(element).next("span").addClass("glyphicon-remove");
		$(element).next("span").next().html("Required information.");
	};

	if ($firstName.val() == "" || $email.val() == "" || $message.val() == "" || $message.val().length < 5) {
		
		$("#sendmessage").addClass("disabled");

		if ($firstName.val() == "") {
			submitValidate($firstName);
		};

		if ($email.val() == "") {
			submitValidate($email);
		};

		if ($message.val() == "" || $message.val().length < 5){
			submitValidate($message);
		};				
	} else {
		sendForm();
	}
}

/* SendForm via AJAX*/

function sendForm() {
		
	$("#sendmessage").addClass("disabled");

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
				$("#statusheader").html("Thank you!");		
				$("#status").html("Thanks for reaching out to us, " + $firstName.val() + "! We will respond to your request as soon as possible.");						
				$firstName.val("");
				$email.val("");
				$message.val("");
				$("#sendmessage").removeClass("disabled");		
			} else {
				$('#mymodal').modal({show: true});				
				$("#statusheader").html("There was an error sending your message. Please try again later.");				
				$("#status").html(ajax.responseText);
				$("#sendmessage").removeClass("disabled");
			}
		}
	}
	ajax.send(formdata);
}

/* ---------- Google Map API ---------- */

function initMap() {
        var uluru = {lat: 41.037955, lng: -93.7810656};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 14,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
      }

/* ---------- Smooth Scrolling ---------- */


// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });      

/* ---------- Close Mobile Drop Down Menu on Scroll (Used for single page navigation) ---------- */

$(function() {
    $('.nav a').on('click', function(){ 
        if($('.navbar-toggle').css('display') !='none'){
            $(".navbar-toggle").trigger( "click" );
        }
    });
});