import React, { useState } from "react";

function FriendSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    console.log("Searching for:", query);
    // Replace with API call to search for friends
    // Example: const response = await axios.get(`/api/friends/search?query=${query}`);
    const mockResults = [
      { id: 1, name: "John Doe", phone: "+1234567890" },
      { id: 2, name: "Jane Smith", phone: "+9876543210" },
    ]; // Mock data
    setResults(mockResults);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Search for a Friend</h2>
      <input
        type="text"
        placeholder="Search by username or phone number"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <button onClick={handleSearch}>Search</button>
      <div style={{ marginTop: "20px" }}>
        {results.length > 0 ? (
          <ul>
            {results.map((friend) => (
              <li key={friend.id}>
                {friend.name} - {friend.phone}
              </li>
            ))}
          </ul>
        ) : (
          <p>No friends found.</p>
        )}
      </div>
    </div>
  );
}

export default FriendSearch;
