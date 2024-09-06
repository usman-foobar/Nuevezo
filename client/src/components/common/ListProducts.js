import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";

const ListProducts = () => {
  const [products, setProducts] = useState([]);
  const { user } = useContext(UserContext);
  const [error, setError] = useState();

  const baseUrl = process.env.REACT_APP_API_URL;

  const url =
    user.role === "super_admin"
      ? `${baseUrl}/admin/products/list`
      : `${baseUrl}/partner/operations/list-products`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(url, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        setProducts(response.data.productList);
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

  return (
    <div className="text-center mt-8 w-full">
      <h1 className="text-2xl font-bold mb-4">List Products</h1>
      <span className="text-red-700">{error}</span>
      {products.length > 0 ? (
        <div className="w-full max-w-4xl mx-auto border border-gray-300 rounded-lg">
          <div className="flex bg-gray-200 font-bold">
            <div className="flex-1 p-4 border-b border-gray-300">ID</div>
            <div className="flex-1 p-4 border-b border-gray-300">Name</div>
            <div className="flex-1 p-4 border-b border-gray-300">
              Description
            </div>
            <div className="flex-1 p-4 border-b border-gray-300">Image</div>
          </div>
          {products.map((product) => (
            <div className="flex" key={product.id}>
              <div className="flex-1 p-4 border-b border-gray-300">
                {product.id}
              </div>
              <div className="flex-1 p-4 border-b border-gray-300">
                {product.name}
              </div>
              <div className="flex-1 p-4 border-b border-gray-300">
                {product.description}
              </div>
              <div className="flex-1 p-4 border-b border-gray-300">
                <img
                  width={150}
                  height={150}
                  src={process.env.REACT_APP_BASE_URL + "/" + product.image_url}
                  alt="product_image"
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>No products</>
      )}
    </div>
  );
};

export default ListProducts;
