var express = require('express');
var app = express();

var request = require('request');
var bodyParser = require('body-parser');
var google = require('googleapis');
var googleStuff = require('./public/js/googleData');


// google places API key
//const key = 'AIzaSyCditWW_QbHS5b178NVjooCD4Fh3QocDBY'; // bt


const key = 'AIzaSyBeVcb5qQbkrqEZVBFcFK31FSnuK7qt_DM'; // bt
//const key = 'AIzaSyB_yfGwMryurHa2DyxgAlsoQWwQmm90GZA'



app.use(express.static('./public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.get('/', function (req, res) {
    res.sendFile('./public/html/index.html', {
        root: './'
    });
});

var searchPlaceOrig = null;
var searchWhatOrig = null;

// current search input
//var query = 'Denver, CO, United States'

// google places api request
app.post('/search', function (req, res) {

    searchPlaceOrig = req.body.searchPlace;
    searchWhatOrig = req.body.searchWhat;

    var query2 = req.body.searchWhat + ' ' + req.body.searchPlace;
    request({
            url: `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query2}&rankby=prominence&key=${key}`
        },
        function (error, response, reqQuery) {
            if (error || (response.statusCode !== 200) || response.status === 'OVER_QUERY_LIMIT') {
                console.log('error: ', error)
                console.log('status code: ', response.statusCode)
                res.send('oops...');
            } else {

                var reqQueryAsObj = JSON.parse(reqQuery);
                var placeID = reqQueryAsObj.results[0].place_id;

                // place details request
                request({
                    url: `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeID}&key=${key}`
                }, function (error, response, req) {
                    if (error || (response.statusCode !== 200)) {
                        console.log('error: ', error)
                        console.log('status code: ', response.statusCode)
                        res.send('oops...')
                    } else {
                        //   var reqAsObj = JSON.parse(req);
                        //   let length = reqQueryAsObj.results.length;
                        let top20 = [];
                        //         console.log(reqQueryAsObj.results, 'results obj');
                        var workArr = Array.from(reqQueryAsObj.results);

                        workArr.forEach(function (element) {
                            console.log(element)
                            var googleLoc = googleStuff.processGoogleData(element);

                            top20.push(googleLoc);

                        });

                        res.send(top20);

                    }
                });
            }
        });

}); // end of google places api get request




/* -=-=-=-=-=-=- 404 catch -=-=-=-=-=-=- */
app.use(function (request, response) {
    response.send(`hmm. that's a 404, yo!`)
})

/* -=-=-=-=-=-=- app listen -=-=-=-=-=-=- */
app.listen(8080, function () {
    console.log('app running on port 8080')
})
