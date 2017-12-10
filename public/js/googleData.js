console.info('Googler - Starting');
console.log('=-=-=-=-=-=-=-=-=-=-=')

var exports = module.exports = {};

class GooglePlace {

    constructor(name, rating, placeID, location, googleAddress, googleIcon, googleReviews, googlePrice) {
        this.name = name;
        this.rating = rating;
        this.placeID = placeID;
        this.location = location;
        this.googleAddress = googleAddress;
        this.googleIcon = googleIcon;
        this.googleReviews = googleReviews;
        this.googlePrice = googlePrice;
    }
}

exports.processGoogleData = function (googlePlace) {
    var googleLoc = new GooglePlace(googlePlace.name, googlePlace.rating, googlePlace.id, googlePlace.geometry.location, googlePlace.formatted_address, googlePlace.icon, googlePlace.reviews, googlePlace.price_level);
    return googleLoc;
};
