import React from "react";
import ListItem from "components/ListItem";
import MediaQuery from "react-responsive";
import { desktopOrLaptop, tabletOrMobile } from "utils/ScreenSize";
import "./index.css";

export default function SearchResult(props) {
  const { results, listOnClick } = props;
  return (
    <>
      <MediaQuery maxWidth={tabletOrMobile}>
        <div className="search-result">
          {results?.map((item, index) => (
            <ListItem
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
              url={item.url}
              checked={item.checked}
              listOnClick={listOnClick}
            />
          ))}
        </div>
      </MediaQuery>
      <MediaQuery minWidth={desktopOrLaptop}>
        <div className="search-result">
          {results?.map((item, index) => (
            <ListItem
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
              url={item.url}
              checked={item.checked}
              listOnClick={listOnClick}
            />
          ))}
        </div>
      </MediaQuery>
    </>
  );
}
