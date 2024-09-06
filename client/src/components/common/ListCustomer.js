import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import Button from "../Button";

const ListCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const { user } = useContext(UserContext);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const baseUrl = process.env.REACT_APP_API_URL;

  const url =
    user.role === "super_admin"
      ? `${baseUrl}/admin/operations/fetch-all-customers`
      : `${baseUrl}/partner/operations/fetch-all-customers`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(url, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        setCustomers(response.data.customersList);
      } catch (error) {
        if (error?.response?.status === 401) {
          localStorage.clear();
          window.location.reload();
        } else {
          setError(error.response?.data.message);
        }
      }
    };
    fetchData();
  }, []);

  const approveCustomer = async (customerId) => {
    const response = await axios.patch(
      `${baseUrl}/admin/operations/approve-customer-req/${customerId}`,
      {},
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    setSuccess(response.data.message);
  };

  return (
    <div className="text-center mt-8 w-full">
      <h1 className="text-2xl font-bold mb-4">List Customer</h1>
      <span className="text-green-700">{success}</span>
      <span className="text-red-700">{error}</span>
      {customers.length > 0 ? (
        <div className="w-full max-w-4xl mx-auto border border-gray-300 rounded-lg">
          <div className="flex bg-gray-200 font-bold">
            <div className="flex-1 p-4 border-b border-gray-300">ID</div>
            <div className="flex-1 p-4 border-b border-gray-300">Email</div>
            <div className="flex-1 p-4 border-b border-gray-300">Name</div>
            <div className="flex-1 p-4 border-b border-gray-300">Status</div>
            {user.role === "super_admin" ? (
              <div className="flex-1 p-4 border-b border-gray-300">Action</div>
            ) : (
              <></>
            )}
          </div>
          {customers.map((customer) => (
            <div className="flex" key={customer.id}>
              <div className="flex-1 p-4 border-b border-gray-300">
                {customer.id}
              </div>
              <div className="flex-1 p-4 border-b border-gray-300">
                {customer.name}
              </div>
              <div className="flex-1 p-4 border-b border-gray-300">
                {customer.email}
              </div>
              <div className="flex-1 p-4 border-b border-gray-300">
                {customer.approved ? "Approved" : "Not Approved"}
              </div>

              {user.role === "super_admin" ? (
                <div className="flex-1 p-4 border-b border-gray-300">
                  {!customer.approved && (
                    <Button
                      onClickHandler={() => approveCustomer(customer.id)}
                      text={"Approve"}
                    />
                  )}
                </div>
              ) : (
                <></>
              )}
            </div>
          ))}
        </div>
      ) : (
        <>No Customers</>
      )}
    </div>
  );
};

export default ListCustomer;
