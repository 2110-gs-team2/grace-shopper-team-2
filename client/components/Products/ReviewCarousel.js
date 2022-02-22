import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowLeft, ArrowRight } from "react-feather";

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className="w-12 h-12 bg-xlight-green rounded-full bg-opacity-70 hover:bg-opacity-100 flex justify-center items-center absolute top-1/2 -translate-y-1/2 z-20"
      onClick={onClick}
    >
      <ArrowLeft />
    </div>
  );
};

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className="w-12 h-12 bg-xlight-green rounded-full bg-opacity-70 hover:bg-opacity-100 flex justify-center items-center absolute right-0 top-1/2 -translate-y-1/2 z-20"
      onClick={onClick}
    >
      <ArrowRight />
    </div>
  );
};

export default class ReviewCarousel extends Component {
  constructor() {
    super();
    this.state = {
      currentSlide: 0,
    };
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      className: "mx-10",
      slidesToShow: 3,
      slidesToScroll: 1,
      speed: 500,
      centerMode: true,
      swipeToSlide: true,
      centerPadding: "60px",
      arrows: true,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      beforeChange: (prev, next) => {
        this.setState({ currentSlide: next });
      },
      appendDots: (dots) => (
        <div
          style={{
            padding: "10px",
            marginTop: "20px",
          }}
        >
          <ul
            style={{ margin: "0px" }}
            className="flex justify-center items-center "
          >
            {dots.map((item, index) => {
              return (
                <li
                  key={index}
                  className={`${
                    this.state.currentSlide === index ? "slick-active" : ""
                  } flex justify-center items-center`}
                >
                  {item.props.children}
                </li>
              );
            })}
          </ul>
        </div>
      ),
      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            dotsClass: "slick-dots",
          },
        },
      ],
    };

    return (
      <div>
        <div className="text-5xl mb-5 px-40">What our customers say</div>
        <Slider {...settings}>
          <div className="h-60 p-5">
            <div className="border-2 p-5 border-forest-green rounded-lg w-full h-full">
              <div className="text-lg">
                Asperiores aut et delectus eos blanditiis atque nostrum modi.
                Doloremque earum modi quia placeat.
              </div>
            </div>
          </div>
          <div className="h-60 p-5">
            <div className="border-2 p-5 border-forest-green rounded-lg w-full h-full">
              <div>
                Asperiores aut et delectus eos blanditiis atque nostrum modi.
                Doloremque earum modi quia placeat.
              </div>
            </div>
          </div>
          <div className="h-60 p-5">
            <div className="border-2 p-5 border-forest-green rounded-lg w-full h-full">
              <div>
                Asperiores aut et delectus eos blanditiis atque nostrum modi.
                Doloremque earum modi quia placeat.
              </div>
            </div>
          </div>
          <div className="h-60 p-5">
            <div className="border-2 p-5 border-forest-green rounded-lg w-full h-full">
              <div>
                Asperiores aut et delectus eos blanditiis atque nostrum modi.
                Doloremque earum modi quia placeat.
              </div>
            </div>
          </div>
        </Slider>
      </div>
    );
  }
}
