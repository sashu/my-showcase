package com.eshop.dao;

public class Query {
	public static final String COUNTRY_NIGERIA = "NGA";
	public static final String ALL_COUNTRY = "SELECT code,name FROM world.country where code = ?";
	public static final String SELECT_ALL_CITY = "SELECT id,name,district FROM world.city where countrycode = ?";

	public static final String INSERT_ORDER = "insert into eshop.order values(?,?,?,?,?,?,?,?,?,?,?)";
	public static final String INSERT_DEVICE = "insert into eshop.device_order values(?,?,?,?,?,?,?,?,?)";
	public static final String INSERT_PERSONAL_INFO = "insert into eshop.personal_details values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
	public static final String INSERT_PAYMENT = "insert into eshop.payment values(?,?,?,?,?)";
}
