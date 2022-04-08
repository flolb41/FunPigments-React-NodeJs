import React, { FunctionComponent } from "react";

const Search: FunctionComponent = () => {
  return (
    <div>
      <div className="nav-wrapper">
        <form>
          <div className="input-field">
            <input id="search" type="search" required />
            <label className="label-icon" htmlFor="search">
              <i className="material-icons"></i>
            </label>
            <i className="material-icons">close</i>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Search;
