const { SearchService } = require('../../services');
const search = new SearchService()

describe("Search Service", () => {

    it("should return Yelp search data", (done) => {
        search.yelpSearch({
            keyword: "delis",
            latitude: 37.786882,
            longitude: -122.399972,
        }).then((result) => {
            expect(result.url).toBeDefined();
            expect(result.id).toBeDefined();
            expect(result.name).toBeDefined();
            expect(result.image).toBeDefined();
            expect(result.phone).toBeDefined();
            expect(result.location).toBeDefined();
            expect(result.price).toBeDefined();
            expect(result.rating).toBeDefined();
            expect(result.region).toBeDefined();
            done();
        })
    })

    it("should return Yelp ID search", (done) => {
        search.yelpIDSearch({
            id: "north-india-restaurant-san-francisco"
        }).then((result) => {
            expect(result.id).toBeDefined();
            expect(result.name).toBeDefined();
            expect(result.image_url).toBeDefined();
            expect(result.url).toBeDefined();
            expect(result.price).toBeDefined();
            expect(result.rating).toBeDefined();
            expect(result.phone).toBeDefined();
            expect(result.photos).toBeDefined();
            expect(result.hours).toBeDefined();
            expect(result.categories_alias).toBeDefined();
            expect(result.categories_title).toBeDefined();
            expect(result.coordinates).toBeDefined();
            expect(result.location).toBeDefined();
            done();
        })
    })

    it("should return Yelp autocomplete", (done) => {
        search.yelpAutocomplete({
            keyword: "del",
            latitude: 37.786942,
            longitude: -122.399643
        }).then((result) => {
            expect(result).toEqual({
                terms: [
                    {
                        "text": "Delivery"
                    },
                    {
                        "text": "Delivery Food"
                    },
                    {
                        "text": "Pizza Delivery"
                    }
                ],
                businesses: [],
                categories: [
                    {
                        "alias": "delis",
                        "title": "Delis"
                    },
                    {
                        "alias": "fooddeliveryservices",
                        "title": "Food Delivery Services"
                    },
                    {
                        "alias": "couriers",
                        "title": "Couriers & Delivery Services"
                    }
                ]
            })
            done();
        }).catch(err => console.log(err));
    })

    xit("should return Google map search", (done) => {
        search.googleMapSearch({
            key: "AIzaSyA5mr3gKLjEOBqp1I0-WPquTiBwhj6JW2U",
            location: "-33.8670522,151.1957362",
            keyword: "cruise",
            radius: 500,
            type: "restaurant"
        }).then((result) => {
            expect(result.location).toBeDefined();
            expect(result.id).toBeDefined();
            expect(result.name).toBeDefined();
            expect(result.opening_hours).toBeDefined();
            expect(result.photos).toBeDefined();
            expect(result.place_id).toBeDefined();
            expect(result.types).toBeDefined();
            expect(result.vicinity).toBeDefined();
            done();
        })
    })

    it("should return google map autocomplete", (done) => {
        search.googleMapAutocomplete({
            key: "AIzaSyA5mr3gKLjEOBqp1I0-WPquTiBwhj6JW2U",
            input: "pizza+near%20par"
        }).then((result) => {
            expect(result.description).toBeDefined();
            expect(result.matched_substrings).toBeDefined();
            expect(result.terms).toBeDefined();
            done();
        })
    })

})