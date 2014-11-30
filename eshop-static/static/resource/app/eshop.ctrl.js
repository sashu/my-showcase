eshopApp
		.controller(
				'OrderController',
				function($scope, $http, $location, EService) {
					$scope.summaryTemplate = '/eshop-static/static/templates/summary-modal.html';
					$scope.placeOrder = function() {
						window.location.href = "order#/placeorder/model";
					}
				});

eshopApp.controller('SummaryController', function($rootScope, $scope, $http,
		$location, EService) {
	$rootScope.orderSummary = {};
	EService.fetchOrder(function(data, status) {
		$rootScope.orderSummary = data;
	}, function(data, status) {
		handleResponse(data, status);
	});

	$scope.modify = function(cartId) {
		hideModal('order_summary');
		window.location.href = "order#/placeorder/model?cartId=" + cartId;
	}

	$scope.shipCart = function() {
		hideModal('order_summary');
		window.location.href = "order#/placeorder/shipping";
	}

	$scope.remove = function(cartId) {
		EService.removeDevice(cartId, function(data, status) {
			removeFromArray($scope.orderSummary.deviceInfo, getDeviceIndex(
					$scope.orderSummary.deviceInfo, cartId), 1);
			if ($scope.orderSummary.deviceInfo.length == 0) {
				goTo('home');
			} else {
				window.location.href = "order#/placeorder/model";
			}
		}, function(data, status) {
			handleResponse(data, status);
		});
	}

	function getDeviceIndex(list, cartId) {
		for (var i = 0; i < list.length; i++) {
			var d = list[i];
			if (d.cartId == cartId) {
				return i
			}
		}
	}
});

eshopApp
		.controller(
				'CartController',
				function($scope, $rootScope, $http, $location, EService) {
					$scope.summaryTemplate = '/eshop-static/static/templates/summary-modal.html';
					EService.fetchOrder(function(data, status) {
						$scope.cart = data;
						if (data == null || data == "" || data == undefined) {
							$scope.cart = {};
							$scope.cart.deviceInfo = [];
						}
					}, function(data, status) {
						handleResponse(data, status);
					});

					$scope.viewCart = function() {
						if ($scope.cart.deviceInfo.length == 0) {
							createAndShowModal(
									"Cart is Empty !!",
									"You do not have anything in your cart right now.",
									null);
						} else {
							showModal('order_summary');
						}
					};
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