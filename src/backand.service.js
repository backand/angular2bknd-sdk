"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var backand = require("vanillabknd-sdk");
var BackandService = (function () {
    function BackandService() {
    }
    BackandService.prototype.init = function (config) {
        var _this = this;
        backand.init(config);
        Object.keys(backand).forEach(function (key) {
            _this[key] = backand[key];
        });
    };
    // auth
    BackandService.prototype.useAnonymousAuth = function (scb) { };
    ;
    BackandService.prototype.signin = function (username, password, scb, ecb) { };
    ;
    BackandService.prototype.signup = function (email, password, confirmPassword, firstName, lastName, parameters, scb, ecb) { };
    ;
    BackandService.prototype.socialSignin = function (provider, scb, ecb) { };
    ;
    BackandService.prototype.socialSigninWithToken = function (provider, token, scb, ecb) { };
    ;
    BackandService.prototype.socialSignup = function (provider, email, scb, ecb) { };
    ;
    BackandService.prototype.requestResetPassword = function (username, scb, ecb) { };
    ;
    BackandService.prototype.resetPassword = function (newPassword, resetToken, scb, ecb) { };
    ;
    BackandService.prototype.changePassword = function (oldPassword, newPassword, scb, ecb) { };
    ;
    BackandService.prototype.signout = function (scb) { };
    ;
    BackandService.prototype.getSocialProviders = function (scb) { };
    ;
    // socket
    BackandService.prototype.on = function (eventName, callback) { };
    ;
    return BackandService;
}());
BackandService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], BackandService);
exports.BackandService = BackandService;
var Response = (function () {
    function Response() {
    }
    return Response;
}());
exports.Response = Response;
//# sourceMappingURL=backand.service.js.map