$(document).ready(function() {
    /* global moment */
  
    // restaurantContainer holds all of our posts
    var restaurantContainer = $(".restaurant-container");
    var postCategorySelect = $("#category");
    // Click events for the vote and delete buttons
    $(document).on("click", "button.plus", handlePostEdit);
    // Variable to hold our posts
    var posts;
  
    // The code below handles the case where we want to get comments for a specific restaurant
    // Looks for a query param in the url for author_id
    var url = window.location.search;
    var restarauntId;
    if (url.indexOf("?restaurant_id=") !== -1) {
      restarauntId = url.split("=")[1];
      getPosts(authorId);
    }
    // If there's no authorId we just get all posts as usual
    else {
      getPosts();
    }
  
  
    // This function grabs posts from the database and updates the view
    function getPosts(restaurant) {
        restarauntId = restaraunt || "";
      if (restarauntId) {
        restarauntId = "/?restaurant_id=" + restarauntId;
      }
      $.get("/api/restaurants" + restarauntId, function(data) {
        console.log("Restaurants", data);
        posts = data;
        if (!posts || !posts.length) {
          displayEmpty(restaurant);
        }
        else {
          initializeRows();
        }
      });
    }

  
    // InitializeRows handles appending all of our constructed post HTML inside blogContainer
    function initializeRows() {
      blogContainer.empty();
      var restaurantsToAdd = [];
      for (var i = 0; i < restaurants.length; i++) {
        restaurantsToAdd.push(createNewRow(restaurants[i]));
      }
      restaurantContainer.append(restaurantsToAdd);
    }
  
    // This function constructs a post's HTML
    function createNewRow(restaraunt) {
      var newRestarauntCard = $("<div>");
      newRestarauntCard.addClass("card");
      var newRestaurantCardHeading = $("<div>");
      newRestaurantCardHeading.addClass("card-header");
      var voteBtn = $("<button>");
      voteBtn.text("Add to the Score!");
      voteBtn.addClass("vote btn btn-outline-danger");
      var newRestaurantName = $("<h2>");
      var newPostDate = $("<small>");
      var newPostAuthor = $("<h5>");
      newPostAuthor.text("Written by: " + restaraunt.name);
      newPostAuthor.css({
        float: "right",
        color: "blue",
        "margin-top":
        "-10px"
      });
      var newRestaurantCardBody = $("<div>");
      newRestaurantCardBody.addClass("card-body");
      var newPostBody = $("<p>");
      newRestaurantName.text(post.title + " ");
      newPostBody.text(post.body);
      newPostDate.text(formattedDate);
      newPostTitle.append(newPostDate);
      newRestaurantCardHeading.append(deleteBtn);
      newRestaurantCardHeading.append(voteBtn);
      newRestaurantCardHeading.append(newPostTitle);
      newRestaurantCardHeading.append(newPostAuthor);
      newRestaurantCardBody.append(newPostBody);
      newRestarauntCard.append(newRestaurantCardHeading);
      newRestarauntCard.append(newRestaurantCardBody);
      newRestarauntCard.data("restaurant", restaurant);
      return newRestarauntCard;
    }

    // This function figures out which post we want to edit and takes it to the appropriate url
    function handlePostEdit() {
      var currentPost = $(this)
        .parent()
        .parent()
        .data("restaurant");
      window.location.href = "/cms?post_id=" + currentPost.id;
    }
  
    // This function displays a message when there are no posts
    function displayEmpty(id) {
      var query = window.location.search;
      var partial = "";
      if (id) {
        partial = " for Restaurant #" + id;
      }
      restaurantContainer.empty();
      var messageH2 = $("<h2>");
      messageH2.css({ "text-align": "center", "margin-top": "50px" });
      messageH2.html("No posts yet" + partial + ", navigate <a href='/cms" + query +
      "'>here</a> in order to get started.");
      restaurantContainer.append(messageH2);
    }
  
  });
  