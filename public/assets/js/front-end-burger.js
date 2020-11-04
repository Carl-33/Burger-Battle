// Make sure we wait for the DOM to be fully loaded before attaching handlers
$(function(){
// on click event listener for 'favorite' button
// that has a ajax put request
// that adds one to the restaraunt's overall score
// Then reloads the page
// locations.reaload();

// event listener for submiting  a new restaraunt
// ajax call to add the restaurant info to the database
// // .then(
//     function() {
//         console.log("created new burger place");
//         // Reload the page to get the updated list
//         location.reload();
//       }
$(".create-form").on("submit", function(event){
    event.preventDefault();
    let newBurgerJoint = {
        name: $("#burg").val().trim()
    };
    // send POST request.
    // $.ajax("api/burgers", {
    //     type: "POST",
    //     data: newBurgerJoint
    // }).then(
    //     function(){
    //         console.log("Party Time at " + newBurgerJoint.name)            
    //         location.reload();
    //     }
    // );
    console.log("Party Time at " + newBurgerJoint.name)
});

// event listener for adding a comment to a burger place
$("#add-comment").on ("submit")
// ajax put request that adds a comment to the comments table
// // .then(
//     function() {
//         console.log("added a comment");
//         // Reload the page to get the updated list
//         location.reload();
//       }

});