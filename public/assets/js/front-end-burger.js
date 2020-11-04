$(document).ready(function() {
    /* global moment */
  
    // blogContainer holds all of our posts
    var blogContainer = $(".blog-container");
    var postCategorySelect = $("#category");
    // Click events for the edit and delete buttons
    $(document).on("click", "button.plus", handlePostEdit);
    // Variable to hold our posts
    var posts;
  
    // The code below handles the case where we want to get blog posts for a specific author
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
      blogContainer.append(restaurantsToAdd);
    }
  
    // This function constructs a post's HTML
    function createNewRow(restaraunt) {
      var newPostCard = $("<div>");
      newPostCard.addClass("card");
      var newPostCardHeading = $("<div>");
      newPostCardHeading.addClass("card-header");
      var voteBtn = $("<button>");
      voteBtn.text("Vote for this");
      voteBtn.addClass("vote btn btn-info");
      var newPostTitle = $("<h2>");
      var newPostDate = $("<small>");
      var newPostAuthor = $("<h5>");
      newPostAuthor.text("Written by: " + post.Author.name);
      newPostAuthor.css({
        float: "right",
        color: "blue",
        "margin-top":
        "-10px"
      });
      var newPostCardBody = $("<div>");
      newPostCardBody.addClass("card-body");
      var newPostBody = $("<p>");
      newPostTitle.text(post.title + " ");
      newPostBody.text(post.body);
      newPostDate.text(formattedDate);
      newPostTitle.append(newPostDate);
      newPostCardHeading.append(deleteBtn);
      newPostCardHeading.append(editBtn);
      newPostCardHeading.append(newPostTitle);
      newPostCardHeading.append(newPostAuthor);
      newPostCardBody.append(newPostBody);
      newPostCard.append(newPostCardHeading);
      newPostCard.append(newPostCardBody);
      newPostCard.data("post", post);
      return newPostCard;
    }
  
    // This function figures out which post we want to delete and then calls deletePost
    function handlePostDelete() {
      var currentPost = $(this)
        .parent()
        .parent()
        .data("post");
      deletePost(currentPost.id);
    }
  
    // This function figures out which post we want to edit and takes it to the appropriate url
    function handlePostEdit() {
      var currentPost = $(this)
        .parent()
        .parent()
        .data("post");
      window.location.href = "/cms?post_id=" + currentPost.id;
    }
  
    // This function displays a message when there are no posts
    function displayEmpty(id) {
      var query = window.location.search;
      var partial = "";
      if (id) {
        partial = " for Author #" + id;
      }
      blogContainer.empty();
      var messageH2 = $("<h2>");
      messageH2.css({ "text-align": "center", "margin-top": "50px" });
      messageH2.html("No posts yet" + partial + ", navigate <a href='/cms" + query +
      "'>here</a> in order to get started.");
      blogContainer.append(messageH2);
    }
  
  });
  