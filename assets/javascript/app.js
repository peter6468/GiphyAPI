//A page can't be manipulated safely until the document is "ready." jQuery detects this state 
//of readiness for you. Code included inside $( document ).ready() will only run once the page 
//Document Object Model (DOM) is ready for JavaScript code to execute. Code included inside 
//$( window ).on( "load", function() { ... }) will run once the entire page (images or iframes), 
//not just the DOM, is ready.
$(document).ready(function() {
  console.log( "ready!" );

var topics =["Adventure Time", "Avatar", "Gravity Falls", "The Amazing World of Gumball", "Steven Universe", "Teen Titan", "Phineas and Ferb", "Spongebob", "The Regular Show", "Samurai Jack"];

//topic button: none of this works
  function createButtons() {

  $("#myButtons").empty();
  $("#user-input").empty();

  for (var i =0; i < topics.length; i++) {
    var a = $("<button>");
        a.addClass("topic");
        a.attr("data-cartoon", topics[i]);
        a.text(topics[i]);
        $("#myButtons").append(a);

      }
    }
  
    

  //adding another cartoon: this doesnt work either
  $("#submit-btn").on("click", function(event) {
    event.preventDefault();
    //take user input
    var topic =$("#user-input").val().trim();
    console.log(topics);

    //add new cartton to array
    if (topics.indexOf(topic) === -1) {
      topics.push(topic);
    }

    //call the function
    createButtons();

    //hit enter instead of press submit btn
    return false;
  });


$("#gifs-appear-here").on("click", ".pix img", function() {
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  console.log(state);
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});
 //event del. myButton wh/lives html than find child topic and run function
$("#myButtons").on("click", ".topic", function() {
  // Grabbing and storing the data-cartoon property value from the button
  var cartoon = $(this).attr("data-cartoon");

  // Constructing a queryURL using the animal name
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    cartoon + "&api_key=dc6zaTOxFJmzC&limit=10";
    console.log(queryURL);

  // Performing an AJAX request with the queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // After data comes back from the request
    .then(function(response) {
      console.log(queryURL);

      console.log(response);
      // storing the data from the AJAX request in the results variable
      var results = response.data;


      // Looping through each result item
      for (var i = 0; i < results.length; i++) {

        // Creating and storing a div tag
        var cartoonDiv = $("<div class='pix'>");

        // Creating a paragraph tag with the result item's rating
        var p = $("<p>").text("Rating: " + results[i].rating);
        console.log(p);

        // Creating and storing an image tag
        var cartoonImage = $("<img>");

        // Setting the src attribute of the image to a property pulled off the result item
        cartoonImage.attr("src", results[i].images.fixed_height.url);
        cartoonImage.attr("data-state", "animate");
        cartoonImage.attr("data-still", results[i].images.fixed_width_still.url);
        cartoonImage.attr("data-animate", results[i].images.fixed_height.url);
         //console.log(cartoonImage.attr("data-state", "still"));
         //console.log(cartoonImage.attr("data-still", "staticSrc"));
         //console.log(cartoonImage.attr("data-animate", "defaultAnimatedSrc"));
         //the last 3 consoles above were all useless to me

        // Appending the paragraph and image tag to the animalDiv
        cartoonDiv.append(p);
        cartoonDiv.append(cartoonImage);
          
        //gif state


        // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
        $("#gifs-appear-here").prepend(cartoonDiv);
      }
    });
});

createButtons();
});   