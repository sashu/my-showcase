eshopApp
		.controller(
				'SelectModelController',
				function($scope, $http, $location, EService) {

					$scope.storage = storage;
					var cartId = $location.search().cartId;
					$scope.inv = $location.search().cartId;

					EService
							.fetchOrder(
									function(data, status) {
										if (data == undefined || data == null
												|| data == "") {
											createAndShowModal(
													"No Data for Payment",
													"You have no items selected in your cart. Place an order from home.",
													function() {
														window.location.href = "/eshop/home";
													});
										}
										$scope.order = data;
										$scope.device = getDevice(cartId,
												data.deviceInfo);
										if ($scope.device.model != null
												|| $scope.device.model != undefined) {
											$scope.inv = 'C';
										}
										$scope.device.quantity = "1";
									}, function(data, status) {
										handleResponse(data, status);
									});

					$scope.addToCart = function() {

					}

					function getDevice(cartId, list) {
						for (var i = 0; i < list.length; i++) {
							var d = list[i];
							if (d.cartId == cartId) {
								return d
							}
						}
					}

					$scope.setModel = function(model) {
						clearErrors($scope);
						$scope.device.model = model;
						$scope.device.storage = "";
					}

					$scope.setColor = function(color) {
						clearErrors($scope);
						$scope.device.color = color;
						getColorDesc(color, $scope);
					}

					$scope.setStorage = function(storage, desc, cost) {
						clearErrors($scope);
						$scope.device.storage = storage;
						$scope.device.storageDesc = desc;
						$scope.device.cost = cost;
					}

					$scope.showModal = function() {
						$scope.errors = validateDevice();
						if ($scope.errors.length == 0) {
							showModal('cnf_modal');
						}
					}

					$scope.saveData = function() {
						jq('.modal-backdrop').remove();
						removeFromArray(
								$scope.order.deviceInfo,
								getDeviceIndex($scope.order.deviceInfo, cartId),
								1);
						$scope.order.deviceInfo.push($scope.device);
						EService.update($scope.order, function(data, status) {
							$location.path('/placeorder/shipping');
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

					function validateDevice() {
						var errors = [];
						if (isBlank($scope.device.model)) {
							errors.push('Choose a model')
						}
						if (isBlank($scope.device.color)) {
							errors.push('Pick a color')
						}
						if (isBlank($scope.device.storage)) {
							errors.push('Pick a device storage')
						}
						if (isBlank($scope.device.quantity)) {
							errors.push('Quantity cannot be Left Blank')
						}
						return errors;
					}

					function clearErrors($scope) {
						$scope.errors = [];
					}

				});

eshopApp
		.controller(
				'PersonalDetailsController',
				function($scope, $http, $location, EService) {

					$scope.cartId = $location.search().cartId;

					EService.state(function(data, status) {
						$scope.state = data;
					}, function(data, status) {
						handleResponse(data, status);
					});

					EService
							.fetchOrder(
									function(data, status) {
										if (data == undefined || data == null
												|| data == "") {
											createAndShowModal(
													"No Data for Payment",
													"You have no items selected in your cart. Place an order from home.",
													function() {
														window.location.href = "/eshop/home";
													});
										}
										$scope.order = data;
										if ($scope.order.personalDetails == null) {
											$scope.order.personalDetails = {};
										}
										$scope.pd = $scope.order.personalDetails;

									}, function(data, status) {
										handleResponse(data, status);
									});

					$scope.sameAddress = function() {
						$scope.pd.shippingAddress = null;
						$scope.pd.shippingAddress = $scope.pd.cmmAddress;
					}

					$scope.loadCity = function() {
						EService.city($scope.pd.state, function(data, status) {
							$scope.city = data;
						}, function(data, status) {
							handleResponse(data, status);
						});
					}

					$scope.saveData = function() {
						$scope.errors = hasErrors($scope.pd);
						if ($scope.errors.length == 0) {
							$scope.order.personalDetails = $scope.pd;
							EService.update($scope.order,
									function(data, status) {
										$location.path('/placeorder/payment');
									}, function(data, status) {
										handleResponse(data, status);
									});
						}
					}

					function hasErrors(pd) {
						var errors = [];
						if (pd.emailId != pd.cnfEmailId) {
							errors.push('Confirm the Email Address');
						}

						if (isBlank(pd.state)) {
							errors.push('Choose State');
						}

						if (isBlank(pd.city) && isBlank(pd.customCity)) {
							errors.push('Choose City or Type in Your City');
						}

						return errors;
					}
				});

eshopApp
		.controller(
				'PaymentController',
				function($scope, $http, $location, EService) {

					addTooltips($);
					$scope.cartId = $location.search().cartId;

					EService
							.fetchOrder(
									function(data, status) {
										$scope.order = data;
										$scope.pd = $scope.order.personalDetails;
										if (data == undefined || data == null
												|| data == "") {
											createAndShowModal(
													"No Data for Payment",
													"You have no items selected in your cart. Place an order from home.",
													function() {
														window.location.href = "/eshop/home";
													});
										} else {
											if (data.payment == null
													|| data.payment == undefined) {
												$scope.order.payment = {};
											}
										}
										$scope.order.payment = data.payment;
									}, function(data, status) {
										handleResponse(data, status);
									});

					$scope.setPayment = function(mode) {
						$scope.order.payment.mode = mode;
						if (mode != 'EMI') {
							$scope.order.payment.tenor = null;
						}
					}

					$scope.updateOrder = function() {
						$scope.errors = hasErrors($scope.order.payment);
						if ($scope.errors.length > 0) {
							return false;
						}
						EService.update($scope.order, function(data, status) {
							$location.path('/placeorder/confirmation');
						}, function(data, status) {
							handleResponse(data, status);
						});
					}

					function hasErrors(obj) {
						var errors = [];
						if (isBlank(obj.mode)) {
							errors.push('Choose a Payment Mode');
						}

						if (!isBlank(obj.mode) && obj.mode == 'EMI'
								&& isBlank(obj.tenor)) {
							errors.push('Select a TENOR of EMI');
						}
						if (obj.terms != 'Y') {
							errors.push('Accept the Terms and Condition');
						}

						return errors;
					}
				});

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

eshopApp
		.controller(
				'ConfirmController',
				function($scope, $http, $location, EService) {
					EService
							.fetchOrder(
									function(data, status) {
										if (data == undefined || data == null
												|| data == "") {
											createAndShowModal(
													"No Data for Payment",
													"You have no items selected in your cart. Place an order from home.",
													function() {
														window.location.href = "/eshop/home";
													});
										} else {
											$scope.order = data;
											$scope.pd = $scope.order.personalDetails;

											extraDetails.amount = $scope.order.payment.total;
											extraDetails.buttonSize = 'large';
											extraDetails.customerId = $scope.pd.mobileNo;
											extraDetails.mobileNumber = $scope.pd.mobileNo;
											extraDetails.emailAddress = $scope.pd.emailId;
											extraDetails.redirectUrl = 'http://www.mytotalrewards.in/eshop/confirm'
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