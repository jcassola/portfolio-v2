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
    event.preventDefault();
    const body = {
      token: "c14677a7fe2aeb483ba790d22df0d7a1ee0f30fe0287822aa45d84fb6530104e",
      name: $("#name").val(),
      address: $("#email").val(),
      recipient: "jcassola96@gmail.com",
      subject: $("#subject").val(),
      body: $("#message").val(),
    }
    sendEmail(body);
  });
})(jQuery);

function sendEmail(body) {
  fetch("https://jts-email-service.herokuapp.com/api/email-service", {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
