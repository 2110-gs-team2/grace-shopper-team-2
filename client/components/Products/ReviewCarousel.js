import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowLeft, ArrowRight, Check } from "react-feather";
import Ratings from "./Ratings";

const PrevArrow = ({ onClick }) => {
  return (
    <div
      className="w-12 h-12 bg-xlight-green rounded-full bg-opacity-70 hover:bg-opacity-100 flex justify-center items-center absolute top-1/2 -translate-y-1/2 z-10"
      onClick={onClick}
    >
      <ArrowLeft />
    </div>
  );
};

const NextArrow = ({ onClick }) => {
  return (
    <div
      className="w-12 h-12 bg-xlight-green rounded-full bg-opacity-70 hover:bg-opacity-100 flex justify-center items-center absolute right-0 top-1/2 -translate-y-1/2 z-10"
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
    const { reviews } = this.props;
    const settings = {
      dots: true,
      infinite: true,
      className: "",
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
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            arrows: false,
            centerPadding: "30px",
            dotsClass: "slick-dots",
          },
        },
      ],
    };

    return (
      <div className="md:my-0 my-10">
        <div className="text-5xl mb-5 md:px-40 px-10">
          What our customers say
        </div>
        <Slider {...settings}>
          {reviews.map((review) => {
            return (
              <div className="md:p-5 p-2" key={review.id}>
                <div className="min-h-[300px]  mb-3 border-2 p-5 border-forest-green rounded-lg w-full h-auto flex flex-col justify-between gap-5">
                  <div className="flex flex-col">
                    <div className="text-lg">{review.reviewText}</div>
                    <Ratings rating={review.rating} starDimension="15px" />
                  </div>

                  <div className="flex flex-col">
                    <div className="flex flex-row items-center gap-2">
                      <div className="text-md font-bold uppercase">
                        {review.user.firstName} {review.user.lastName}
                      </div>
                      <div className="w-5 h-5 p-1  flex items-center justify-center bg-forest-green rounded-full">
                        <Check className="text-white" />
                      </div>
                    </div>
                    <div className="text-sm">Verified buyer</div>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    );
  }
}
