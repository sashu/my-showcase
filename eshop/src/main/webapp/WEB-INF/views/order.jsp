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
</head>
<body ng-app="EShop">
	<header>
		<%@ include file="/WEB-INF/include/header.si.jsp"%>
	</header>
	<div class="container-fluid">
		<div class="pull-left">
			<img src="/eshop-static/static/resource/images/AlwaysOnLogo.png"
				class="hidden-sm hidden-xs always-on">
		</div>
	</div>
	<div class="container">
		<div class="row animate-sctn" ng-view="" autoscroll="true"></div>
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

	<footer>
		<%@ include file="/WEB-INF/include/footer.jsp"%>
	</footer>
</body>
</html>