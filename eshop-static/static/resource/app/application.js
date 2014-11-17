var storage = {}
storage.iph = [ {
	key : '1d16',
	space : '16 GB',
	desc : 'N 30',
	cost : '30000'
}, {
	key : '1d64',
	space : '64 GB',
	desc : 'N 35',
	cost : '35000'
}, {
	key : '1d128',
	space : '128 GB',
	desc : 'N 40',
	cost : '40000'
} ];

storage.iph_p = [ {
	key : '2d16',
	space : '16 GB',
	desc : 'N 40',
	cost : '40000'
}, {
	key : '2d64',
	space : '64 GB',
	desc : 'N 45',
	cost : '45000'
}, {
	key : '2d128',
	space : '128 GB',
	desc : 'N 50',
	cost : '50000'
} ];

var color = {};
color.SILVER = {
	desc : 'Silver',
	image : 'silver_model.png'
};
color.GOLD = {
	desc : 'Gold',
	image : 'gold_model.png'
};
color.SPACE_GRAY = {
	desc : 'Space Gray',
	image : 'gray_model.png'
};

$(document).ready(function() {
	$('#loading').width($(window).width());
	$('#loading').height($(window).height());
	$(window).resize(function() {
		$('.visitorSelect').css({
			position : 'absolute'
		});

		$('.visitorSelect').css({
			left : ($(window).width() - $('.visitorSelect').outerWidth()) / 2,
			top : ($(window).height() - $('.visitorSelect').outerHeight()) / 2
		});
	});
	$(window).resize();
});

function isBlank(val) {
	if (val != null && val != undefined) {
		var newVal = $.trim(val);
		if (newVal.length > 0) {
			return false;
		} else {
			return true;
		}
	} else {
		return true;
	}
}

function submitForm(action) {
	document.forms[0].action = action;
	document.forms[0].method = "post";
	document.forms[0].submit();
}

function goTo(url) {
	window.location.href = url;
}

function log(msg) {
	try {
		console.log(msg);
	} catch (err) {

	}
}

function getParameter(href, key, ignoreHash) {
	var paramValue = "";
	var urlParts = href.split("?");
	if (urlParts.length == 2) {
		var queryString = urlParts[1].split("&");
		for (var i = 0; i < queryString.length; i++) {
			var pair = queryString[i].split("=");
			if (pair.length > 1 && key == pair[0]) {
				paramValue = pair[1];
			}
		}
	}
	if (ignoreHash != undefined && ignoreHash) {
		paramValue = paramValue.split("#")[0];
	}
	return decodeURI(paramValue);
}

function show(selec, show) {
	if (show) {
		$(selec).removeClass('hidden');
	} else {
		$(selec).addClass('hidden');
	}
}

function jq(selector) {
	return angular.element(selector);
}

function removeFromArray(array, index, count) {
	array.splice(index, count);
}

function showModal(id) {
	$('#' + id).modal({
		backdrop : 'static',
		keyboard : false
	});
}

function hideModal(id) {
	$('#' + id).modal('hide');
}

function isInArray(value, array) {
	if ($.inArray(value, array) == -1) {
		return false;
	} else {
		return true;
	}
}

function addTooltips($) {
	$(function() {
		setTimeout(function() {
			$("[data-toggle='popover']").popover();
		}, 1000);
	});

	$(function() {
		setTimeout(function() {
			$("[rel='tooltip']").tooltip();
		}, 1000);
	});
}

/*******************************************************************************
 * Error Handling
 ******************************************************************************/

var errors = {
	invalidCred : "Invalid Username/password",
	sessionExpired : "Your session has expired. Close to navigate to home",
	requiredField : "<strong>{0}</strong> field is mandatory and cannot be left blank.",
	newClientSUbmitFailed : "<strong></strong> Ooops ! There could be some error at this moment.Please try later",
	_503 : "One of our services is down temporarily. Please visit the url later",
	_404 : "The requested url is not found.",
	_500 : "There was an unexpected error . Please try again later or Contact Administrator(admin.contact@alwayson.ng)"
};

function getErrorMsg(status, data) {
	var msg = "";
	var code = parseInt(status);

	if (code == 500 || code == 404 || code == 503) {
		msg = errors._500;
		if (code == 503) {
			msg = errors._503;
		} else if (code == 404) {
			msg = errors._404;
		}
	}

	if (data != undefined && data.exCode == "SESSION_INVALID") {
		msg = errors.sessionExpired;
	}

	return msg;
}

function handleResponse(data, status) {
	hideModal('wait_modal');
	var closeHandler = function() {
		clearModalValues();
		if (data.exCode == "SESSION_INVALID") {
			window.location.href = 'login.html';
		} else {
			window.location.href = "home";
		}
	};

	if (status != undefined || status != null) {
		if (getErrorMsg(status) != "") {
			createAndShowModal("Error !!", getErrorMsg(status, data),
					closeHandler);
		}
	}
}

function clearModalValues() {
	$('#gn_modal_title').html('');
	$('#gn_modal_body').html('');
}

function createAndShowModal(title, msg, closeHandler) {
	$('#gn_modal_title').html(title);
	$('#gn_modal_body').html(msg);

	$('#gn_modal').modal({
		backdrop : 'static',
		keyboard : false
	});

	$("#gn_close").unbind();
	$("#gn_upper_close").unbind();
	$('#gn_close').on('click', closeHandler);
	$('#gn_upper_close').on('click', closeHandler);
}

function callConfirm(title, msg, okayHandler) {
	$('#cnf_modal_title').html('');
	$('#cnf_modal_body').html('');

	$('#cnf_modal_title').html(title);
	$('#cnf_modal_body').html(msg);

	$('#cnf_modal').modal({
		backdrop : 'static',
		keyboard : false
	});

	$("#cnf_okay").unbind();
	$('#cnf_okay').on('click', okayHandler);
}

var extraDetails = {};