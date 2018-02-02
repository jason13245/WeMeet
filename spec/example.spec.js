const app = require('../index');
const request = require('supertest');

beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
})

describe("Call API with example",() => {
    it("status 200",()=>{
        request(app)
            .get("/api/v1/example/greeting")
            .expect(200)
            .expect('content-type',/json/)
            .end((err,res)=>{
                if(err) throw err
            });
    });

    it("return object",()=>{
        request(app)
            .get("/api/v1/example/greeting")
            .expect(200, {'message': 'Welcome to WeMeet!'})
            .expect('content-type',/json/)
            .end((err,res)=>{
                if(err) throw err
            });
    });
});

// import io from 'socket.io-client'

// describe('socket io test case',()=>{
//     beforeEach((done)=>{
//         this.socket = new io('http://localhost')
//         this.socket.on('connect',()=>{
//             done();
//         })
//     })

//     it('get name search result',(done)=>{
//         this.socket.on('nameAutocompleteResult',(results)=>{
//             expect(results).toEqual([{

//             }])
//             done()
//         })
//         this.socket.emit('searchByName',{
//             text:'',
//             latitude:100,
//             longitude:100
//         })
//     })

//     it('get id search result',(done)=>{
//         this.socket.on('searchByID',(results)=>{
//             expect(results).toEqual([{

//             }])
//             done()
//         })
//         this.socket.emit('searchByID',{
//             id:''
//         })
//     })

//     it('get location search result',(done)=>{
//         this.socket.on('searchByLocation',(results)=>{
//             expect(results).toEqual([{

//             }])
//             done()
//         })
//         this.socket.emit('searchByLocation',{
//             keyword:'',
//             latitude:100,
//             longitude:100
//         })
//     })
    
// })