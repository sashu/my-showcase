eshopApp
		.controller(
				'SelectModelController',
				function($rootScope, $scope, $http, $location, EService) {

					$scope.editMode = 'F';
					$scope.storage = storage;
					var cartId = $location.search().cartId;
					$scope.inv = $location.search().cartId;

					$scope.quantityList = getQuantityList();

					function getQuantityList() {
						var tempArr = [];
						for (i = 1; i <= 100; i++) {
							tempArr.push(i);
						}
						return tempArr;
					}

					if (cartId != null || cartId != undefined) {
						$scope.editMode = 'T';
						EService
								.fetchOrder(
										function(data, status) {
											if (data == undefined
													|| data == null
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
										}, function(data, status) {
											handleResponse(data, status);
										});
					} else {
						$scope.device = {};
						$scope.order = {};
						EService.fetchOrder(function(data, status) {
							$scope.order = data;
						}, function(data, status) {
							handleResponse(data, status);
						});
					}

					$scope.addToCart = function() {
						$scope.errors = validateDevice();
						if ($scope.errors.length == 0) {
							EService.placeOrder($scope.device, function(data,
									status) {
								window.location.reload();
							}, function(data, status) {
								handleResponse(data, status);
							});
						}
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
						$scope.errors = validateDevice();
						if ($scope.errors.length == 0) {
							removeFromArray($scope.order.deviceInfo,
									getDeviceIndex($scope.order.deviceInfo,
											cartId), 1);
							$scope.order.deviceInfo.push($scope.device);
							EService.update($scope.order,
									function(data, status) {
										showModal('order_summary');
										$rootScope.orderSummary = $scope.order;
									}, function(data, status) {
										handleResponse(data, status);
									});
						}
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