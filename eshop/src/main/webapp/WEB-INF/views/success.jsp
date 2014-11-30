<%@ include file="/WEB-INF/include/include.jsp"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Airtel</title>
<%@ include file="/WEB-INF/include/static-content.jsp"%>
<script type="text/javascript">
	function breakout_of_frame() {
		if (top.location != location) {
			top.location.href = document.location.href + '?GET=T';
		}
	}

	$(document).ready(function() {
		$('#main_body').hide();
		breakout_of_frame();
	});
</script>
</head>
<body ng-app="EShop" ng-controller="TransResultController">
	<header>
		<%@ include file="/WEB-INF/include/header.si.jsp"%>
	</header>
	<div class="container-fluid">
		<div class="pull-left">
			<img src="/eshop-static/static/resource/images/AlwaysOnLogo.png"
				class="hidden-sm hidden-xs always-on">
		</div>
	</div>
	<center>
		<img src="/eshop-static/static/resource/images/dots.gif"
			ng-hide="order.deviceInfo.length > 0">
	</center>
	<div class="container" id="main_body">
		<div class=" mb-25">
			<div class="pull-right">
				<button class="btn btn-sm btn-primary hidden-print mr-5 pr-5"
					onclick="window.location.href='home'">New Order</button>
				<button class="ml-5 btn btn-sm btn-success hidden-print"
					onclick="window.print()">
					<span class="glyphicon glyphicon-print mr-5"></span>Print
				</button>
			</div>
		</div>
		<div class="row animate-sctn">
			<div class="col-md-12 mt-25">
				<div class="alert alert-success txt-lg" ng-if="order.respCode=='00'">Congratulations!!</div>
				<div class="alert alert-danger txt-lg" ng-if="order.respCode!='00'">Transaction
					Failed !!</div>
				<div class="txt-lg light green-txt" ng-if="order.respCode=='00'">
					Your payment is successfull. Your Order Number is : <span
						class="brand-txt bold">{{order.orderNo}}</span>. Please keep this
					Order Number for future reference and order tracking.
				</div>
				<div class="txt-lg light brand-txt" ng-if="order.respCode!='00'">
					Your transaction could not be completed at this time.However Your
					Order Number (<span class="green-txt bold">{{order.orderNo}}</span>)
					is saved for future. Continue your transaction using this order
					number and your email id(<span class="green-txt txt-sm bold">{{pd.emailId}}</span>)
				</div>
				<br>
				<div class="txt-lg mt-25" style="padding-left: 0px;">Payment
					Summary ({{order.payment.mode|mode}} :
					{{order.payment.tenor|tenor}})</div>
				<hr>
				<table class="table table-condensed hidden-xs hidden-sm">
					<thead class="light brand-txt">
						<th class="txt-md">Amount Paid</th>
						<th class="txt-md">Description</th>
						<th class="txt-md">Order Number</th>
						<th class="txt-md">Cost</th>
					</thead>
					<tbody>
					<tbody>
						<tr>
							<td class="txt-sm"><span class="light">N
									{{order.amount}}</span></td>
							<td class="txt-sm"><span class="light">{{order.respDesc}}</span></td>
							<td class="txt-sm"><span class="light">{{order.orderNo}}</span></td>
							<td class="txt-sm"><span class="light">N
									{{order.total / 1000}}</span></td>
						</tr>
					</tbody>
				</table>


				<fieldset>
					<ul class="list-group visible-xs visible-sm mt-25"
						ng-repeat="device in order.deviceInfo">
						<li class="list-group-item"><span
							class="col-xs-6 txt-sm brand-txt">Amount Paid </span> <span
							class="col-xs-6 txt-sm">N {{order.amount}}</span></li>
						<li class="list-group-item"><span
							class="col-xs-6 txt-sm brand-txt">Description </span> <span
							class="col-xs-6 txt-sm">{{order.respDesc}}</span></li>
						<li class="list-group-item"><span
							class="col-xs-6 txt-sm brand-txt">Order Number </span> <span
							class="col-xs-6 txt-sm">{{order.orderNo}}</span></li>
						<li class="list-group-item"><span
							class="col-xs-6 txt-sm brand-txt">Cost </span> <span
							class="col-xs-6 txt-sm">N {{order.total / 1000}}</span></li>
					</ul>
				</fieldset>

				<div class="txt-lg" style="padding-left: 0px;">Order Summary</div>
				<hr>
				<table class="table table-condensed hidden-xs hidden-sm">
					<thead class="light brand-txt">
						<th class="txt-md">Product</th>
						<th class="txt-md">Color</th>
						<th class="txt-md">Storage</th>
						<th class="txt-md">Price</th>
					</thead>
					<tbody>
					<tbody>
						<tr ng-repeat="device in order.deviceInfo">
							<td class="txt-sm"><span class="light">{{device.model
									| model}}</span></td>
							<td class="txt-sm"><span class="light">{{device.color
									| color}}</span></td>
							<td class="txt-sm"><span class="light">{{device.storageDesc}}</span></td>
							<td class="txt-sm"><span class="bold">N {{device.cost
									/ 1000}}</span></td>
						</tr>
					</tbody>
				</table>

				<fieldset>
					<ul class="list-group visible-xs visible-sm mt-25"
						ng-repeat="device in order.deviceInfo">
						<li class="list-group-item"><span class="txt-md bold">{{device.model
								| model}} {{device.storageDesc}} ({{device.color | color}})</span></li>
						<li class="list-group-item"><span
							class="col-xs-6 txt-sm brand-txt">Product </span> <span
							class="col-xs-6 txt-sm">{{device.model | model}} </span></li>
						<li class="list-group-item"><span
							class="col-xs-6 txt-sm brand-txt">Color </span> <span
							class="col-xs-6 txt-sm">{{device.color | color}}</span></li>
						<li class="list-group-item"><span
							class="col-xs-6 txt-sm brand-txt">Storage </span> <span
							class="col-xs-6 txt-sm">{{device.storageDesc}} </span></li>
						<li class="list-group-item"><span
							class="col-xs-6 txt-sm brand-txt">Price </span> <span
							class="col-xs-6 txt-sm">3500</span></li>
					</ul>
				</fieldset>


				<fieldset class="mb-25">
					<div class="txt-lg" style="padding-left: 0px;">Shipping
						Address</div>
					<hr>
					<div class="alert alert-info">
						<div class="txt-lg ">{{pd.name}}</div>
						<div class="txt-md ">{{pd.shippingAddress}}</div>
						<div class="txt-xs ">{{pd.city}}{{pd.customCity}}</div>
						<div class="txt-xs ">{{pd.state}}</div>
						<div class="txt-sm ">
							<span class="glyphicon glyphicon-earphone mr-5"></span>{{pd.mobileNo}}
						</div>
						<div class="txt-sm ">
							<span class="glyphicon glyphicon-envelope mr-5"></span>{{pd.emailId}}
						</div>
					</div>
				</fieldset>
			</div>
		</div>
	</div>

	<div class="modal fade" id="gn_modal">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true" id="gn_upper_close">&times;</button>
					<h4 class="modal-title" id="gn_modal_title"></h4>
				</div>
				<div class="modal-body" id="gn_modal_body">
					<div class="alert"></div>
				</div>
				<div class="modal-footer">
					<button type="button" id="gn_close"
						class="btn btn-default payment_options selected "
						style="margin: 3px;" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>

	<div class="modal fade" id="cnf_modal">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true" id="cnf_upper_close">&times;</button>
					<h4 class="modal-title" id="cnf_modal_title"></h4>
				</div>
				<div class="modal-body" id="cnf_modal_body">
					<div class="alert"></div>
				</div>
				<div class="modal-footer">
					<button type="button" id="cnf_okay" class="btn btn-primary"
						data-dismiss="modal">OK</button>
					<button type="button" id="cnf_close" class="btn btn-danger"
						data-dismiss="modal">Cancel</button>
				</div>
			</div>
		</div>
	</div>

	<div class="modal fade" id="gn_modal">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true" id="gn_upper_close">&times;</button>
					<h4 class="modal-title" id="gn_modal_title"></h4>
				</div>
				<div class="modal-body" id="gn_modal_body">
					<div class="alert"></div>
				</div>
				<div class="modal-footer">
					<button type="button" id="gn_close" class="btn btn-default"
						data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>

	<footer class="hidden-print">
		<%@ include file="/WEB-INF/include/footer.jsp"%>
	</footer>
</body>
</html>