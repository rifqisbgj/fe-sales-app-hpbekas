import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import ListProduct from "./ListProduct";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  FunnelIcon,
} from "@heroicons/react/20/solid";
import MobileFilter from "./MobileFilter";
import apiAdapter from "../../api/apiAdapter";
import useUrlState from "@ahooksjs/use-url-state";

const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const FilterProduct = () => {
  // memberikan state untuk mengaktifkan/non-aktifkan tampilan mobile
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  // menampung data brand yang diambil dari api
  const [brandData, setDataBrand] = useState([]);
  // menangkap serta memberikan query url
  const [filterState, setStateFilter] = useUrlState(
    // menampung serta memberikan var query dengan nama brand yang bernilai array
    { brand: [] },
    {
      // array brand tersebut akan menerima value dengan format array "comma"
      parseOptions: {
        arrayFormat: "comma",
      },
      // melakukan perubahan format menjadi "value,value,dst..."
      stringifyOptions: {
        arrayFormat: "comma",
      },
    }
  );

  const getBrand = async () => {
    const res = await apiAdapter.get("/brand");
    // memberikan key isCheck untuk nilai dari checkbox
    const brandFilterData = res.data.data.map((v) => ({
      ...v,
      isCheck: false,
    }));
    // console.log([...filterState.brand]);
    brandFilterData.map((a) =>
      // menset nilai isCheck pada brandFilterData, jika idnya terdapat pada filterState
      [...filterState.brand].includes(`${a.id}`)
        ? (a.isCheck = true)
        : (a.isCheck = false)
    );
    console.log(brandFilterData);
    setDataBrand(brandFilterData);
  };

  useEffect(
    () => {
      getBrand();
    }, // jika terjadi perubahan pada filter brand
    [filterState.brand]
  );

  const handleChange = (e) => {
    const { brand } = filterState;
    const { value, checked } = e.target;
    const indx = [...brandData].findIndex((obj) => obj.id == value);
    if (checked) {
      [...brandData][indx].isCheck = true;
      setStateFilter({ brand: [...brand, value] });
    } else {
      [...brandData][indx].isCheck = false;
      setStateFilter({ brand: [...brand].filter((e) => e !== value) });
    }
  };
  return (
    <div>
      <MobileFilter
        brandData={brandData}
        mobileFiltersOpen={mobileFiltersOpen}
        setMobileFiltersOpen={setMobileFiltersOpen}
      />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Produk Tersedia
          </h1>

          <div className="flex items-center">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <ChevronDownIcon
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <Menu.Item key={option.name}>
                        {({ active }) => (
                          <a
                            href={option.href}
                            className={classNames(
                              option.current
                                ? "font-medium text-gray-900"
                                : "text-gray-500",
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            {option.name}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <button
              type="button"
              className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <span className="sr-only">Filters</span>
              <FunnelIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <section aria-labelledby="products-heading" className="pt-6 pb-24">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>
          {/* Desktop Page Filter */}
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
            {/* Filters */}
            <form className="hidden lg:block bg-white h-fit px-3 rounded-lg">
              <Disclosure as="div" defaultOpen className="border-b py-6">
                {({ open }) => (
                  <>
                    <h3 className="-my-3 flow-root">
                      <Disclosure.Button className="flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-bold text-gray-900">Brand</span>
                        <span className="ml-6 flex items-center">
                          {open ? (
                            <ChevronUpIcon class="h-5 w-5" aria-hidden="true" />
                          ) : (
                            <ChevronDownIcon
                              class="h-5 w-5"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      </Disclosure.Button>
                    </h3>
                    <Disclosure.Panel className="pt-6">
                      <div className="space-y-4">
                        {brandData.map((brandoption, optionIdx) => (
                          <div
                            key={brandoption.id}
                            className="flex items-center"
                          >
                            <input
                              id={`filter-${brandoption.id}-${optionIdx}`}
                              name="brand[]"
                              defaultValue={brandoption.id}
                              type="checkbox"
                              onChange={handleChange}
                              // {...([filterState.brand].includes(
                              //   `${brandoption.id}`
                              // )
                              //   ? (lala = true)
                              //   : (lala = false))}
                              checked={brandoption.isCheck}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label className="ml-3 text-sm text-gray-600">
                              {brandoption.namamerek}
                            </label>
                          </div>
                        ))}
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
              <Disclosure as="div" defaultOpen className="py-6">
                {({ open }) => (
                  <>
                    <h3 className="-my-3 flow-root">
                      <Disclosure.Button className="flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-bold text-gray-900">Harga</span>
                        <span className="ml-6 flex items-center">
                          {open ? (
                            <ChevronUpIcon class="h-5 w-5" aria-hidden="true" />
                          ) : (
                            <ChevronDownIcon
                              class="h-5 w-5"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      </Disclosure.Button>
                    </h3>
                    <Disclosure.Panel className="pt-6">
                      <div className="space-y-4">
                        <div className="relative mt-1 rounded-md shadow-sm">
                          <div className="pointer-events-none bg-slate-300 rounded-l-md absolute inset-y-0 left-0 flex items-center pl-2 pr-2">
                            <span className="text-slate-700 font-semibold sm:text-sm">
                              Rp{" "}
                            </span>
                          </div>
                          <input
                            type="text"
                            name="price"
                            id="price"
                            className="block w-full rounded-md border-gray-300 pl-10 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Harga Minimum"
                          />
                        </div>
                        <div className="relative mt-1 rounded-md shadow-sm">
                          <div className="pointer-events-none bg-slate-300 rounded-l-md absolute inset-y-0 left-0 flex items-center pl-2 pr-2">
                            <span className="text-slate-700 font-semibold sm:text-sm">
                              Rp{" "}
                            </span>
                          </div>
                          <input
                            type="text"
                            name="price"
                            id="price"
                            className="block w-full rounded-md border-gray-300 pl-10 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Harga Maximum"
                          />
                        </div>
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </form>

            {/* Product grid */}
            <div className="lg:col-span-4">{<ListProduct />}</div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default FilterProduct;
