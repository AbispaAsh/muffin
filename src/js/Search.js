import React from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

function Search() {
  return (
    <div className="chat_search">
      <div className="chat_searchContainer">
        <SearchOutlinedIcon size="large" />
        <input type="text" placeholder="Search or start new chat" />
      </div>
    </div>
  );
}

export default Search;
