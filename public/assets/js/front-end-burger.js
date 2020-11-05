$(document).ready(function () {
  /* global moment */

  // restaurantContainer holds all of our restaurants
  var restaurantContainer = $(".restaurant-container");
  // var postCategorySelect = $("#category");
  // Click event for the vote buttons
  $(document).on("click", ".vote", upVote);
  // Click event for going to comments page
  // $(document).on("click", ".comments", handleCommentEdit);
  // Click events for adding a burger Joint
  $(document).on("submit", "#newRestaurant", createRestaurant);
  $(document).on("click", "#addRestaurant", createRestaurant);
  // Variable to hold our restaurants
  var restaurants;
  var $newItemInput = $("#newRestaurant")

  getRestaurants();
  // The code below handles the case where we want to get comments for a specific restaurant
  // Looks for a query param in the url for restaurant_id
  // var url = window.location.search;
  // var restarauntId;
  // if (url.indexOf("?restaurant_id=") !== -1) {
  //   restarauntId = url.split("=")[1];
  //   getRestaurants(restarauntId);
  // }
  // // If there's no restarauntId we just get all comments as usual
  // else {
  //   getRestaurants();
  // }

  //   function getRestaurants(restaurant) {
  //     restarauntId = restaraunt || "";
  //   if (restarauntId) {
  //     restarauntId = "/comments/?restaurant_id=" + restarauntId;
  //   }
  //   $.get("/api/restaurants" + restarauntId, function(data) {
  //     console.log("Restaurants", data);
  //     restaurants = data;
  //     if (!restaurants || !restaurants.length) {
  //       displayEmpty(restaurant);
  //     }
  //     else {
  //       initializeRows();
  //     }
  //   });
  // }
  // This function grabs comments from the database and updates the view
  // function getComments(restaurant) {
  //     restarauntId = restaraunt || "";
  //   if (restarauntId) {
  //     restarauntId = "/comments/?restaurant_id=" + restarauntId;
  //   }
  //   $.get("/api/restaurants" + restarauntId, function(data) {
  //     console.log("Restaurants", data);
  //     restaurants = data;
  //     if (!restaurants || !restaurants.length) {
  //       displayEmpty(restaurant);
  //     }
  //     else {
  //       initializeRows();
  //     }
  //   });
  // }
  function getRestaurants() {
    $.get("/api/restaurant", function (data) {
      restaurants = data;
      initializeRows();
    });
  }

  // InitializeRows handles appending all of our constructed restaurant HTML inside restaurantContainer
  function initializeRows() {
    restaurantContainer.empty();
    var restaurantsToAdd = [];
    for (var i = 0; i < restaurants.length; i++) {
      restaurantsToAdd.push(createNewRow(restaurants[i], i));
    }
    restaurantContainer.append(restaurantsToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(restaurant, i) {
    var newRestarauntCard = $("<div>");
    newRestarauntCard.addClass("card");
    var newRestaurantCardHeading = $("<div>");
    newRestaurantCardHeading.addClass("card-header");
    var voteBtn = $("<button>");
    voteBtn.text("Add to the Score!");
    voteBtn.attr('id', i)
    voteBtn.addClass(`vote btn btn-outline-danger`);
    var commentsLink = $("<p>");
    commentsLink.text("Comments!");
    commentsLink.addClass("comments")
    var score = $("<p>");
    score.text(restaurant.Score + " ");
    score.addClass(`score`);
    score.attr('id', `score-${i}`)
    score.data("score", restaurant.Score);
    var newRestaurantName = $("<h2>");
    // var newPostDate = $("<small>");
    // var newPostAuthor = $("<h5>");
    // newPostAuthor.text("Written by: " + restaraunt.name);
    // newPostAuthor.css({
    //   float: "right",
    //   color: "blue",
    //   "margin-top":
    //   "-10px"
    // });
    // var newRestaurantCardBody = $("<div>");
    // newRestaurantCardBody.addClass("card-body");
    // var newPostBody = $("<p>");
    newRestaurantName.text(restaurant.Name + " ");
    // newPostBody.text(post.body);
    // newPostDate.text(formattedDate);
    newRestaurantName.append(commentsLink);
    newRestaurantName.append(score);
    // newRestaurantCardHeading.append(deleteBtn);
    newRestaurantCardHeading.append(voteBtn);
    newRestaurantCardHeading.append(newRestaurantName);
    // newRestaurantCardHeading.append(newPostAuthor);
    // newRestaurantCardBody.append(newPostBody);
    newRestarauntCard.append(newRestaurantCardHeading);
    // newRestarauntCard.append(newRestaurantCardBody);
    newRestarauntCard.data("restaurant", restaurant);
    return newRestarauntCard;
  }

  // This function figures out which post we want to edit and takes it to the appropriate url
  // function handleCommentEdit() {
  //   var currentComment = $(this)
  //     .parent()
  //     .parent()
  //     .data("restaurant");
  //   window.location.href = "/comments/?restaurant_id=" + currentComment.id;
  // }

  // This function displays a message when there are no restaurants
  // function displayEmpty(id) {
  //   var query = window.location.search;
  //   var partial = "";
  //   if (id) {
  //     partial = " for Restaurant #" + id;
  //   }
  //   restaurantContainer.empty();
  //   var messageH2 = $("<h2>");
  //   messageH2.css({ "text-align": "center", "margin-top": "50px" });
  //   messageH2.html("No comments yet" + partial + ", navigate <a href='/comments" + query +
  //   "'>here</a> in order to get started.");
  //   restaurantContainer.append(messageH2);
  // }


  function createRestaurant(event) {
    event.preventDefault();
    var newRestaurant = {
      Name: $newItemInput.val().trim(),
      Score: 0
    };

    $.post("/api/restaurant", newRestaurant, getRestaurants);
    $newItemInput.val("");
  }


  function upVote(event) {
    event.stopPropagation();
    var id = $(this).attr("id");
    var vote = parseInt($(`#score-${id}`).text());
    console.log(typeof vote, `vote equals ${vote}`)
      updateRestaurant(vote)
  }

  function updateRestaurant(vote) {
    $.ajax({
      method: "PUT",
      url: "/api/restaurant",
      data: vote
    }).then(getRestaurants);
  }
});