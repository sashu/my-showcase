
<%@ include file="/WEB-INF/include/include.jsp"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html lang="en" ng-app="EShop">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Airtel</title>
<%@ include file="/WEB-INF/include/static-content.jsp"%>
</head>
<body ng-controller="OrderController">
	<header>
		<%@ include file="/WEB-INF/include/header.si.jsp"%>
	</header>

	<div class="container-fluid">
		<div class="pull-left">
			<img src="/eshop-static/static/resource/images/AlwaysOnLogo.png"
				class="hidden-sm hidden-xs always-on">
		</div>
		<div>
			<center>
				<div>
					<img src="/eshop-static/static/resource/images/new_iphone_logo.png"
						class="delivery img-responsive">
				</div>
				<div>
					<button ng-click="placeOrder()"
						class="transition-btn btn btn-default btn-lg">PRE ORDER</button>
				</div>
				<div class="col-md-12 mt-25">
					<img class="img-responsive"
						src="/eshop-static/static/resource/images/iphone_down.png">
				</div>
				<div class="container mt-25">
					<div class="mt-25">
						<h2>Benefits of Pre-ordering with us:</h2>
					</div>
					<div class="col-md-12">
						<div class="col-md-1"></div>
						<div class="col-md-2 mt-20">
							<img src="/eshop-static/static/resource/images/flexi.png"
								class="img-responsive img-benefit"> <span
								class="benefit-icons-txt">Flexible Monthly Payments
								through Diamond Bank</span>
						</div>
						<div class="col-md-2 mt-20">
							<img src="/eshop-static/static/resource/images/warranty.png"
								class="img-responsive img-benefit"> <span
								class="benefit-icons-txt">Official product with
								manufacturer's warranty</span>
						</div>
						<div class="col-md-2 mt-20">
							<img src="/eshop-static/static/resource/images/genuine.png"
								class="img-responsive img-benefit"> <span
								class="benefit-icons-txt">Amazing data offers</span>
						</div>
						<div class="col-md-2 mt-20">
							<img src="/eshop-static/static/resource/images/peace.png"
								class="img-responsive img-benefit"> <span
								class="benefit-icons-txt">Peace of mind</span>
						</div>
						<div class="col-md-2 mt-20">
							<img src="/eshop-static/static/resource/images/delivery.png"
								class="img-responsive img-benefit"> <span
								class="benefit-icons-txt">Free Delivery</span>
						</div>
						<div class="col-md-1"></div>
					</div>
					<div class="col-md-12 mt-50">
						<img class="img-responsive img-logo-phone"
							src="/eshop-static/static/resource/images/iphone_logo.jpg">
					</div>
					<div class="col-md-12 mt-25">
						<div class="col-md-12">
							<img class="img-responsive"
								src="/eshop-static/static/resource/images/phones.png">
						</div>
						<div class="col-md-12 mt-25 para">
							<p>iPhone 6 is not simply bigger - its better in every
								way.Larger yet dramatically thinner. More powerful, but
								remarkable power efficient. With a smooth metal surface that
								seamlessly meets our most advanced Multi-Touch display. Its a
								new generation of iphone that's better by any measure.</p>
						</div>
					</div>
				</div>
			</center>
		</div>
	</div>
	<div class="container-fluid pl-0 pr-0 an-design">
		<div class="container">
			<h1 class="light">All-new Design</h1>
			<h3 class="light">A seamless, continuous aluminium and glass
				design means that while its bigger, iPhone 6 feels just right.</h3>
			<img class="img-responsive"
				src="/eshop-static/static/resource/images/all-design.jpg">
		</div>
	</div>

	<div class="container-fluid pl-0 pr-0 retina-design">
		<div class="container">
			<div class="row">
				<div class="col-md-6 col-xs-12">
					<h1 class="light">Retina HD displays</h1>
					<h3 class="light">Even at 5.5 inches and 4.7 inches,they are
						the thinnest,most advanced multi-touch displays ever made for
						iphone.</h3>
				</div>
				<div class="col-md-2"></div>
				<div class="col-md-4 col-xs-12">
					<img class="img-responsive"
						src="/eshop-static/static/resource/images/retina.png">
				</div>
			</div>
		</div>
	</div>
	<div class="container-fluid pl-0 pr-0 an-design">
		<div class="container mt-25">
			<div class="row">
				<div class="col-md-6 hidden-xs hidden-sm">
					<img class="img-responsive"
						src="/eshop-static/static/resource/images/processor.png">
				</div>
				<div class="col-md-6 col-xs-12">
					<h1 class="light">A8 chip with 64-bit architecture</h1>
					<h3 class="light">The A8 chip is not only faster than A7 chip,
						its upto 50 percent more energy efficient too.</h3>
				</div>
				<div class="col-xs-12 visible-xs visible-sm">
					<img class="img-responsive"
						src="/eshop-static/static/resource/images/processor.png">
				</div>
			</div>
		</div>
	</div>
	<div class="container">
		<div class=" visible-md visible-lg visible-sm visible-xs mt-25">
			<%@ include file="/WEB-INF/views/sections/comparision-pc.jsp"%>
		</div>
	</div>
	<div ng-include="summaryTemplate"></div>
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
	<footer>
		<%@ include file="/WEB-INF/include/footer.jsp"%>
	</footer>
</body>
</html>