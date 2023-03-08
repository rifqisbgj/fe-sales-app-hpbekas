import { Fragment, useEffect } from "react";
import { Dialog, Disclosure, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";

const MobileFilter = ({
  brandData,
  mobileFiltersOpen,
  setMobileFiltersOpen,
  handleChange,
  setMaxPrice,
  setMinPrice,
  filterState,
}) => {
  {
    /* Mobile filter dialog */
  }

  return (
    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50 lg:hidden"
        onClose={setMobileFiltersOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                <Disclosure
                  as="div"
                  defaultOpen
                  className="border-t border-gray-200 px-4 py-6"
                >
                  {({ open }) => (
                    <>
                      <h3 className="-mx-2 -my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            Brand
                          </span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <ChevronUpIcon
                                class="h-5 w-5"
                                aria-hidden="true"
                              />
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
                        <div className="space-y-6">
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
                <Disclosure
                  as="div"
                  defaultOpen
                  className="border-t border-gray-200 px-4 py-6"
                >
                  {({ open }) => (
                    <>
                      <h3 className="-my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-bold text-gray-900">Harga</span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <ChevronUpIcon
                                class="h-5 w-5"
                                aria-hidden="true"
                              />
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
                              onKeyPress={(e) =>
                                !/[0-9]/.test(e.key) && e.preventDefault()
                              }
                              defaultValue={filterState.minPrice}
                              onBlur={(e) => setMinPrice(e.target.value)}
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
                              onKeyPress={(e) =>
                                !/[0-9]/.test(e.key) && e.preventDefault()
                              }
                              defaultValue={filterState.maxPrice}
                              onBlur={(e) => setMaxPrice(e.target.value)}
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
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default MobileFilter;
