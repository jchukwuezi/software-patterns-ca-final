import React from "react";
import CustomerNav from "../CustomerNav"
import ViewProductsCustomer from "../products/ViewProductsCustomer";

const CustomerHomepage = () => {
    return (
        <div>
            <CustomerNav/>
            <ViewProductsCustomer/>
        </div>
    );
}

export default CustomerHomepage;