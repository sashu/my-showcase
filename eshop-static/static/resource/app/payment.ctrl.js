eshopApp
		.controller(
				'PaymentController',
				function($scope, $http, $location, EService) {

					addTooltips($);
					$scope.cartId = $location.search().cartId;
					
					$scope.totalAmt = function() {
						var total = 0;
						for (var i = 0; i < $scope.order.deviceInfo.length; i++) {
							var d = $scope.order.deviceInfo[i];
							total = total + d.quantity * d.cost;
						}

						return total;
					}

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