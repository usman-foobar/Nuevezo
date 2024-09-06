import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import Button from "../Button";
import { Link } from "react-router-dom";

const ListDeals = () => {
  const [deals, setDeals] = useState([]);
  const { user } = useContext(UserContext);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const baseUrl = process.env.REACT_APP_API_URL;

  const url =
    user.role === "super_admin"
      ? `${baseUrl}/admin/operations/fetch-all-deals`
      : `${baseUrl}/partner/deals/list`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(url, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        setDeals(response.data.deals);
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

  const approveCustomer = async (dealId) => {
    const response = await axios.patch(
      `${baseUrl}/admin/operations/approve-deal/${dealId}`,
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
      {deals.length > 0 ? (
        <div className="w-full max-w-4xl mx-auto border border-gray-300 rounded-lg">
          <div className="flex bg-gray-200 font-bold">
            <div className="flex-1 p-4 border-b border-gray-300">ID</div>
            <div className="flex-1 p-4 border-b border-gray-300">
              Product Id
            </div>
            <div className="flex-1 p-4 border-b border-gray-300">
              Customer Id
            </div>
            <div className="flex-1 p-4 border-b border-gray-300">
              Partner Id
            </div>

            <div className="flex-1 p-4 border-b border-gray-300">Quantity</div>
            <div className="flex-1 p-4 border-b border-gray-300">Quotation</div>
            <div className="flex-1 p-4 border-b border-gray-300">Proposal</div>
            <div className="flex-1 p-4 border-b border-gray-300">status</div>
            {user.role === "super_admin" ? (
              <div className="flex-1 p-4 border-b border-gray-300">Action</div>
            ) : (
              <></>
            )}
          </div>
          {deals.map((deal) => (
            <div className="flex" key={deal.id}>
              <div className="flex-1 p-4 border-b border-gray-300">
                {deal.id}
              </div>
              <div className="flex-1 p-4 border-b border-gray-300">
                {deal.product_id}
              </div>
              <div className="flex-1 p-4 border-b border-gray-300">
                {deal.customer_id}
              </div>

              <div className="flex-1 p-4 border-b border-gray-300">
                {deal.user_id}
              </div>
              <div className="flex-1 p-4 border-b border-gray-300">
                {deal.quantity}
              </div>
              <div className="flex-1 p-4 border-b border-gray-300">
                <Link className="text-blue-700 hover:underline"
                  to={process.env.REACT_APP_BASE_URL + "/" + deal.quotation_url}
                  rel="noreferrer"
                  target={"_blank"}
                >
                  view
                </Link>
              </div>
              <div className="flex-1 p-4 border-b border-gray-300">
                <Link className="text-blue-700 hover:underline"
                  to={process.env.REACT_APP_BASE_URL + "/" + deal.proposal_url}
                  rel="noreferrer"
                  target={"_blank"}
                >
                  view
                </Link>
              </div>

              <div className="flex-1 p-4 border-b border-gray-300">
                {deal.approved ? "Approved" : "Not Approved"}
              </div>

              {user.role === "super_admin" ? (
                <div className="flex-1 p-4 border-b border-gray-300">
                  {!deal.approved && (
                    <Button
                      onClickHandler={() => approveCustomer(deal.id)}
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
        <>No deals</>
      )}
    </div>
  );
};

export default ListDeals;
