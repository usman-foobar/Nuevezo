import { useState } from "react";
import { Input } from "../Input";
import axios from "axios";

const CreateProduct = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const baseUrl = process.env.REACT_APP_API_URL;

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!productName || !description || !price || !image) {
      setError("All inputs are required");
      return;
    }

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("productImage", image);

    try {
      const response = await axios.post(
        `${baseUrl}/admin/products/create`,
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setSuccess(response.data.message);
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
    <div className="mt-8 flex text-left justify-center max-h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>
        <div className="text-center">
          <span className="text-red-700">{error}</span>
          <span className="text-green-700">{success}</span>
        </div>
        <Input
          label={"Product Name"}
          type={"text"}
          placeholder={"Product Name"}
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Product Description"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          ></textarea>
        </div>

        <div className="mb-6">
          <Input
            label={"Product Price"}
            type={"number"}
            placeholder={0}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="mb-6">
          {/* <Input
            label={"Product Image"}
            type={"file"}
            onChange={handleImageChange}
          /> */}

          <label className="block text-gray-700 font-bold mb-2">
            Product Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
