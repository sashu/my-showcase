package com.eshop.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.eshop.dao.EshopDAO;
import com.eshop.dao.EshopDAOImpl;
import com.eshop.model.City;
import com.eshop.model.DeviceInfo;
import com.eshop.model.Order;


@Controller
public class EshopController {

	private static final SimpleDateFormat DATE_FMT = new SimpleDateFormat(
			"dd MMM,yyyy hh:mm:ss a");
	@Autowired
	private EshopDAO eshopDAO;

	@RequestMapping(value = "/home")
	public String home() {
		return "home";
	}

	@RequestMapping(value = "/order")
	public String order() {
		return "order";
	}

	@RequestMapping(value = "/state")
	public @ResponseBody List<String> state() {
		List<String> ret = new ArrayList<String>();
		ret.addAll(EshopDAOImpl.cityMap.keySet());
		Collections.sort(ret);
		return ret;
	}

	@RequestMapping(value = "/city", method = RequestMethod.POST)
	public @ResponseBody List<City> state(@RequestBody String state) {
		return EshopDAOImpl.cityMap.get(state);
	}

	@RequestMapping(value = "/placeorder", method = RequestMethod.POST)
	public @ResponseBody String updateOrder(HttpSession session) {
		String uuid = UUID.randomUUID().toString();
		if (session.getAttribute("ORDER") == null) {
			Order order = new Order();
			DeviceInfo info = new DeviceInfo();
			info.setCartId(uuid);
			List<DeviceInfo> deviceInfo = new ArrayList<DeviceInfo>();
			deviceInfo.add(info);
			order.setDeviceInfo(deviceInfo);
			session.setAttribute("ORDER", order);
		} else {
			Order order = (Order) session.getAttribute("ORDER");
			DeviceInfo info = new DeviceInfo();
			info.setCartId(uuid);
			order.getDeviceInfo().add(info);
		}
		return uuid;
	}

	@RequestMapping(value = "/updateorder", method = RequestMethod.POST)
	public @ResponseBody String updateOrder(@RequestBody Order order,
			HttpSession session) {
		if (order.getPayment() != null) {
			order.getPayment().setTotal(getTotal(order));
		}
		session.setAttribute("ORDER", order);
		return "S";
	}

	@RequestMapping(value = "/fetchorder", method = RequestMethod.GET)
	public @ResponseBody Object getOrder(HttpSession session) {
		return session.getAttribute("ORDER");
	}

	@RequestMapping(value = "/clearOrder", method = RequestMethod.GET)
	public @ResponseBody String clearOrder(HttpSession session) {
		session.removeAttribute("ORDER");
		return "Y";
	}

	@RequestMapping(value = "/confirm", method = RequestMethod.POST)
	public String confirm(HttpServletRequest request, HttpSession session) {

		Map<String, String> recieptVals = new HashMap<String, String>();
		for (Iterator iterator = request.getParameterMap().keySet().iterator(); iterator
				.hasNext();) {
			String key = (String) iterator.next();
			recieptVals.put(key, (String) request.getParameter(key));
		}
		
		String ip = request.getRemoteAddr();
		Order order = (Order) session.getAttribute("ORDER");

		String amt = recieptVals.get("amount");
		String respDesc = recieptVals.get("resp_desc");
		String txRef = recieptVals.get("tx_ref");
		String respCode = recieptVals.get("resp_code");
		String clId = recieptVals.get("client_id");
		String recPin = recieptVals.get("recharge_pin");
		String sign = recieptVals.get("signature");

		order.setOrderNo("OR"
				+ txRef.split("\\|")[txRef.split("\\|").length - 1]);
		order.setAmount(amt);
		order.setRespDesc(respDesc);
		order.setRespCode(respCode);
		order.setTxRef(txRef);
		order.setClientId(clId);
		order.setRechargePin(recPin);
		order.setSignature(sign);
		order.setOrderDate(DATE_FMT.format(new Date()));
		order.setTotal(getTotal(order));
		order.setIp(ip);

		eshopDAO.saveOrder(order);

		session.setAttribute("TRANS_RESULT", order);

		return "success";
	}

	
	@RequestMapping(value = "/confirm", method = RequestMethod.GET)
	public String getConfirm(HttpSession session, HttpServletRequest request) {
		session.removeAttribute("ORDER");
		System.out.println(session.getAttribute("TRANS_RESULT"));
		return "success";
	}

	@RequestMapping(value = "/transresult", method = RequestMethod.GET)
	public @ResponseBody Object getTransactionResult(HttpSession session) {
		return session.getAttribute("TRANS_RESULT");
	}

	private String getTotal(Order order) {
		long amt = 0;
		if (order != null && order.getDeviceInfo() != null) {
			for (DeviceInfo info : order.getDeviceInfo()) {
				if (info.getCost() != null) {
					Long cost = new Long(info.getCost());
					amt = amt + cost;
				}
			}
		}

		return String.valueOf(amt);
	}

}
