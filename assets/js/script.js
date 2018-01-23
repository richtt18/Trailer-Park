$(function() {

    // variables
    var youtubeID = "";
    var youtubeLink = '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + youtubeID + '" + frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
    var youtubeTest = '<iframe width="560" height="315" src="https://www.youtube.com/embed/V3Tp0X1OlBQ" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';

    // html code chunks
    var homeDisplay = `
        <div class="jumbotron jumbotron-fluid header">
            <div class="container">
                <h1 class="display-4">Trailer Park</h1>
                <p class="lead">Search for your favorite film.</p>
            </div>
        </div>
        <div class="trailerDisplay"></div>
    `

    var searchDisplay = `
        <div class="jumbotron jumbotron-fluid">
            <div class="container">
                <h1 class="display-4 title"></h1>
                <div class="row">
                    <div class="col-sm-4">
                        <div class="poster"></div>
                    </div>
                    <div class="col-sm-8">
                        <div class="row">
                            <div class="trailer"></div>
                        </div>
                        <div class="row">
                            <div class="actors"></div>
                        </div>
                        <div class="row">
                            <div class="MovieRating"></div>
                        </div>
                    </div>
            </div>
    `

    // functions

        // call on Youtube API
        var YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3/search";

        var parameters = {
            part: 'snippet',
            key: 'AIzaSyBTUrsKGzURto5Z2fG6dHY1KLm-nVVfALA',
            type: 'video'
        };
    
        var displayResults = function(data){
            console.log(data)
            $('.trailer').append(
            '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + data.items[1].id.videoId + '" + frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');
        };
    
        var getData = function() {
            $.getJSON(YOUTUBE_BASE_URL, parameters, displayResults);
        };


        // scroll animate
        window.sr = ScrollReveal();

            //animate header
            sr.reveal(".header", {
                duration: 2000,
                origin: "bottom"
            });

            //animate search bar
            sr.reveal(".searchBar", {
                duration: 4000,
                origin: "bottom"
            });


        // toUpperCase
        function titleCase(str) {
            str = str.toLowerCase().split(' ');

            for(var i = 0; i < str.length; i++){
                 str[i] = str[i].split('');
                 str[i][0] = str[i][0].toUpperCase();
                 str[i] = str[i].join('');
            }
            return str.join(' ');
        };


        // onclick return to the home page
        $(".homeBtn").on("click", function(event) {
            event.preventDefault();

            // dynamically replace html
            $(".contentContainer").empty();
            $(".contentContainer").html(homeDisplay);

            // empty search bard
            $("form").trigger("reset");
        });


        // onclick display trailer and poster using userInput
        $(".submitBtn").on("click", function(event) {
            event.preventDefault();


            // grab the user input
            var userInput = $("#userInput").val().trim();

            // dynamically replace html
            $(".trailerDisplay").empty();
            $(".trailerDisplay").html(searchDisplay);


            // use userInput to pull from the OMDB API
            var queryURL = "http://www.omdbapi.com/?apikey=9f68b70&s&y=&plot=short&t=" + userInput;

                 $.ajax ( {
                     url: queryURL,
                    method: 'GET'
                }).done(function(response) {

                    // Empty the poster div
                    $(".poster").empty();

                     $("#movie-view").text(JSON.stringify(response));
                     console.log(response);

                     // Retrieve url
                     var imgURL = response.Poster;

                    // grab info and place in variables
                    var image = $("<img>").attr("src", imgURL);
                    var title = response.Title;
                    var actors = response.Actors;
                    var imdbRating = response.imdbRating;
                    //  var rtRating = response.Ratings[1].value;
                    //  var mcRating = response.Ratings[3].value;
                    var plot = response.Plot;

                    // add trailer for the Youtube search
                    var trailerSearch = title + "+trailer";
                    console.log(trailerSearch);
                    parameters.q = trailerSearch;
                    getData();


                     // Display the variables
                    $(".poster").html(image);
                    $(".title").text(title);
                    $(".MovieRating").html("<b>Rating:</b> " + imdbRating);
                    $(".actors").html("<b>Actors:</b> " + actors);
                    $(".plot").html("<b>Plot:</b> " + plot);

                    // empty search bard
                    $("form").trigger("reset");

                 });

            });

});
