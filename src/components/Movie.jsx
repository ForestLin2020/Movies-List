import React, { Component } from "react";

import { Link } from "react-router-dom";
import { getGenres } from "../services/genreService";
import { getMovies, deleteMovie } from "../services/movieService";

import "./Movie.css";

import Pagination from "./common/pagination_solution"; // import class_name
import ListGroup from "./common/listgroup";
import MovieTable from "./MovieTable";
import _ from "lodash";
import Search from "./common/search";

import { paginate } from "../utils/paginate"; // import { function_name }
import { toast } from "react-toastify";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    moviesPerPage: 4,
    pageSize: 4,
    searchQuery: "",
    currentGenre: null,
    // currentGenre:  {name: "All Genres"},         // ←　←　←　 + line 93
    sortColume: { path: "title", order: "asc" }, // asc or desc
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];

    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }

  // =============== My like icon solution (1) =============== //
  // constructor () {
  //     super();
  //     this.state.movies.map(m => m["heartStatus"]=true);
  // };

  // handleHeart = (movie) => {
  //     // console.log('Heart is touched.',movie._id);
  //     let movies = this.state.movies;
  //     const index = movies.indexOf(movie);
  //     movies[index].heartStatus = !movies[index].heartStatus;
  //     this.setState({movies});
  // };
  // ======================================================== //

  // =============== Instructor's like icon solution (1) =============== //
  handleLike = (movie) => {
    // console.log('heart is clicked.', movie)
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  // =================================================================== //

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const array = originalMovies.filter((m) => m._id !== movie._id); // return 回傳不等於movie_id的m._id
    this.setState({ movies: array });

    try {
      await deleteMovie(movie._id);
    } catch (err) {
      console.log("catch error");
      if (err.response && err.response.status === 404) {
        toast("This movie is already been deleted.");
        console.log("in toast block");
      }

      this.setState({ movies: originalMovies });
    }
  };

  handleGenreChange = (genre) => {
    this.setState({
      currentGenre: genre,
      currentPage: 1,
      searchQuery: "",
      movies: getMovies(),
    });
  };

  handlePaginate = (number) => {
    // console.log(number + ' is clicked.');
    this.setState({ currentPage: number });
  };

  handlePageChange = (page) => {
    // console.log(page + ' is clicked.');
    this.setState({ currentPage: page });
  };

  handleSort = (sortColume) => {
    this.setState({ sortColume });
  };

  handleNewMovieSaveButton = () => {
    console.log("handleNewMovieSaveButton is clicked.");
  };

  getPageData = () => {
    const {
      movies: allMovies,
      currentPage,
      pageSize,
      currentGenre,
      sortColume,
    } = this.state;

    const movieSort = _.orderBy(
      allMovies,
      [sortColume.path],
      [sortColume.order]
    );

    const movieGenres =
      currentGenre && currentGenre._id
        ? movieSort.filter((m) => m.genre._id === currentGenre._id)
        : movieSort;
    // const movieGenres = currentGenre.name==="All Genres" ? movieSort:movieSort.filter(m => m.genre.name == currentGenre.name );
    // console.log('currentGenre',currentGenre);            ↑↑↑ + line24

    // ======= my pagination solution ======= //
    // const currentPage = this.state.currentPage;
    // const moviesPerPage = this.state.moviesPerPage;

    // // Get current movies
    // const indexOfLastMovie = currentPage * moviesPerPage; // 1*4, 2*4, ...
    // const indexOfFirstMovie = indexOfLastMovie - moviesPerPage; // 4-4, 8-4, ...
    // const currentMovies = this.state.movies.slice(indexOfFirstMovie, indexOfLastMovie);

    // console.log('currentMovies', currentMovies)
    // ====================================== //
    const movies = paginate(movieGenres, currentPage, pageSize);

    return { movieGenres, movies };
  };

  handleSearch = ({ currentTarget: input }) => {
    // currentTarget: <input name="" type="" class="" value="" ...>
    // console.log("currentTarget", input.value);
    // console.log("movies", this.state.movies);

    const allMovies = this.state.movies;
    const keyWords = input.value;
    const tempMovies = allMovies.filter((movie) => {
      if (keyWords === "") {
        return movie;
      } else if (movie.title.toLowerCase().includes(keyWords.toLowerCase())) {
        return movie;
      }
    });

    this.setState({
      searchQuery: keyWords,
      movies: tempMovies,
      currentGenre: 1,
      currentGenre: null,
    });
  };

  render() {
    const {
      currentPage,
      pageSize,
      currentGenre,
      genres,
      sortColume,
      searchQuery,
    } = this.state;

    const { user } = this.props;

    const { movieGenres, movies } = this.getPageData();

    const count = movieGenres.length;

    // if (count === 0) return <p>There are no movies in the database.</p>;

    return (
      <React.Fragment>
        <div className="row">
          {/* ListGroup */}
          <div className="col-md-3">
            <ListGroup
              allGenres={genres}
              currentGenre={currentGenre}
              onGenreChange={this.handleGenreChange}
            />
          </div>
          {/* Main Area */}
          <div className="col-md-7">
            {user && (
              <Link className="btn btn-primary" to="/movies/new">
                New Movie
              </Link>
            )}

            <p>Showing {count} movies in the database.</p>
            <Search value={searchQuery} onSearch={this.handleSearch} />
            <MovieTable
              movies={movies}
              sortColume={sortColume}
              onSort={this.handleSort}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
            />

            {/* // ======= my pagination solution ======= // */}
            {/* <Pagination moviesPerPage={moviesPerPage} totalMovies={this.state.movies.length} onPaginate={this.handlePaginate} /> */}
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
