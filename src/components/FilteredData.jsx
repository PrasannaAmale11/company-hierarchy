import React from "react";
import Node from "./Node";

const FilteredData = ({ data, visibilityMap, toggleVisibility, openModal }) => {
  return (
    <ul>
      {data.children.map((department, index) => (
        <Node
          key={index}
          node={department}
          visibilityMap={visibilityMap}
          toggleVisibility={toggleVisibility}
          openModal={openModal}
        />
      ))}
    </ul>
  );
};

export default FilteredData;
