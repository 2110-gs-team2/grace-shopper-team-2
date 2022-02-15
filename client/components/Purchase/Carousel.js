import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default class Carousel extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      className: "max-w-xl",
      infinite: true,
      slidesToShow: 1,
      speed: 500,
      slidesToScroll: 1,
      centerMode: false,
      swipeToSlide: true,
      dotsClass: "text-red-200 slick-dots",
      centerPadding: "100px",
      arrows: false,
      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            dotsClass: "slick-dots",
          },
        },
      ],
      appendDots: (dots) => (
        <div
          style={{
            width: "100px",
            top: "0px",
            bottom: "0px",
            left: "-4rem",
          }}
          className=""
        >
          <ul style={{ margin: "0px" }} className="flex flex-col gap-5">
            {dots}
          </ul>
        </div>
      ),
      customPaging: (i) => {
        return (
          <div
            style={{
              width: "50px",
              color: "blue",
              height: "50px",
              borderRadius: "100%",
              backgroundSize: "cover",
              backgroundImage: "url('/img/homePage-1.jpg')",
            }}
          ></div>
        );
      },
    };
    return (
      <div>
        <Slider {...settings}>
          <div>
            <div
              className="min-h-[70vh] bg-cover bg-no-repeat"
              style={{ backgroundImage: "url('/img/homePage-1.jpg')" }}
            ></div>
          </div>
          <div>
            <div
              className="min-h-[70vh] bg-cover bg-no-repeat"
              style={{ backgroundImage: "url(/img/FicusDanielle.jpeg)" }}
            ></div>
          </div>
          <div>
            <div
              className="min-h-[70vh] bg-cover bg-no-repeat"
              style={{ backgroundImage: "url(/img/spider-plant.jpeg)" }}
            ></div>
          </div>
          <div>
            <div
              className="min-h-[70vh] bg-cover bg-no-repeat"
              style={{ backgroundImage: "url(/img/spider-plant.jpeg)" }}
            ></div>
          </div>
          <div>
            <h3>6</h3>
          </div>
        </Slider>
      </div>
    );
  }
}
