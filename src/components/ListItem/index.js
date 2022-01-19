import React from "react";
import "./index.css";

const ListItem = ({
  id,
  url,
  name,
  image = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/2048px-Octicons-mark-github.svg.png",
  description,
  checked,
  listOnClick,
}) => {
  return (
    <div
      className="list-item-container"
      onClick={() => listOnClick(id)}
      style={{
        backgroundColor: checked ? "rgba(255,255,255, 0.5)" : "",
      }}
    >
      <div className="left">
        <img src={image} className="thumbnail" />
      </div>
      <div className="center">
        <h4>{name}</h4>
        <p>{description}</p>
      </div>
      <div className="right">
        <a href={url} target="_blank" rel="noreferrer">
          &#8250;
        </a>
      </div>
    </div>
  );
};

export default ListItem;
