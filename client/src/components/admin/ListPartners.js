import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import Button from "../Button";

const ListPartners = () => {
  const [partners, setPartners] = useState([]);
  const { user } = useContext(UserContext);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const baseUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(
          `${baseUrl}/admin/operations/fetch-all-partners`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );

        setPartners(response.data.partnersList);
      } catch (error) {
        console.log(error);

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

  const approvePartner = async (partnerId) => {
    const response = await axios.patch(
      `${baseUrl}/admin/operations/approve-partner-req/${partnerId}`,
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
      <h1 className="text-2xl font-bold mb-4">List Partner</h1>
      <span className="text-green-700">{success}</span>
      <span className="text-red-700">{error}</span>
      {partners.length > 0 ? (
        <div className="w-full max-w-4xl mx-auto border border-gray-300 rounded-lg">
          <div className="flex bg-gray-200 font-bold">
            <div className="flex-1 p-4 border-b border-gray-300">ID</div>
            <div className="flex-1 p-4 border-b border-gray-300">Email</div>
            <div className="flex-1 p-4 border-b border-gray-300">Name</div>
            <div className="flex-1 p-4 border-b border-gray-300">Status</div>
            <div className="flex-1 p-4 border-b border-gray-300">Action</div>
          </div>
          {partners.map((partner) => (
            <div className="flex" key={partner.id}>
              <div className="flex-1 p-4 border-b border-gray-300">
                {partner.id}
              </div>
              <div className="flex-1 p-4 border-b border-gray-300">
                {partner.name}
              </div>
              <div className="flex-1 p-4 border-b border-gray-300">
                {partner.email}
              </div>
              <div className="flex-1 p-4 border-b border-gray-300">
                {partner.approved ? "Approved" : "Not Approved"}
              </div>

              <div className="flex-1 p-4 border-b border-gray-300">
                {!partner.approved && (
                  <Button
                    onClickHandler={() => approvePartner(partner.id)}
                    text={"Approve"}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>No Partners</>
      )}
    </div>
  );
};

export default ListPartners;
