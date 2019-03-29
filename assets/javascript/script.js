// Initial array of topics

function displayGIFs() {

    var topic = $(this).attr("data-topic");

    var queryURL = "http://api.giphy.com/v1/gifs/search?q=brooklyn+nine+nine+" + topic + "&api_key=ivVTH3dDkQoM7NuttLDp6pFg83wYQss8&limit=10";

    // Creating an AJAX call for the specific button clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        
        for (let idx = 0; idx < response.data.length; idx++) {
            
            // Creating a div to hold the gifs
            var gifDiv = $("<div class='gifs'>");
            
            // Retrieving the URL for the image
            var imgURL = response.data[idx].images.downsized.url;

            // Retrieving link to image on giphy
            var giphyURL = response.data[idx].url;
            
            // Creating an element to hold the image
            var image = $("<img>").attr("src", imgURL);
           
            // Appending the image
            gifDiv.append(image);
            
            // Storing the rating data
            var rating = response.data[idx].rating;
            
            // Creating an element to have the rating displayed
            var pRating = $("<p class='rated'>").text("Rated: " + rating);
            
            // Displaying the rating
            gifDiv.append(pRating);
            
            // Adding new gifs to the top of the display
            $("#gifsDiv").prepend(gifDiv);
            
        }
        console.log(response);
    });

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

// Function for "playing" images
$(document).on("click", ".gifs", playGif);
function playGif() {
    var gifState = $(this).data("state");
 //   var imageURL = respData.images.downsized.url;

    if ($(this).data("state", "still")) {
 //       imgURL = $(this).attr("src", imageURL+".url");
        $(this).data('state', 'playing');
        console.log('playing');
    } else {
 //       imgURL = respData.images.downsized_still.url;
        $(this).data('state','still');
        console.log('still');
    }
};

// Adding a click event listener to all elements with a class of "topics-btn"
$(document).on("click", ".topic-btn", displayGIFs);

// Calling the renderButtons function to display the intial buttons
renderButtons();