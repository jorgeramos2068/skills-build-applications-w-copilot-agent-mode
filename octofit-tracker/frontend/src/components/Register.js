import React, { useState, useEffect } from 'react';

function Register() {
  const [formData, setFormData] = useState({ email: '', name: '', team: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [serverError, setServerError] = useState('');
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const apiUrl = process.env.REACT_APP_CODESPACE_NAME
          ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
          : 'http://localhost:8000/api/teams/';
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          const teamsList = data.results || data;
          setTeams(Array.isArray(teamsList) ? teamsList : []);
        }
      } catch (err) {
        // Teams list is optional; silently ignore fetch errors
      }
    };
    fetchTeams();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long.';
    }

    if (!formData.team.trim()) {
      newErrors.team = 'Team is required.';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setServerError('');

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      const apiUrl = process.env.REACT_APP_CODESPACE_NAME
        ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/register/`
        : 'http://localhost:8000/api/register/';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(`Registration successful! Welcome, ${data.user?.name || formData.name}!`);
        setFormData({ email: '', name: '', team: '' });
        setErrors({});
      } else {
        // Map server-side field errors back to the form
        const serverErrors = {};
        if (data.email) serverErrors.email = Array.isArray(data.email) ? data.email[0] : data.email;
        if (data.name) serverErrors.name = Array.isArray(data.name) ? data.name[0] : data.name;
        if (data.team) serverErrors.team = Array.isArray(data.team) ? data.team[0] : data.team;
        if (Object.keys(serverErrors).length > 0) {
          setErrors(serverErrors);
        } else {
          setServerError(data.detail || data.message || 'Registration failed. Please try again.');
        }
      }
    } catch (err) {
      setServerError('Unable to connect to the server. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h4 className="mb-0">📝 Register for OctoFit Tracker</h4>
            </div>
            <div className="card-body">
              {successMessage && (
                <div className="alert alert-success" role="alert">
                  {successMessage}
                </div>
              )}
              {serverError && (
                <div className="alert alert-danger" role="alert">
                  {serverError}
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    disabled={submitting}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Full Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    disabled={submitting}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="team" className="form-label">
                    Team <span className="text-danger">*</span>
                  </label>
                  {teams.length > 0 ? (
                    <select
                      className={`form-select ${errors.team ? 'is-invalid' : ''}`}
                      id="team"
                      name="team"
                      value={formData.team}
                      onChange={handleChange}
                      disabled={submitting}
                    >
                      <option value="">-- Select a team --</option>
                      {teams.map((t, idx) => (
                        <option key={t.id || t._id || idx} value={t.name}>
                          {t.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      className={`form-control ${errors.team ? 'is-invalid' : ''}`}
                      id="team"
                      name="team"
                      value={formData.team}
                      onChange={handleChange}
                      placeholder="Your team name"
                      disabled={submitting}
                    />
                  )}
                  {errors.team && (
                    <div className="invalid-feedback">{errors.team}</div>
                  )}
                </div>

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Registering…
                      </>
                    ) : (
                      'Register'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
