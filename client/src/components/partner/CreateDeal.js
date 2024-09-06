import React, { useState } from "react";
import { Input } from "../Input";
import Button from "../Button";
import axios from "axios";

const CreateDeal = () => {
  const [customerId, setCustomerId] = useState();
  const [productId, setProductId] = useState();
  const [quantity, setQuantity] = useState();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const baseUrl = process.env.REACT_APP_API_URL;

  const submitDealRequest = async (e) => {
    e.preventDefault();
    setError();
    setSuccess();

    if (!customerId || !productId || !quantity) {
      setError("All inputs have to be greater than zero");
      return;
    }

    try {
      let response = await axios.post(
        `${baseUrl}/partner/deals/create`,
        {
          customerId,
          productId,
          quantity,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
      
      setSuccess(response.data.message)
    } catch (error) {
      if (error?.response?.status === 401) {
        localStorage.clear();
        window.location.reload();
      } else {
        setError(error.response?.data.message);
      }
    }
  };

  return (
    <div className="text-center mt-8">
      <h1 className="text-2xl font-bold mb-4">Create Deal</h1>
      <span className="text-red-700">{error}</span>
      <span className="text-green-700">{success}</span>
      <div className="flex justify-center text-left">
        <form className="w-1/3">
          <Input
            label={"Customer Id"}
            placeholder={0}
            type={"Number"}
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
          />
          <Input
            label={"Product Id"}
            placeholder={0}
            type={"Number"}
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />
          <Input
            label={"Quantity"}
            placeholder={0}
            type={"Number"}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <Button text={"Create deal"} onClickHandler={submitDealRequest} />
        </form>
      </div>
    </div>
  );
};

export default CreateDeal;
