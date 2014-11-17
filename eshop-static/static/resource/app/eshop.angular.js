var eshopApp = angular.module("EShop", [ 'ngRoute', 'ngAnimate', ]).animation(
		'.animate-sctn', function() {
			return {
				enter : function(element, done) {
					element.css('display', 'none');
					element.fadeIn(1000, done);
					return function() {
						element.stop();
					};
				},
				leave : function(element, done) {
					element.fadeOut(0, done);
					return function() {
						element.stop();
					};
				}
			};
		});

eshopApp.filter('model', function() {
	return function(data) {
		if (data == 'iph') {
			return "iPhone 6";
		} else {
			return "iPhone 6 Plus";
		}
	};
});

eshopApp.filter('color', function() {
	return function(data) {
		if (data == '1') {
			return color.SILVER.desc;
		}
		if (data == '2') {
			return color.GOLD.desc;
		}
		if (data == '3') {
			return color.SPACE_GRAY.desc;
		}
	};
});

eshopApp.filter('mode', function() {
	return function(data) {
		if (data == 'DEL') {
			return " Delivery: N 0";
		}
		if (data == 'EMI') {
			return "Flexible Monthly Payments through Diamond Bank";
		}
		if (data == 'SAVE') {
			return "Save Order";
		}
	};
});

eshopApp.filter('tenor', function() {
	return function(data) {
		if (data == '3M') {
			return "3 Months TENOR";
		}
		if (data == '6M') {
			return "6 Months TENOR";
		}
		if (data == '11M') {
			return "11 Months TENOR";
		}
	};
});

function rgtRouteConfig($routeProvider) {
	$routeProvider.when('/placeorder/model', {
		controller : 'SelectModelController',
		controllerAs : 'smc',
		templateUrl : '/eshop-static/static/templates/select-model.html'
	}).when('/placeorder/shipping', {
		controller : 'PersonalDetailsController',
		controllerAs : 'pdc',
		templateUrl : '/eshop-static/static/templates/personal-detail.html'
	}).when('/placeorder/payment', {
		controller : 'PaymentController',
		controllerAs : 'pc',
		templateUrl : '/eshop-static/static/templates/payment.html'
	}).when('/placeorder/confirmation', {
		controller : 'ConfirmController',
		controllerAs : 'cc',
		templateUrl : '/eshop-static/static/templates/confirmation.html'
	}).when('/terms', {
		templateUrl : '/eshop-static/static/templates/terms.html'
	});
};

eshopApp.config(rgtRouteConfig);

eshopApp.factory('EService', function($http) {
	return {
		state : function(successCallback, errorCallback) {
			$http({
				url : '/eshop/state',
				method : 'GET',
			}).success(successCallback).error(errorCallback);
		},
		city : function(state, successCallback, errorCallback) {
			$http({
				url : '/eshop/city',
				method : 'POST',
				data : state
			}).success(successCallback).error(errorCallback);
		},
		update : function(order, successCallback, errorCallback) {
			$http({
				url : '/eshop/updateorder',
				method : 'POST',
				data : order
			}).success(successCallback).error(errorCallback);
		},
		fetchOrder : function(successCallback, errorCallback) {
			$http({
				url : '/eshop/fetchorder',
				method : 'GET',
			}).success(successCallback).error(errorCallback);
		},
		placeOrder : function(successCallback, errorCallback) {
			$http({
				url : '/eshop/placeorder',
				method : 'POST',
			}).success(successCallback).error(errorCallback);
		},
		transresult : function(successCallback, errorCallback) {
			$http({
				url : '/eshop/transresult',
				method : 'GET',
			}).success(successCallback).error(errorCallback);
		},
		clearOrder : function(successCallback, errorCallback) {
			$http({
				url : '/eshop/clearOrder',
				method : 'GET',
			}).success(successCallback).error(errorCallback);
		}
	};
});