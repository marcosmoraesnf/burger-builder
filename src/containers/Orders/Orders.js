import axios from "./../../axiosOrders";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import { addOrder, fetchOrders } from "../../features/orders/ordersSlice";

const Orders = () => {
  let fetchedOrders = [];
  const orders = useSelector((state) => state.initialOrders.orders);
  //const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  let ordersContainer = <Spinner />;

  useEffect(() => {
    setLoading(true);
    dispatch(fetchOrders());
  }, []);

  if (orders) {
    let updatedOrders = orders.map((order, index) => {
      return (
        <Order
          key={index}
          salad={order.ingredients.salad}
          bacon={order.ingredients.bacon}
          meat={order.ingredients.meat}
          cheese={order.ingredients.cheese}
          price={order.price}
        />
      );
    });
    ordersContainer = updatedOrders;
  }

  return <div>{ordersContainer}</div>;
};

export default withErrorHandler(Orders, axios);
