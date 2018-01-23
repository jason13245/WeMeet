const { SearchService } = require('../../services/SearchService');

describe("Search Service", () => {
    beforeEach(() => {
        search = new SearchService()
    })

    it("should search by name", (done) => {
        this.search.yelpAutocomplete({
            text: data.keyword,
            latitude: data.latitude,
            longitude: data.longitude
        }).then((result) => {
            expect(result).toBe({
                url: 'localhost'
            })
            done();
        })
    })
})