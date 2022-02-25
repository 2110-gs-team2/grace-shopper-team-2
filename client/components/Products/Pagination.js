import React, { useState } from "react";
import ProductCard from "./ProductCard";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

const Pagination = (props) => {
  //get data (products to render)
  const { currProducts } = props;

  //Step One: create 'slice' of items w/ logic to make a page

  //page setup
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(9);
  //index range setup
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  //Step Two: create selection html/logic to render a specific page

  // create page button #'s (get range from total product count & productsPerPage)
  const pageNumbers = [];
  const totalProducts = currProducts.length;
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }
  
  //reload is for the Skeleton module mapped within the return render
  const reloadArray = new Array(9).fill(0);

  return (
    <div className="md:col-span-3 col-span-4 bg-beige rounded-lg md:pl-5 ">
      <div className="flex flex-col md:grid md:grid-cols-3 gap-5 ">
        {currProducts.length
          ? currProducts
              .map((product) => (
                <ProductCard product={product} key={product.id} />
              ))
              .slice(indexOfFirstProduct, indexOfLastProduct)
            : reloadArray.map(elem => elem = <Skeleton count={9} baseColor="#dfe0e1" highlightColor="#FAFAFA"/>) 
          // : reloadArray.map(elem => elem = <img src="img/PageNotFound.jpg"></img>)
        }
      </div>
      <div className="flex justify-center">
        <ul className="flex flex-row justify-center">
          {/* Step Three: iterate over pageNumber array to create range of buttons to click on & set page number */}

          {currProducts.length
            ? pageNumbers.map((page, idx) => (
              //eval to change button color if on that page number (needs to be DRY when able)
              <li key={idx}>
                <button
                  id="pageButton"
                  onClick={() => {
                    setCurrentPage(page),
                      window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`${
                    currentPage === page
                      ? "bg-forest-green text-beige"
                      : "bg-beige text-forest-green"
                  } mt-6 mr-4 px-3 py-2 w-10 h-10 flex justify-center items-center align-middle border-2 border-forest-green rounded-full text-base font-bold`}
                >
                  {page}
                </button>
              </li>
          ))
            : null}
        </ul>
      </div>
    </div>
  );
};

export default Pagination;
