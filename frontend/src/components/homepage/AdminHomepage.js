import React from "react";
import AdminNav from "../AdminNav";
import ViewProductsAdmin from "../products/admin/ViewProductsAdmin";

const AdminHomepage = () => {
    return (
        <div>
            <AdminNav />
            <ViewProductsAdmin />
        </div>
    );
}

export default AdminHomepage;