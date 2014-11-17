package com.eshop.model;

import java.io.Serializable;

public class PersonalDetails implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 5345925945667057833L;
	private String addressSame;
	private String altNo;
	private String city;
	private String cmmAddress;
	private String cnfEmailId;
	private String customCity;
	private String emailId;
	private String identityType;
	private String identityNo;
	private String mobileNo;
	private String name;
	private String shippingAddress;
	private String state;

	public String getAddressSame() {
		return addressSame;
	}

	public void setAddressSame(String addressSame) {
		this.addressSame = addressSame;
	}

	public String getAltNo() {
		return altNo;
	}

	public void setAltNo(String altNo) {
		this.altNo = altNo;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getCmmAddress() {
		return cmmAddress;
	}

	public void setCmmAddress(String cmmAddress) {
		this.cmmAddress = cmmAddress;
	}

	public String getCnfEmailId() {
		return cnfEmailId;
	}

	public void setCnfEmailId(String cnfEmailId) {
		this.cnfEmailId = cnfEmailId;
	}

	public String getCustomCity() {
		return customCity;
	}

	public void setCustomCity(String customCity) {
		this.customCity = customCity;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getIdentityType() {
		return identityType;
	}

	public void setIdentityType(String identityType) {
		this.identityType = identityType;
	}

	public String getIdentityNo() {
		return identityNo;
	}

	public void setIdentityNo(String identityNo) {
		this.identityNo = identityNo;
	}

	public String getMobileNo() {
		return mobileNo;
	}

	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getShippingAddress() {
		return shippingAddress;
	}

	public void setShippingAddress(String shippingAddress) {
		this.shippingAddress = shippingAddress;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

}
