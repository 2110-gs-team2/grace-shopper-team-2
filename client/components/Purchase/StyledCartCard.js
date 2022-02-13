import React from "react";
import { Trash2, Package, Minus, Plus } from "react-feather";

const StylizedCartCard = () => {
  return (
    <div className="flex flex-row gap-5 pr-1">
      <img src="/img/HomePage-1.jpg" className=" object-contain w-24" alt="" />
      <div className="flex grow flex-col justify-between">
        <div className="flex flex-col">
          <div className="flex flex-row justify-between">
            <span className="text-xl font-medium">ZZ Plant</span>
            <button>
              <Trash2 strokeWidth={1} width={20} height={20} />
            </button>
          </div>
          <div className="m-0">
            <span className="text-sm uppercase">type | size</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold uppercase leading-5">$100</span>
          <div className="flex items-center justify-between w-28 px-2 py-1 text-base font-bold text-forest-green border-2 border-forest-green uppercase rounded-full">
            <button>
              <Minus strokeWidth={2} width={18} />
            </button>
            <span className="text-xl inline-block align-middle">1</span>
            <button>
              <Plus strokeWidth={2} width={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StylizedCartCard;
