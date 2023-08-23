import React from "react";
import ItemList from "./ItemList";
import CustomerInfo from "./CustomerInfo";
import CustomerAddress from "./CustomerAddress";
import PaymentInfo from "./PaymentInfo";

interface OrderDetailsProps {
  selectedOrder: any;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ selectedOrder }) => {
  return (
    <div>
      <CustomerInfo user={selectedOrder.user} />
      <PaymentInfo paymentData={selectedOrder} />
      <CustomerAddress address={selectedOrder.address} />
      <ItemList selectedOrderItems={selectedOrder.items} />
    </div>
  );
};

export default OrderDetails;
