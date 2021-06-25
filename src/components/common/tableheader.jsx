import React, { Component } from "react";
import { FaSortDown, FaSortUp } from "../../../node_modules/react-icons/fa";

class TableHeader extends Component {
  // pass stuff
  // columes: path and label  (combine all <th>content</th> in an object)
  // sortColume: object   (this.props ...)
  // onSort: function     (this.props ...)

  raiseSort = (path) => {
    const tempSortColume = { ...this.props.sortColume };
    // console.log('this.props.sortColume',this.props.sortColume);
    // console.log('tempSortColume',tempSortColume);

    // tempSortColume.path = tempSortColume.path !== path ? path : tempSortColume.order = 'asc';
    if (tempSortColume.path === path) {
      tempSortColume.order = "desc";
    } else {
      tempSortColume.path = path;
      tempSortColume.order = "asc";
    }

    this.props.onSort(tempSortColume);
    console.log("tempSortColume", tempSortColume);
  };

  sortIcon = (column) => {
    const { sortColume } = this.props;
    if (column.path !== sortColume.path) return null;
    if (sortColume.order === "asc")
      return <FaSortUp style={{ cursor: "pointer" }} />;
    if (sortColume.order === "desc")
      return <FaSortDown style={{ cursor: "pointer" }} />;
  };

  render() {
    const { columns } = this.props;
    return (
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              className="clickable"
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label}
              {this.sortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
