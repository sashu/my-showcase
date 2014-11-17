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
				<li class="font-md brand-txt"><a href="javascript:void(0)"
					class="dropdown-toggle brand-txt" id="dropdownMenu1"
					data-toggle="dropdown" aria-expanded="true"><span
						class="glyphicon glyphicon-shopping-cart pr-5"></span>My Cart
						({{cart.deviceInfo.length}}) <span class="caret"></span></a>
					<ul class="dropdown-menu" role="menu"
						aria-labelledby="dropdownMenu1">
						<li role="presentation" ng-repeat="device in cart.deviceInfo"><a
							role="menuitem" tabindex="-1"
							href="order#/placeorder/model?cartId={{device.cartId}}&inv=C">{{device.model
								| model}} ({{device.color | color}})</a></li>
					</ul></li>
				<li><a href="javascript:void(0)"><span
						class="glyphicon glyphicon-phone-alt mr-5"></span>Customer Care</a></li>

			</ul>
		</nav>
	</div>
</nav>