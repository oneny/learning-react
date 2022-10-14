import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const Star = ({ selected = false, onSelect = (f) => f }) => (
  <FaStar color={selected ? "red" : "grey"} onClick={onSelect} />
);

const createArray = (length) => [...Array(length)];

function StarRating({ totalStars = 5, selectedStars = 0, onRate = (f) => f }) {

  // StarRating에 추가한 onRate 핸들러에서 평점을 얻을 수 있다.
  return (
    <>
      {createArray(totalStars).map((n, i) => (
        <Star
          key={i}
          selected={selectedStars > i}
          onSelect={() => onRate(i + 1)}
        />
      ))}

      <p>
        {selectedStars} / {totalStars}
      </p>
    </>
  );
}

export default StarRating;
