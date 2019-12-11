import React from "react";
import { timingSafeEqual } from "crypto";

class Card extends React.Component {
  clickComponent = event => {
    event.preventDefault();
    alert(this.props.name + " " + this.props.time);
  };

  render() {
    return (
      <div
        className="course-card"
        onClick={() =>
          this.props.clickComponent({
            name: this.props.name,
            id: this.props.id,
            time: this.props.time
          })
        }
      >
        <h2>{this.props.name}</h2>
        <div className="metaData">
          <p className="metaInfo">{this.props.department}</p>
          <p className="metaInfo">{this.props.time}</p>
          <p className="metaInfo">{this.props.location}</p>
        </div>
        <p>{this.props.description}</p>
      </div>
    );
  }
}

export default Card;
