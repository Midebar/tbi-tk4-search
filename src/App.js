import React, { useState } from "react";

const App = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://tbi-tk4-doc.duckdns.org/api/search/?query=${query}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "Arial", padding: "20px" }}>
      <h1>Search Engine</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your query..."
          style={{ padding: "10px", width: "300px" }}
        />
        <button onClick={handleSearch} style={{ padding: "10px", marginLeft: "10px" }}>
          Search
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <ul>
        {results.map((result, index) => (
          <li key={index} style={{ marginBottom: "15px" }}>
            <h3>{result.title}</h3>
            <p>{result.text}</p>
            <p>
              <strong>Score:</strong> {result.score.toFixed(2)} | <strong>Rank:</strong>{" "}
              {result.rank}
            </p>
            <a href={result.metadata.url} target="_blank" rel="noopener noreferrer">
              View Resource
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
