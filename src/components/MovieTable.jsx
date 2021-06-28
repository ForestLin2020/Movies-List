import React, { Component } from "react";
import auth from "../services/authService";
import Table from "./common/table";
import Like from "./common/like";
import { Link } from "react-router-dom";

class MovieTable extends Component {
  // *** not in state={}, because this object is not going to change all the time.
  // simple property
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}> {movie.title} </Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like
          liked={movie.liked}
          onLikeHeart={() => this.props.onLike(movie)}
        />
      ),
    },
  ];

  deleteColumn = {
    key: "delete",
    content: (movie) => (
      <button
        className="btn btn-danger btn-sm"
        onClick={() => this.props.onDelete(movie)}
      >
        Detele
      </button>
    ),
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user) {
      this.columns.push(this.deleteColumn);
    }
  }

  render() {
    const { movies, onLike, onDelete, onSort, sortColume } = this.props;
    return (
      <Table
        columns={this.columns}
        onSort={onSort}
        sortColume={sortColume}
        movies={movies}
        onLike={onLike}
        onDelete={onDelete}
      />
    );
  }
}

export default MovieTable;
