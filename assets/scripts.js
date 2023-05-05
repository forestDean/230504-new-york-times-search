$(document).ready(function () {
    
    //console.log("Hi");

//when search button is clicked
$("#searchButton").on("click", function (event) {
    //prevent default
    event.preventDefault();
    
    //empty list of articles
    $("#searchResult").empty()
    var qEl = $("#searchTerm").val().trim();
    console.log(qEl);
  
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + qEl + "&api-key=10nA59IjknaAvnUiW4BNLTgmSAwQHXpl";
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function (response) {
        var results = response.response.docs;
        console.log(results);
  
        //for each doc
        for (var i = 0; i < results.length; i++) {
          //create new div, add bootstrap class
          var articleDiv = $("<div>").attr("class", "card");
          
          //get headline
          var headline = $("<h2>").text(results[i].headline.main).attr("class", "card-title");
          //get paragraph
          var p = $("<p>").text(results[i].lead_paragraph).attr("class", "card-text");
          // get link to full article
          var link = $("<a>").text("Read More").attr("href", results[i].web_url)
  
          //append all elements to artcile div
          articleDiv.append(headline, p, link);
          //append article div to view area
          $("#searchResult").append(articleDiv);
        }
      });
    });
  
});
  