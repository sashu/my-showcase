package com.eshop.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.sql.DataSource;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import com.eshop.model.City;
import com.eshop.model.DeviceInfo;
import com.eshop.model.Order;
import com.eshop.model.Payment;
import com.eshop.model.PersonalDetails;

public class EshopDAOImpl implements EshopDAO {

	private static final Logger _LOGGER = Logger.getLogger(EshopDAOImpl.class);

	@Autowired
	private DataSource dataSource;
	public static Map<String, List<City>> cityMap = new HashMap<String, List<City>>();

	public void initMetaData() {
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		List<City> city = jdbcTemplate.queryForObject(Query.SELECT_ALL_CITY,
				new Object[] { Query.COUNTRY_NIGERIA },
				new RowMapper<List<City>>() {
					@Override
					public List<City> mapRow(ResultSet rs, int rowNum)
							throws SQLException {
						List<City> refTypeList = new ArrayList<City>();
						if (rs != null) {
							do {
								City c = new City();
								c.setId(rs.getInt("id"));
								c.setName(rs.getString("name"));
								c.setDistrict(rs.getString("district"));
								refTypeList.add(c);
							} while (rs.next());
						}
						return refTypeList;
					}
				});

		if (city != null) {
			for (String state : getDistinctState(city)) {
				cityMap.put(state, getCityList(state, city));
			}
		}

		System.out.println(cityMap.values());

	}

	private List<City> getCityList(String state, List<City> city) {
		List<City> retSet = new ArrayList<City>();
		for (City c : city) {
			if (c.getDistrict().equalsIgnoreCase(state))
				retSet.add(c);
		}
		return retSet;
	}

	private Set<String> getDistinctState(List<City> city) {
		Set<String> retSet = new LinkedHashSet<String>();
		Collections.sort(city, new Comparator<City>() {
			@Override
			public int compare(City o1, City o2) {
				return o1.getDistrict().compareTo(o2.getDistrict());
			}
		});

		for (City c : city) {
			retSet.add(c.getDistrict());
		}
		return retSet;
	}

	@Override
	public boolean saveOrder(Order order) {

		deleteOrder(order);

		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		PersonalDetails pd = order.getPersonalDetails();
		Payment pay = order.getPayment();
		List<DeviceInfo> deviceList = order.getDeviceInfo();

		jdbcTemplate.update(Query.INSERT_ORDER, order.getOrderNo(),
				order.getOrderDate(), order.getIp(), order.getAmount(),
				order.getRespDesc(), order.getTxRef(), order.getRespCode(),
				order.getClientId(), order.getRechargePin(),
				order.getSignature(), order.getTotal());
		jdbcTemplate.update(Query.INSERT_PAYMENT, pay.getMode(),
				pay.getTenor(), pay.getTotal(), pay.getTerms(),
				order.getOrderNo());
		jdbcTemplate.update(Query.INSERT_PERSONAL_INFO, pd.getAddressSame(),
				pd.getAltNo(), pd.getCity(), pd.getCmmAddress(),
				pd.getCnfEmailId(), pd.getCustomCity(), pd.getEmailId(),
				pd.getIdentityType(), pd.getIdentityNo(), pd.getMobileNo(),
				pd.getName(), pd.getShippingAddress(), pd.getState(),
				order.getOrderNo());
		if (deviceList != null && deviceList.size() > 0) {
			for (DeviceInfo d : deviceList) {
				jdbcTemplate.update(Query.INSERT_DEVICE, d.getColor(),
						d.getColorDesc(), d.getModel(), d.getModelImage(),
						d.getQuantity(), d.getStorage(), d.getStorageDesc(),
						d.getCartId(), order.getOrderNo());
			}
		}
		return true;
	}

	private void deleteOrder(Order order) {
		if (order.getOrderNo() != null) {
			JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
			String del_order = "delete from eshop.order where order_no=?";
			String del_device_order = "delete from eshop.device_order where order_no=?";
			String del_payment = "delete from eshop.personal_details where order_no=?";
			String del_personal_detail = "delete from eshop.payment where order_no=?";

			jdbcTemplate.update(del_device_order, order.getOrderNo());
			jdbcTemplate.update(del_payment, order.getOrderNo());
			jdbcTemplate.update(del_personal_detail, order.getOrderNo());
			jdbcTemplate.update(del_order, order.getOrderNo());
		}
	}
}
