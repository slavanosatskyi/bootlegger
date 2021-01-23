import React from "react";

const TaskDescription = ({
  cocktailTitle: title,
  cocktailImageUrl: imageUrl,
}) => {
  return (
    <div>
      <h2>{title}</h2>
      <div>
        <img src={imageUrl}></img>
      </div>
    </div>
  );
};

export default TaskDescription;
