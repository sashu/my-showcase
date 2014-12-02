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