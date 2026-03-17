import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getRowId = (item, index) => item.id || item._id || item.pk || `team-${index}`;

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const apiUrl = process.env.REACT_APP_CODESPACE_NAME
          ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
          : 'http://localhost:8000/api/teams/';
        console.log('Fetching Teams from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Error fetching teams: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Handle both paginated (.results) and plain array responses
        const teamsList = data.results || data;
        console.log('Teams fetched successfully:', teamsList);
        setTeams(Array.isArray(teamsList) ? teamsList : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching teams:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="loading-spinner">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading teams...</p>
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

  return (
    <div className="container mt-5 mb-5">
      <h2 className="section-heading">👥 Teams</h2>
      
      {teams.length === 0 ? (
        <div className="empty-state">
          <p>No teams found.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Team Name</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, index) => (
                <tr key={getRowId(team, index)}>
                  <td>
                    <span className="badge bg-warning text-dark">{team.id || team._id || team.pk || '-'}</span>
                  </td>
                  <td>
                    <strong>{team.name || '-'}</strong>
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

export default Teams;
