// Initial array of topics
var topics = ["B99", "Jake Peralta", "Amy Santiago", "Captain Holt", "Stephanie Beatriz", "Cool", "Dog"];

function displayGIFs() {

    var topic = $(this).attr("data-topic");

    var queryURL = "http://api.giphy.com/v1/gifs/search?q=brooklyn+nine+nine+" + topic + "&api_key=ivVTH3dDkQoM7NuttLDp6pFg83wYQss8&limit=10";

    // Creating an AJAX call for the specific button clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
            console.log(response);
            for (let idx = 0; idx < response.data.length; idx++) {
                var results = response.data[idx]

                // Creating a div to hold the gifs
                var gifDiv = $("<div class='gifs'>");

                // Retrieving the URL for the image
                var imgURL = results.images.downsized.url;

                // Retrieving link to image on giphy
                var giphyURL = results.url;

                // Creating an element to hold the image
                var image = $("<img>").attr("src", imgURL).attr("data-state", "still").attr("class", "gifImg")

                // Creating an anchor tag to the image on giphy
                 var giphyAnchor = $('<a>').attr('href', giphyURL).attr('class', 'gifImg').attr("target", "_blank")

                // Appending the image
                 giphyAnchor.append(image);
                 gifDiv.append(giphyAnchor);

                // Storing the rating data
                var rating = results.rating;

                // Creating an element to have the rating displayed
                var pRating = $("<p class='rated'>").text("Rated: " + rating);

                // Displaying the rating
                gifDiv.append(pRating);

                // Adding new gifs to the top of the display
                $("#gifsDiv").prepend(gifDiv);

            }
            // Event listener to toggle image from still to active
            // I never could quite get this to work!!
            // $(".gifImg").on("click", function (event) {
            //     event.preventDefault();
            //     let state = $(this).data("state");
            //     if (state === "still") {
            //         $(this).attr("data-state", "active");
            //         console.log(state);
            //     } else {
            //         $(this).attr("data-state", "still");
            //         console.log(state);
            //     }
            // });
        }

    );

}



// Function for creating buttons
function renderButtons() {

    // Deleting the topics prior to adding new ones
    $("#buttons").empty();

    // Looping through the array of topics
    for (var i = 0; i < topics.length; i++) {

        // Then dynamicaly generating buttons for each topic in the array
        var a = $("<button>");
        // Adding a class of topic-btn to our button
        a.addClass("topic-btn");
        // Adding a data-attribute
        a.attr("data-topic", topics[i]);
        // Providing the initial button text
        a.text(topics[i]);
        // Adding the button to the buttons div
        $("#buttons").append(a);
    }
}

// This function handles events where a button is clicked
$("#add-topic").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var newTopic = $("#topic-input").val().trim();

    // Adding movie from the textbox to our array
    topics.push(newTopic);
    $("#topic-input").val('');
    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});

// Adding a click event listener to all elements with a class of "topics-btn"
$(document).on("click", ".topic-btn", displayGIFs);




// Calling the renderButtons function to display the intial buttons
renderButtons();