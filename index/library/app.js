$(function () {
    // Get the form.
    var form = $("#products");

    // Get the messages div.
    var formMessages = $("#form-messages");

    $(form).submit(function (event) {
        // Stop the browser from submitting the form.
        event.preventDefault();

        // Serialize the form data.
        var formData = $(form).serialize();
        // Submit the form using AJAX.
        $.ajax({
            type: "POST",
            url: $(form).attr("action"),
            dataType: "json",
            data: formData
        })
                .done(function (response) {
                    // Make sure that the formMessages div has the "success" class.
                    $(formMessages).removeClass("error");
                    $(formMessages).addClass("success");

                    // Set the message text.
                    var response1 = JSON.stringify(response);
                    var jsonObj = JSON.parse(response1);

                    $.ajax({
                        type: "GET",
                        url: jsonObj.URI
                    })
                            .done(function (message) {

                                $("#myBody").append("<tr><td>" + message.name + "</td>" +
                                        "<td>" + message.category + "</td>" +
                                        "<td>" + message.amount + "</td>" +
                                        '<td><a class="thumbnail">' + message.location + '<span><iframe src="https://www.google.com/maps/embed/v1/place?q=' + message.location + '%2C%20Netherlands&key=AIzaSyAjlhbQOe4DTT7CIEAHCeqJWDpoBCEwrOE"></iframe><br /></span></a><br /></td>' +
                                        "<td>" + message.date + "</td></tr>");

                                $("#myTable").trigger("update");

                                return false;
                            });

                    // Clear the form.
                    $("#name").val("");
                    $("#category").val("");
                    $("#amount").val("");
                    $("#location").val("");
                    $("#date").val("");

                })
                .fail(function (data) {
                    // Make sure that the formMessages div has the "error" class.
                    $(formMessages).removeClass("success");
                    $(formMessages).addClass("error");

                    // Set the message text.
                    if (data.responseText !== "") {
                        $(formMessages).text(data.responseText);
                    } else {
                        $(formMessages).text("Oops! An error occoured and your message \n\
could not be sent.");
                    }
                });
    });
});