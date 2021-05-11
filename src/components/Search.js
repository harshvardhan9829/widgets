import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = () => {
  const [term, setTerm] = useState("wikipedia");
  const [results, setResults] = useState([]);


  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: term,
        },
      });

      setResults(data.query.search);
    };

    search();
  }, [term]);

  const renderedResults = results.map((result) => {
    return (
      <div className="item">
        <div className="content">
          <div className="header">{result.title}</div>
          {result.snippet}
        </div>
      </div>
    );
  });
  return (
    <div className="container">
      <div className="ui form">
        <label htmlFor="">Enter search term </label>
        <input
          onChange={(e) => setTerm(e.target.value)}
          value={term}
          type="text"
          className="input"
        />
      </div>
      <div className="ui celled list">{renderedResults}</div>
    </div>
  );
};

export default Search;
