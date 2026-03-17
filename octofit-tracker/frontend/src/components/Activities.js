import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getRowId = (item, index) => item.id || item._id || item.pk || `activity-${index}`;

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const apiUrl = process.env.REACT_APP_CODESPACE_NAME
          ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
          : 'http://localhost:8000/api/activities/';
          
        console.log('Fetching Activities from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Error fetching activities: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Handle both paginated (.results) and plain array responses
        const activitiesList = data.results || data;
        console.log('Activities fetched successfully:', activitiesList);
        setActivities(Array.isArray(activitiesList) ? activitiesList : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching activities:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="loading-spinner">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading activities...</p>
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
      <h2 className="section-heading">🏃 Activities</h2>
      
      {activities.length === 0 ? (
        <div className="empty-state">
          <p>No activities found.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>User Email</th>
                <th>Activity Type</th>
                <th>Duration (min)</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, index) => (
                <tr key={getRowId(activity, index)}>
                  <td>
                    <span className="badge bg-info">{activity.id || activity._id || activity.pk || '-'}</span>
                  </td>
                  <td>
                    <strong>{activity.user_email || '-'}</strong>
                  </td>
                  <td><span className="badge bg-success">{activity.activity_type || '-'}</span></td>
                  <td>{activity.duration ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Activities;
