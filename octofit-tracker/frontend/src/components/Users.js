import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getRowId = (item, index) => item.id || item._id || item.pk || `user-${index}`;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const apiUrl = process.env.REACT_APP_CODESPACE_NAME
          ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`
          : 'http://localhost:8000/api/users/';
        console.log('Fetching Users from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Error fetching users: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Handle both paginated (.results) and plain array responses
        const usersList = data.results || data;
        console.log('Users fetched successfully:', usersList);
        setUsers(Array.isArray(usersList) ? usersList : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="loading-spinner">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading users...</p>
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
      <h2 className="section-heading">👥 Users</h2>
      
      {users.length === 0 ? (
        <div className="empty-state">
          <p>No users found.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Team</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={getRowId(user, index)}>
                  <td>
                    <span className="badge bg-primary">{user.id || user._id || user.pk || '-'}</span>
                  </td>
                  <td>
                    <strong>{user.name || '-'}</strong>
                  </td>
                  <td>{user.email || '-'}</td>
                  <td>{user.team || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Users;
