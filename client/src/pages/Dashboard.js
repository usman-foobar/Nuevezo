import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Tab } from "../components/Tab";
import CreateCustomer from "../components/partner/CreateCustomer";
import ListCustomer from "../components/common/ListCustomer";
import ListProducts from "../components/common/ListProducts";
import CreateDeal from "../components/partner/CreateDeal";
import ListDeals from "../components/common/ListDeals";
import { Navigate } from "react-router-dom";
import Button from "../components/Button";
import ListPartners from "../components/admin/ListPartners";
import CreateProduct from "../components/admin/CreateProducts";

const Dashboard = () => {
  useContext(UserContext);
  const { user } = useContext(UserContext);
  let token = localStorage.getItem("token");

  const [activeTab, setActiveTab] = useState(0);

  if (!token) {
    return <Navigate to={"/"} />;
  }

  const tabs =
    user.role === "super_admin"
      ? [
          { name: "List Customer", component: <ListCustomer /> },
          { name: "List Partners", component: <ListPartners /> },
          { name: "List Deals", component: <ListDeals /> },
          { name: "List Products", component: <ListProducts /> },
          { name: "Create Products", component: <CreateProduct /> },
        ]
      : [
          { name: "Create Customer", component: <CreateCustomer /> },
          { name: "List Customer", component: <ListCustomer /> },
          { name: "List Products", component: <ListProducts /> },
          { name: "Create Deal", component: <CreateDeal /> },
          { name: "List Deals", component: <ListDeals /> },
        ];

  return (
    <div className="flex">
      <div className="w-72 bg-blue-900 text-white h-screen py-10 px-4 flex flex-col justify-between">
        <div>
          <div className="text-2xl font-bold mb-6">{user.role === "super_admin" ? "Admin" : "Partner"} Dashboard</div>
          <nav className="mt-10">
            <ul className="text-lg font-thin">
              {tabs.map((tab, index) => (
                <Tab
                  key={index}
                  activeTab={activeTab}
                  tabName={tab.name}
                  onClickHandler={() => setActiveTab(index)}
                />
              ))}
            </ul>
          </nav>
        </div>
        <div>
          <Button
            text={"Logout"}
            onClickHandler={() => {
              localStorage.clear();
              window.location.reload();
            }}
          />
        </div>
      </div>

      <div className="flex-1 p-4 bg-gray-100 text-center">
        {tabs[activeTab].component}
      </div>
    </div>
  );
};

export default Dashboard;
