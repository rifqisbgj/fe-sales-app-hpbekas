import React from "react";
import { Link } from "react-router-dom";
import BestBrandTab from "../../components/tab-menu/BestBrandTab";
import NewProductsTab from "../../components/tab-menu/NewProductsTab";

const Tabs = ({ color }) => {
  const [openTab, setOpenTab] = React.useState(1);
  return (
    <div className="mt-12">
      <img
        src="https://apollo-singapore.akamaized.net/v1/files/gvxk5mjawxxi3-OLXAUTO/image;f=webp;s=2560x0"
        alt=""
        className="w-full h-full"
      />
      <div class="flex justify-center items-start -mt-16 w-full">
        <div className="w-9/12 z-10">
          <ul
            className="flex mb-0 px-10 list-none flex-wrap flex-row rounded-2xl bg-white"
            role="tablist"
          >
            <li className="mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-md font-bold uppercase px-5 py-10 block leading-normal " +
                  (openTab === 1
                    ? "text-blue-700 border-b-4 border-primary"
                    : "text-slate-500")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                TERKINI
              </a>
            </li>
            <li className="mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-md font-bold uppercase px-5 py-10 block leading-normal " +
                  (openTab === 2
                    ? "text-blue-700 border-b-4  border-primary"
                    : "text-slate-500 ")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                MERK POPULER
              </a>
            </li>
            <li className="mr-2 last:mr-0 flex-auto text-center">
              <Link
                className={
                  "text-md font-bold uppercase px-5 py-10 block leading-normal text-slate-500"
                }
                data-toggle="tab"
                to="/products"
                role="tablist"
              >
                LAINNYA
              </Link>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mt-4 mb-6 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  <NewProductsTab />
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  <BestBrandTab />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <>
      return <Tabs />;
    </>
  );
}
