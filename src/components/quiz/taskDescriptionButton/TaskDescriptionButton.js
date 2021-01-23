import React from "react";

import "./TaskDescriptionButton.scss";

const TaskDescriptionButton = (props) => {
  return (
    <button className="task-description-button" onClick={props.onClick}>
      <i className="fas fa-cocktail"></i>
    </button>
  );
};

export default TaskDescriptionButton;
