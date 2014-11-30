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