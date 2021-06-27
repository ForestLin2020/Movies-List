import React from "react";

const ListGroup = ({
  allGenres,
  onGenreChange,
  textProperty,
  valueProperty,
  currentGenre,
}) => {
  return (
    <ul className="list-group">
      {allGenres.map((genre) => (
        <li
          onClick={() => onGenreChange(genre)}
          key={genre[valueProperty]}
          className={
            currentGenre === genre
              ? "list-group-item active clickable"
              : "list-group-item clickable"
          }
        >
          {genre[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
