import { Popover, Transition } from "@headlessui/react";
import { Search } from "react-feather";
import React, { Fragment } from "react";
import SearchBar from "./SearchBar";

const SearchBarContainer = ({ setStyleChange }) => {
  return (
    <div className="w-full max-w-sm ">
      <Popover className="">
        {({ open, close }) => {
          return (
            <>
              <Popover.Button className="focus:outline-none ">
                <Search
                  strokeWidth={1}
                  width={30}
                  height={30}
                  onClick={() => {
                    if (open) setStyleChange(false);
                    else setStyleChange(true);
                  }}
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
                <Popover.Panel className="border-t border-[#D7D9AF] absolute right-0 z-10 w-screen mt-5 transform ">
                  <div className=" shadow-md relative inset-x-0 ">
                    <div className="rounded-b-lg relative gap-8 bg-beige p-6 flex justify-between items-center ">
                      <div className="flex flex-col gap-2 grow">
                        <div className="m-0 grow">
                          <SearchBar />
                        </div>
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          );
        }}
      </Popover>
    </div>
  );
};

export default SearchBarContainer;
