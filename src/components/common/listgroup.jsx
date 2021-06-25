import React from "react";

const ListGroup = ({
  allGenres,
  onGenreChange,
  textProperty,
  valueProperty,
  currentGenre,
}) => {
  //   console.log("currentGenre", currentGenre);
  // console.log("allGenres", allGenres); // name
  // console.log("textProperty", textProperty); // name
  // console.log("valueProperty", valueProperty); //_id
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

// What is defaultProps for ????
ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
