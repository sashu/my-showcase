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