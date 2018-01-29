webpackJsonp([1],{

/***/ 844:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateDatePageModule", function() { return CreateDatePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__create_date__ = __webpack_require__(848);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CreateDatePageModule = (function () {
    function CreateDatePageModule() {
    }
    CreateDatePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__create_date__["a" /* CreateDatePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__create_date__["a" /* CreateDatePage */]),
            ],
        })
    ], CreateDatePageModule);
    return CreateDatePageModule;
}());

//# sourceMappingURL=create-date.module.js.map

/***/ }),

/***/ 848:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateDatePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_date_date__ = __webpack_require__(161);
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
 * Generated class for the CreateDatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CreateDatePage = (function () {
    function CreateDatePage(navCtrl, navParams, viewCtrl, dateService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.dateService = dateService;
        this.date = {
            day: "",
            time: ""
        };
    }
    CreateDatePage.prototype.ionViewDidLoad = function () {
        //console.log('ionViewDidLoad CreateDatePage');
    };
    CreateDatePage.prototype.dismissCreateDateModal = function () {
        this.viewCtrl.dismiss();
    };
    CreateDatePage.prototype.confirm = function () {
        this.viewCtrl.dismiss();
        console.log(this.date);
        console.log(__WEBPACK_IMPORTED_MODULE_2_moment__["utc"](this.date.day + this.date.time, "YYYY-MM-DDHH:mm").valueOf() / 1000);
        var date = __WEBPACK_IMPORTED_MODULE_2_moment__["utc"](this.date.day + this.date.time, "YYYY-MM-DDHH:mm").valueOf() / 1000;
        this.dateService.createDate(date);
    };
    CreateDatePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-create-date',template:/*ion-inline-start:"/Users/alan/WeMeet/mobile/src/pages/create-date/create-date.html"*/'<!--\n  Generated template for the CreateDatePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-toolbar>\n    <ion-title>Selected Date</ion-title>\n    <ion-buttons start>\n      <button ion-button icon-only (click)="dismissCreateDateModal()">\n        <span ion-text color="primary" showWhen="ios">Cancel</span>\n        <ion-icon name="md-close" showWhen="android, windows"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-buttons end>\n        <button ion-button icon-only (click)="confirm()">\n          <span ion-text color="primary" showWhen="ios">Confirm</span>\n          <ion-icon name="md-close" showWhen="android, windows"></ion-icon>\n        </button>\n      </ion-buttons>\n  </ion-toolbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <ion-item>\n    <ion-label>Date</ion-label>\n    <ion-datetime displayFormat="DD/MM/YYYY" pickerFormat="YYYY MMMM DD" min="2018" max="2099-12-13" [(ngModel)]="date.day"></ion-datetime>\n  </ion-item>\n  <ion-item>\n    <ion-label>Time</ion-label>\n    <ion-datetime displayFormat="h:mm A" pickerFormat="h mm A"[(ngModel)]="date.time"></ion-datetime>\n  </ion-item>\n</ion-content>'/*ion-inline-end:"/Users/alan/WeMeet/mobile/src/pages/create-date/create-date.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ViewController */], __WEBPACK_IMPORTED_MODULE_3__providers_date_date__["a" /* DateProvider */]])
    ], CreateDatePage);
    return CreateDatePage;
}());

//# sourceMappingURL=create-date.js.map

/***/ })

});
//# sourceMappingURL=1.js.map