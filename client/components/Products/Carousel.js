import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default class Carousel extends Component {
  render() {
    const { product } = this.props;
    const imgs = product.imageUrl;
    console.log(imgs, "this is rpodcut");
    const settings = {
      dots: true,
      infinite: true,
      className: "max-w-2xl h-full",
      slidesToShow: 1,
      speed: 500,
      centerMode: false,
      swipeToSlide: true,
      // dotsClass: "text-red-200 slick-dots",
      centerPadding: "100px",
      arrows: true,
      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            dotsClass: "slick-dots",
          },
        },
      ],
      // appendDots: (dots) => (
      //   <div
      //     style={{
      //       width: "100px",
      //       top: "0px",
      //       bottom: "0px",
      //       left: "-4rem",
      //     }}
      //     className=""
      //   >
      //     <ul style={{ margin: "0px" }} className="flex flex-col gap-5">
      //       {dots}
      //     </ul>
      //   </div>
      // ),
      // customPaging: (i) => {
      //   return (
      //     <div
      //       style={{
      //         width: "50px",
      //         color: "blue",
      //         height: "50px",
      //         borderRadius: "100%",
      //         backgroundSize: "cover",
      //         backgroundImage: "url('/img/homePage-1.jpg')",
      //       }}
      //     ></div>
      //   );
      // },
    };

    return (
      <div>
        {imgs ? (
          <Slider {...settings}>
            <div
              className="min-h-[80vh] bg-cover bg-no-repeat"
              style={{ backgroundImage: `url(${imgs[0]})` }}
            >
              <h3>1</h3>
            </div>
            <div>
              <h3>2</h3>
            </div>
            <div>
              <h3>3</h3>
            </div>
            <div>
              <h3>4</h3>
            </div>
            <div>
              <h3>5</h3>
            </div>
            <div>
              <h3>6</h3>
            </div>
          </Slider>
        ) : null}
        {/* <Slider {...settings}>
          {imgs
            ? imgs.map((img, idx) => {
                console.log(img);
                return (
                  <div key={idx}>
                    <div
                      className="min-h-[80vh] bg-cover bg-no-repeat"
                      style={{ backgroundImage: `url('${img}')` }}
                    ></div>
                  </div>
                );
              })
            : null}
        </Slider> */}
      </div>
    );
  }
}
