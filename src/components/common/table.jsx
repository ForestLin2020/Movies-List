import React from "react";
import TableHeader from "./tableheader";
import TableBody from "./tablebody";

const Table = ({ movies, onLike, onDelete, onSort, sortColume, columns }) => {
  return (
    <table className="table">
      <TableHeader onSort={onSort} sortColume={sortColume} columns={columns} />
      <TableBody
        data={movies}
        onLike={onLike}
        onDelete={onDelete}
        columns={columns}
      />
    </table>
  );
};

export default Table;
