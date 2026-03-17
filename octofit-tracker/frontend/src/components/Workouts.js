import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getRowId = (item, index) => item.id || item._id || item.pk || `workout-${index}`;

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const apiUrl = process.env.REACT_APP_CODESPACE_NAME
          ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
          : 'http://localhost:8000/api/workouts/';
        console.log('Fetching Workouts from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Error fetching workouts: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Handle both paginated (.results) and plain array responses
        const workoutsList = data.results || data;
        console.log('Workouts fetched successfully:', workoutsList);
        setWorkouts(Array.isArray(workoutsList) ? workoutsList : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching workouts:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="loading-spinner">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading workouts...</p>
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

  const getDifficultyBadge = (difficulty) => {
    const levels = {
      'easy': 'bg-success',
      'medium': 'bg-warning text-dark',
      'hard': 'bg-danger'
    };
    return levels[difficulty?.toLowerCase()] || 'bg-secondary';
  };

  return (
    <div className="container mt-5 mb-5">
      <h2 className="section-heading">💪 Workouts</h2>
      
      {workouts.length === 0 ? (
        <div className="empty-state">
          <p>No workouts found.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout, index) => (
                <tr key={getRowId(workout, index)}>
                  <td><span className="badge bg-info">{workout.id || workout._id || workout.pk || '-'}</span></td>
                  <td><strong>{workout.name || '-'}</strong></td>
                  <td>
                    <span className={`badge ${getDifficultyBadge(workout.difficulty)}`}>
                      {workout.difficulty || 'N/A'}
                    </span>
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

export default Workouts;
