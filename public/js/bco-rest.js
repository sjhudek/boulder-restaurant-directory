console.info('Googler - Starting');
console.log('=-=-=-=-=-=-=-=-=-=-=')

var exports = module.exports = {};

class GooglePlace {

    constructor(name, rating, placeID, location, googleAddress, googleIcon, googleReviews, yelpReviews) {
        this.name = name;
        this.rating = rating;
        this.placeID = placeID;
        this.location = location;
        this.googleAddress = googleAddress;
        this.googleIcon = googleIcon;
        this.googleReviews = googleReviews;
        this.yelpReviews = yelpReviews;
    }
}

exports.processGoogleData = function (googlePlace) {
    var googleLoc = new GooglePlace(googlePlace.name, googlePlace.rating, googlePlace.id, googlePlace.geometry.location, googlePlace.formatted_address, googlePlace.icon, googlePlace.reviews);
    return googleLoc;
};