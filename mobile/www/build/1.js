webpackJsonp([1],{

/***/ 847:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchResultPageModule", function() { return SearchResultPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__search_result__ = __webpack_require__(850);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SearchResultPageModule = (function () {
    function SearchResultPageModule() {
    }
    SearchResultPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__search_result__["a" /* SearchResultPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__search_result__["a" /* SearchResultPage */]),
            ],
        })
    ], SearchResultPageModule);
    return SearchResultPageModule;
}());

//# sourceMappingURL=search-result.module.js.map

/***/ }),

/***/ 850:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchResultPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_places_places__ = __webpack_require__(160);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the SearchResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SearchResultPage = (function () {
    function SearchResultPage(navCtrl, navParams, placeService, viewCrtl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.placeService = placeService;
        this.viewCrtl = viewCrtl;
        this.result = {};
        this.loaded = false;
        this.photos = [];
    }
    SearchResultPage.prototype.ionViewDidLoad = function () {
        //console.log('ionViewDidLoad SearchResultPage');
        var _this = this;
        this.placeService.getIdResult().subscribe(function (data) {
            _this.photos = data.photos;
            _this.result = data;
        });
    };
    SearchResultPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.placeService.getIdResult().subscribe(function (data) {
            _this.loaded = true;
            _this.photos = data.photos;
            _this.result = data;
        });
    };
    SearchResultPage.prototype.confirm = function () {
        this.viewCrtl.dismiss();
        this.placeService.createPlace({ placeName: this.result.name, yelpId: this.result.id });
    };
    SearchResultPage.prototype.back = function () {
        this.viewCrtl.dismiss();
    };
    SearchResultPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-search-result',template:/*ion-inline-start:"/Users/alan/WeMeet/mobile/src/pages/search-result/search-result.html"*/'<!--\n  Generated template for the SearchResultPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-toolbar>\n    <ion-title>\n      Detail\n    </ion-title>\n    <ion-buttons start>\n      <button ion-button icon-only (click)="back()">\n        back\n      </button>\n    </ion-buttons>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="confirm()">\n        confirm\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n\n<ion-content padding>\n  <ion-card *ngIf="loaded;else loading">\n    <ion-slides>\n      <ion-slide>\n        <img src="{{result.image_url}}" />\n      </ion-slide>\n      <ion-slide *ngFor=\'let photo of photos\'>\n        <img src="{{photo}}" />\n      </ion-slide>\n    </ion-slides>\n    <ion-card-content>\n      <ion-card-title>\n        {{result.name}}\n      </ion-card-title>\n      <p>\n        <img src="assets/imgs/{{result.rating}}.png" />\n        <br> Tel:{{result.phone}}\n      </p>\n    </ion-card-content>\n  </ion-card>\n  <ng-template #loading>\n    <ion-card-content>\n      <p>loading...</p>\n    </ion-card-content>\n  </ng-template>\n</ion-content>'/*ion-inline-end:"/Users/alan/WeMeet/mobile/src/pages/search-result/search-result.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__providers_places_places__["a" /* PlacesProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_places_places__["a" /* PlacesProvider */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ViewController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ViewController */]) === "function" && _d || Object])
    ], SearchResultPage);
    return SearchResultPage;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=search-result.js.map

/***/ })

});
//# sourceMappingURL=1.js.map