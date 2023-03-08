import { Disclosure } from "@headlessui/react";
import React from "react";
const navigationSale = [
  { name: "Dashboard", href: "/dashboard/admin-saler", current: false },
  { name: "Produk", href: "/dashboard/produk", current: false },
];
const navigationQC = [
  { name: "Dashboard", href: "/dashboard/admin-qc", current: false },
  { name: "Produk", href: "/dashboard/produk", current: false },
  {
    name: "Quality Control",
    href: "/dashboard/quality-control",
    current: false,
  },
];
const navigationSuper = [
  { name: "Dashboard", href: "/dashboard/super", current: false },
  { name: "User", href: "/dashboard/users", current: false },
  { name: "Varian", href: "/dashboard/varian", current: false },
  { name: "Produk", href: "/dashboard/produk", current: false },
  {
    name: "Quality Control",
    href: "/dashboard/quality-control",
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const SideBarMobQC = () => {
  return (
    <div>
      {navigationQC.map((item) => (
        <Disclosure.Button
          key={item.name}
          as="a"
          href={item.href}
          className={classNames(
            item.current
              ? "bg-gray-900 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white",
            "block rounded-md px-3 py-2 text-base font-medium"
          )}
          aria-current={item.current ? "page" : undefined}
        >
          {item.name}
        </Disclosure.Button>
      ))}
    </div>
  );
};
export const SideBarMobSuper = () => {
  return (
    <div>
      {navigationSuper.map((item) => (
        <Disclosure.Button
          key={item.name}
          as="a"
          href={item.href}
          className={classNames(
            item.current
              ? "bg-gray-900 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white",
            "block rounded-md px-3 py-2 text-base font-medium"
          )}
          aria-current={item.current ? "page" : undefined}
        >
          {item.name}
        </Disclosure.Button>
      ))}
    </div>
  );
};
export const SideBarMobSaler = () => {
  return (
    <div>
      {navigationSale.map((item) => (
        <Disclosure.Button
          key={item.name}
          as="a"
          href={item.href}
          className={classNames(
            item.current
              ? "bg-gray-900 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white",
            "block rounded-md px-3 py-2 text-base font-medium"
          )}
          aria-current={item.current ? "page" : undefined}
        >
          {item.name}
        </Disclosure.Button>
      ))}
    </div>
  );
};
