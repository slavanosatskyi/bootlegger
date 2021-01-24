import React from "react";
import img from "../../../../images/cocktail-panel.jpg";

import "./SplashScreen.scss";

const SplashScreen = (props) => {
  return (
    <div className="splash-screen">
      <div className="splash-screen__logo">
        <img data-testid="intro_image" src={img} alt="" />
      </div>
      <div className="splash-screen__call-to-action">
        <p data-testid="intro_text" className="splash-screen__text">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora
          iusto recusandae porro accusantium, vel temporibus excepturi quae
          facilis omnis vero molestias doloribus id obcaecati, deleniti, veniam
          quibusdam cupiditate explicabo voluptatem.
        </p>
        <button className="button splash-screen__button" onClick={props.onClick}>
          START
        </button>
      </div>
    </div>
  );
};

export default SplashScreen;
