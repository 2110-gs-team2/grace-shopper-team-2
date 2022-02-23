import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Search } from "react-feather";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const SearchBar = () => {
  return (
    <div className="w-full max-w-sm ">
      <Popover className="">
        {({ open, close }) => (
          <>
            <Popover.Button>
              <Search
                strokeWidth={1}
                width={30}
                height={30}
                className="focus:outline-none"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className=" absolute right-0 z-10 w-screen mt-5 px-3 transform ">
                <div className=" shadow-md relative inset-x-0 ">
                  <div className="rounded-lg relative gap-8 bg-beige p-6 flex justify-between items-center ">
                    <div className="flex flex-col gap-2 grow">
                      <div className="m-0 grow">
                        <input
                          name="searchTerm"
                          type="text"
                          placeholder="....what plant are you looking for?"
                          className="py-3 px-7 border-forest-green text-3xl border-2 block w-full rounded-full bg-beige
                focus:border-forest-green focus:ring-2 focus:ring-xlight-green
          "
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};

export default SearchBar;
