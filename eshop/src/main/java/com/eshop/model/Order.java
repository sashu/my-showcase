package com.eshop.model;

import java.io.Serializable;
import java.util.List;

public class Order implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 9173013248926866514L;
	private List<DeviceInfo> deviceInfo;
	private PersonalDetails personalDetails;
	private Payment payment;

	private String orderNo;
	private String orderDate;
	private String ip;
	private String amount;
	private String respDesc;
	private String respCode;
	private String txRef;
	private String clientId;
	private String rechargePin;
	private String signature;
	private String total;

	public List<DeviceInfo> getDeviceInfo() {
		return deviceInfo;
	}

	public void setDeviceInfo(List<DeviceInfo> deviceInfo) {
		this.deviceInfo = deviceInfo;
	}

	public PersonalDetails getPersonalDetails() {
		return personalDetails;
	}

	public void setPersonalDetails(PersonalDetails personalDetails) {
		this.personalDetails = personalDetails;
	}

	public Payment getPayment() {
		return payment;
	}

	public void setPayment(Payment payment) {
		this.payment = payment;
	}

	public String getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	public String getOrderDate() {
		return orderDate;
	}

	public void setOrderDate(String orderDate) {
		this.orderDate = orderDate;
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public String getAmount() {
		return amount;
	}

	public void setAmount(String amount) {
		this.amount = amount;
	}

	public String getRespDesc() {
		return respDesc;
	}

	public void setRespDesc(String respDesc) {
		this.respDesc = respDesc;
	}

	public String getRespCode() {
		return respCode;
	}

	public void setRespCode(String respCode) {
		this.respCode = respCode;
	}

	public String getTxRef() {
		return txRef;
	}

	public void setTxRef(String txRef) {
		this.txRef = txRef;
	}

	public String getClientId() {
		return clientId;
	}

	public void setClientId(String clientId) {
		this.clientId = clientId;
	}

	public String getRechargePin() {
		return rechargePin;
	}

	public void setRechargePin(String rechargePin) {
		this.rechargePin = rechargePin;
	}

	public String getSignature() {
		return signature;
	}

	public void setSignature(String signature) {
		this.signature = signature;
	}

	public String getTotal() {
		return total;
	}

	public void setTotal(String total) {
		this.total = total;
	}

	@Override
	public String toString() {
		return "Order [deviceInfo=" + deviceInfo + ", personalDetails="
				+ personalDetails + ", payment=" + payment + ", orderNo="
				+ orderNo + ", orderDate=" + orderDate + ", ip=" + ip
				+ ", amount=" + amount + ", respDesc=" + respDesc
				+ ", respCode=" + respCode + ", txRef=" + txRef + ", clientId="
				+ clientId + ", rechargePin=" + rechargePin + ", signature="
				+ signature + ", total=" + total + "]";
	}
}
