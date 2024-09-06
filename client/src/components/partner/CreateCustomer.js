import React, { useState } from "react";
import { Input } from "../Input";
import Button from "../Button";
import axios from "axios";

const CreateCustomer = () => {
  const [customerName, setCustomerName] = useState();
  const [customerEmail, setCustomerEmail] = useState();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const baseUrl = process.env.REACT_APP_API_URL;

  const submitCustomerData = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      if (!customerEmail || !customerName) {
        setError("Email and name are required");
        return;
      }
      const response = await axios.post(
        `${baseUrl}/partner/operations/create-customer`,
        {
          name: customerName,
          email: customerEmail,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      setSuccess(response.data.message);
      setCustomerEmail("");
      setCustomerName("");
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        window.location.reload();
      } else {
        setError(error.response.data.message);
      }
    }
  };
  return (
    <div className="mt-8">
      <h1 className="text-2xl font-bold mb-4">Create Customer</h1>
      {error && <span className="text-red-700">{error}</span>}
      {success && <span className="text-green-700">{success}</span>}
      <div className="flex justify-center text-left">
        <form className="w-1/2">
          <Input
            label={"Customer Name"}
            name={"Customer Name"}
            type={"text"}
            value={customerName}
            placeholder={"Customer Name"}
            onChange={(e) => setCustomerName(e.target.value)}
          />

          <Input
            label={"Customer Email"}
            name={"Customer Email"}
            type={"email"}
            value={customerEmail}
            placeholder={"Customer Email"}
            onChange={(e) => setCustomerEmail(e.target.value)}
          />

          <Button
            text={"Create Customer"}
            onClickHandler={submitCustomerData}
          />
        </form>
      </div>
    </div>
  );
};

export default CreateCustomer;
