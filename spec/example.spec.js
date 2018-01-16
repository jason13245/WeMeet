const app = require('../index');
const request = require('supertest');

describe("Call API with example",() => {
    it("status 200",()=>{
        request(app)
            .get("/api/v1/greeting")
            .expect(200)
            .expect('content-type',/json/)
            .end((err,res)=>{
                if(err) throw err
            });
    });

    it("return object",()=>{
        request(app)
            .get("/api/v1/greeting")
            .expect(200, {'message': 'Welcome to WeMeet!'})
            .expect('content-type',/json/)
            .end((err,res)=>{
                if(err) throw err
            });
    });
});