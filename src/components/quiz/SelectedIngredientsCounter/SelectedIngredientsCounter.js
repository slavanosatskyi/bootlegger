import React from "react";

import "./SelectedIngredientsCounter.scss";

export default class SelectedIngredientsCounter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      animation: 0,
    };

    this.handleAnimationEnd = this.handleAnimationEnd.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.selectedIngredientsCount !== this.props.selectedIngredientsCount
    ) {
      this.setState({ animation: 1 });
    }
  }

  handleAnimationEnd() {
    this.setState({ animation: 0 });
  }

  render() {
    const {
      selectedIngredientsCount: selected,
      ingredientsCount: total,
      className,
    } = this.props;

    const { animation } = this.state;

    return (
      <div
        className={`${className} counter`}
        animation={animation}
        onAnimationEnd={this.handleAnimationEnd}
      >
        {selected}/{total}
      </div>
    );
  }
}
