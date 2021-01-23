import React from "react";
import img from "../../../../images/cocktail-panel.jpg";

import "./SplashScreen.scss";

const SplashScreen = (props) => {
  const { className } = props;
  return (
    <div className={`${className} panel`}>
      <div className="panel__logo">
        <img data-testid="intro_image" src={img} alt="" />
      </div>
      <div className="panel__call-to-action">
        <p data-testid="intro_text" className="panel__text">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora
          iusto recusandae porro accusantium, vel temporibus excepturi quae
          facilis omnis vero molestias doloribus id obcaecati, deleniti, veniam
          quibusdam cupiditate explicabo voluptatem.
        </p>
        <button className="panel__button" onClick={props.onClick}>
          START
        </button>
      </div>
    </div>
  );
};

export default SplashScreen;
