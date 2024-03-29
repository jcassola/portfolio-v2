(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Facts counter
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 2000,
  });

  // Typed Initiate
  if ($(".typed-text-output").length == 1) {
    var typed_strings = $(".typed-text").text();
    var typed = new Typed(".typed-text-output", {
      strings: typed_strings.split(", "),
      typeSpeed: 100,
      backSpeed: 20,
      smartBackspace: false,
      loop: true,
    });
  }

  // Skills
  $(".skill").waypoint(
    function () {
      $(".progress .progress-bar").each(function () {
        $(this).css("width", $(this).attr("aria-valuenow") + "%");
      });
    },
    { offset: "80%" }
  );

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });

  // Submit form
  $("#contact-me-form").submit(function (event) {
    new Swal({
      // width: '80%',
      title: "Sending email...",
      allowOutsideClick: false,
    });
    Swal.showLoading();
    event.preventDefault();
    const body = {
      from: $("#email").val(),
      to: "jcassola96@gmail.com",
      subject: $("#subject").val(),
      text: $("#message").val() + "\nSigned: " + $("#name").val(),
    };
    sendEmail(body);
  });
})(jQuery);

function sendEmail(body) {
  fetch("https://mailer-pby8.onrender.com/contact-me", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(() => {
      Swal.fire(
        "Email sent!",
        "Thank you, you will be contacted shortly.",
        "success"
      );
      cleanForm();
    })
    .catch(() => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error. Please, try again later.",
      });
    });
}

//Clean contact form
function cleanForm() {
  const inputs = document.querySelectorAll("#name, #email, #subject, #message");

  inputs.forEach((input) => {
    input.value = "";
  });
}
