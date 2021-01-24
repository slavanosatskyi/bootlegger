import React from "react";

import "./TaskDescription.scss";

const TaskDescription = ({
  cocktailTitle: title,
  cocktailImageUrl: imageUrl,
}) => {
  return (
    <div>
      <h2 className="title">{title}</h2>
      <div className="cocktail-image">
        <img src={imageUrl}></img>
      </div>
    </div>
  );
};

export default TaskDescription;
