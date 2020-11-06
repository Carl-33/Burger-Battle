$(document).ready(function () {
    const commentContainer = $(".comments-container");

    var url = window.location.search;
    let restaurantId;
    if (url.indexOf("?restaurant_id=") !== -1) {
        restaurantId = url.split("=")[1];
        getComments(restaurantId);
    }
    // If there's no restarauntId we just get all posts as usual
    else {
        getComments();
    }
    // This function grabs posts from the database and updates the view
    function getComments(restaurant) {
        restaurantId = restaurant || "";
        if (restaurantId) {
            restaurantId = "/?author_id=" + restaurantId;
            console.log("yo " + restaurantId);
        }
        $.get("/api/comments" + restaurantId, function (data) {
            console.log("Comments", data);
            comments = data;
            if (!comments || !comments.length) {
                displayEmpty(restaurant);
            }
            else {
                initializeRows();
            }
        });
    }

    function initializeRows() {
        commentContainer.empty();
        let commentsToAdd = [];
        for (var i = 0; i < comments.length; i++) {
            commentsToAdd.push(createNewRow(commments[i]));
        }
        commentContainer.append(commentsToAdd);
    }

    function createNewRow(comments) {
        var newPostCard = $("<div>");
        newPostCard.addClass("card");
        var newPostCardHeading = $("<div>");
        newPostCardHeading.addClass("card-header");
        newPostTitle.text(restaurant.name + " ");
        newPostCardHeading.append(newPostTitle);
        var newPostCardBody = $("<div>");
        var listOfComments = $("<ul")

        for (let i = 0; i < comments.length; i++) {
            var listItem = $("<li>")
            listItem.text(comments[i].body)
            listOfComments.append(listItem);
        }
        newPostCardBody.append(listOfComments);
        return newPostCard;
    }
    function displayEmpty(id) {
        var query = window.location.search;
        var partial = "";
        if (id) {
          partial = " for Restaurant #" + id;
        }
        commentsContainer.empty();
        var messageH2 = $("<h2>");
        messageH2.css({ "text-align": "center", "margin-top": "50px" });
        messageH2.html("No posts yet" + partial + ", navigate <a href='/cms" + query +
        "'>here</a> in order to get started.");
        commentsContainer.append(messageH2);
      }
})