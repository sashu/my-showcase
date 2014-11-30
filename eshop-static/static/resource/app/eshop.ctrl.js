
eshopApp.controller('OrderController', function($scope, $http, $location,
		EService) {
	$scope.placeOrder = function() {
		EService.placeOrder(function(data, status) {
			var cartId = data;
			window.location.href = "order#/placeorder/model?cartId=" + cartId;

		}, function(data, status) {
			handleResponse(data, status);
		});
	}
});

eshopApp.controller('CartController', function($scope, $http, $location,
		EService) {
	EService.fetchOrder(function(data, status) {
		$scope.cart = data;
		if (data == null || data == "" || data == undefined) {
			$scope.cart = {};
			$scope.cart.deviceInfo = [];
		}
	}, function(data, status) {
		handleResponse(data, status);
	});
});



eshopApp.controller('TransResultController', function($scope, $http, $location,
		EService) {
	$scope.showLoading = 'Y';
	EService.transresult(function(data, status) {
		$scope.showLoading = 'N';
		$scope.order = data;
		if ($scope.order.amount == null) {
			$scope.order.amount = 0;
		}
		$scope.pd = data.personalDetails;
		$('#main_body').show();

	}, function(data, status) {
		handleResponse(data, status);
	});
});

function getColorDesc(code, $scope) {
	var model = {};
	if (code == '1') {
		model = color.SILVER;
	}
	if (code == '2') {
		model = color.GOLD;
	}
	if (code == '3') {
		model = color.SPACE_GRAY;
	}
	$scope.device.modelImage = model.image;
	$scope.device.colorDesc = model.desc;
}