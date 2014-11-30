<%@ include file="/WEB-INF/include/include.jsp"%>
<%@ page session="true"%>
<nav class="navbar navbar-default brand-navigation" role="navigation"
	ng-controller="CartController">
	<div class="container">
		<div class="navbar-header">
			<button class="navbar-toggle collapsed" type="button"
				data-toggle="collapse" data-target=".bs-navbar-collapse">
				<span class="sr-only">Toggle navigation</span> <span
					class="icon-bar"></span> <span class="icon-bar"></span> <span
					class="icon-bar"></span>
			</button>
			<img alt="" src="/eshop-static/static/resource/images/logo.png"
				class="img-responsive logo" style="cursor: pointer;"
				onclick="window.location.href='home'"">
		</div>
		<nav class="navbar-collapse bs-navbar-collapse collapse"
			role="navigation" style="height: 1px;">
			<ul class="nav navbar-nav navbar-right">
				<li><a href="javascript:void(0)"><span
						class="glyphicon glyphicon-indent-left pr-5"></span>Track Your
						Order</a></li>
				<li class="font-md brand-txt"><a href="javascript:void(0)" ng-click="viewCart()"
					class=" brand-txt"><span
						class="glyphicon glyphicon-shopping-cart pr-5"></span>My Cart
						({{orderSummary.deviceInfo.length}}) </a></li>
				<li><a href="javascript:void(0)"><span
						class="glyphicon glyphicon-phone-alt mr-5"></span>Customer Care</a></li>

			</ul>
		</nav>
	</div>
</nav>