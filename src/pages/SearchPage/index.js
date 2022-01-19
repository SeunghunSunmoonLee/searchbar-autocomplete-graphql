import React, { useState, useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import SearchBar from "components/SearchBar";
import debounce from "lib/debounce";
import "./index.css";
import SearchResult from "components/SearchResult";

const GET_GITHUB_REPOSITY = gql`
  query GetGithubRepository($query: String!) {
    search(query: $query, first: 20, type: REPOSITORY) {
      edges {
        node {
          ... on Repository {
            name
            description
            id
            url
          }
        }
      }
    }
  }
`;

function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [cache, setCache] = useState({});
  const [getGithubRepository, { loading, error, data }] =
    useLazyQuery(GET_GITHUB_REPOSITY);

  useEffect(() => {
    if (query !== "") {
      debounce(() => {
        getGithubRepository({ variables: { query } });
      }, 500)();
    }
  }, [query]);

  useEffect(() => {
    if (data) {
      const filteredData = data.search.edges.map((item) => {
        if (!cache[item.node.id]) {
          setCache((cache) => ({
            [item.node.id]: { ...item.node, checked: false },
            ...cache,
          }));
          return item.node;
        } else {
          return cache[item.node.id];
        }
      });
      setResults(filteredData);
    }
  }, [data, JSON.stringify(cache)]);

  const clearInput = () => {
    setResults([]);
    setQuery("");
  };

  const listOnClick = (id) => {
    setCache((cache) => ({
      ...cache,
      [id]: { ...cache[id], checked: !cache[id].checked },
    }));
  };

  return (
    <div className="searchPage">
      {loading && <div>Loading</div>}
      {error && <div>{`Error! ${error.message}`}</div>}
      <SearchBar
        value={query}
        placeholder="Search Github Repositories"
        results={results}
        onChange={(e) => setQuery(e.target.value)}
        clearInput={clearInput}
      />
      <SearchResult results={results} listOnClick={listOnClick} />
    </div>
  );
}

export default SearchPage;
