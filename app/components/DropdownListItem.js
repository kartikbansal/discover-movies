import React from 'react';
import { getFormattedDate } from '../utils/helpers.js';
import ImageBox from "./ImageBox";

const DropdownListItem = ({ item, onSelect }) => (
  <li onClick={onSelect}>
    <ImageBox imgPath={`https://image.tmdb.org/t/p/w45/${item.poster_path}`} />
    {item.original_title} ({getFormattedDate(item.release_date).year})
  </li>
);

export default DropdownListItem;