import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getRowId = (item, index) => item.id || item._id || item.pk || `leaderboard-${index}`;

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const apiUrl = process.env.REACT_APP_CODESPACE_NAME
          ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
          : 'http://localhost:8000/api/leaderboard/';
        console.log('Fetching Leaderboard from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Error fetching leaderboard: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Handle both paginated (.results) and plain array responses
        const leaderboardList = data.results || data;
        console.log('Leaderboard fetched successfully:', leaderboardList);
        setLeaderboard(Array.isArray(leaderboardList) ? leaderboardList : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="loading-spinner">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="error-message">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  const getRankBadge = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  return (
    <div className="container mt-5 mb-5">
      <h2 className="section-heading">🏆 Leaderboard</h2>
      
      {leaderboard.length === 0 ? (
        <div className="empty-state">
          <p>No leaderboard data found.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="table table-hover">
            <thead>
              <tr>
                <th style={{ width: '10%' }}>Rank</th>
                <th style={{ width: '25%' }}>ID</th>
                <th style={{ width: '35%' }}>Team</th>
                <th style={{ width: '30%' }}>Points</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={getRowId(entry, index)} style={{
                  backgroundColor: index === 0 ? '#fff3cd' : index === 1 ? '#e8e8e8' : index === 2 ? '#ffe8d6' : 'transparent'
                }}>
                  <td>
                    <span className="badge bg-primary" style={{ fontSize: '1.1rem' }}>
                      {getRankBadge(index + 1)}
                    </span>
                  </td>
                  <td>
                    <span className="badge bg-secondary">{entry.id || entry._id || entry.pk || '-'}</span>
                  </td>
                  <td>
                    <span className="badge bg-info">{entry.team || '-'}</span>
                  </td>
                  <td>
                    <strong className="text-success" style={{ fontSize: '1.1rem' }}>
                      {entry.points ?? 0} pts
                    </strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
