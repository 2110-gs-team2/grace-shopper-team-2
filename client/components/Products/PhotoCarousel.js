import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default class PhotoCarousel extends Component {
  constructor() {
    super();
    this.state = {
      currentSlide: 0,
    };
  }
  render() {
    const { product } = this.props;
    const imgs = product.imageUrl;

    const settings = {
      dots: true,
      infinite: true,
      className: "md:pl-10 max-w-2xl h-full",
      slidesToShow: 1,
      speed: 500,
      centerMode: false,
      swipeToSlide: true,
      centerPadding: "100px",
      arrows: false,
      beforeChange: (prev, next) => {
        this.setState({ currentSlide: next });
      },
      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            dotsClass: "slick-dots",
          },
        },
      ],
      appendDots: (dots) => {
        return (
          <div style={{ top: "0px", bottom: "0px", left: "-4rem" }}>
            <ul style={{ margin: "0px" }} className="flex md:flex-col flex-row">
              {dots.map((item, index) => {
                return (
                  <li key={index} style={{ height: "90px", width: "100px" }}>
                    {item.props.children}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      },
      customPaging: (i) => {
        return (
          <div
            style={
              i === this.state.currentSlide
                ? {
                    borderColor: "#2D4323",
                    borderWidth: "2px",
                    width: "80px",
                    height: "80px",
                    borderRadius: "100%",
                    backgroundSize: "cover",
                    backgroundImage: `url(${imgs[i]})`,
                  }
                : {
                    width: "80px",
                    height: "80px",
                    borderRadius: "100%",
                    backgroundSize: "cover",
                    backgroundImage: `url(${imgs[i]})`,
                  }
            }
          ></div>
        );
      },
    };

    return (
      <div>
        {imgs ? (
          <Slider {...settings}>
            {imgs
              ? imgs.map((img, idx) => {
                  return (
                    <div key={idx}>
                      <div
                        className="min-h-[80vh] bg-cover bg-bottom bg-no-repeat"
                        style={{
                          backgroundImage: `url(${img})`,
                        }}
                      >
                        <span className="opacity-0">{idx}</span>
                      </div>
                    </div>
                  );
                })
              : null}
          </Slider>
        ) : null}
      </div>
    );
  }
}
