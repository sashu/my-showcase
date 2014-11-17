package com.eshop.model;

import java.io.Serializable;

public class DeviceInfo implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1902515001844861766L;
	private String color;
	private String colorDesc;
	private String model;
	private String modelImage;
	private String quantity;
	private String storage;
	private String storageDesc;
	private String cartId;
	private String cost;

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public String getColorDesc() {
		return colorDesc;
	}

	public void setColorDesc(String colorDesc) {
		this.colorDesc = colorDesc;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public String getModelImage() {
		return modelImage;
	}

	public void setModelImage(String modelImage) {
		this.modelImage = modelImage;
	}

	public String getQuantity() {
		return quantity;
	}

	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}

	public String getStorage() {
		return storage;
	}

	public void setStorage(String storage) {
		this.storage = storage;
	}

	public String getStorageDesc() {
		return storageDesc;
	}

	public void setStorageDesc(String storageDesc) {
		this.storageDesc = storageDesc;
	}

	public String getCartId() {
		return cartId;
	}

	public void setCartId(String cartId) {
		this.cartId = cartId;
	}

	public String getCost() {
		return cost;
	}

	public void setCost(String cost) {
		this.cost = cost;
	}
}
