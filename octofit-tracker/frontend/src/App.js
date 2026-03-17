import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import Users from './components/Users';
import Activities from './components/Activities';
import Teams from './components/Teams';
import Leaderboard from './components/Leaderboard';
import Workouts from './components/Workouts';

function App() {
  console.log('OctoFit Tracker App initialized');
  console.log('Environment - REACT_APP_CODESPACE_NAME:', process.env.REACT_APP_CODESPACE_NAME);

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src="/octofitapp-small.png" alt="OctoFit Logo" />
              OctoFit Tracker
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">
                    Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    Leaderboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    Workouts
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <div className="container mt-5">
                  <div className="hero-section">
                    <h1 className="display-4">Welcome to OctoFit Tracker</h1>
                    <p className="lead">
                      Track your fitness activities, manage teams, and compete on the leaderboard!
                    </p>
                    <hr className="my-4" style={{ borderColor: 'rgba(255,255,255,0.3)' }} />
                    <p>Use the navigation menu above to explore different features.</p>
                  </div>

                  <div className="row mt-4">
                    <div className="col-md-6 mb-3">
                      <div className="card">
                        <div className="card-header">
                          <h5 className="mb-0">Getting Started</h5>
                        </div>
                        <div className="card-body">
                          <p>Explore the OctoFit Tracker to:</p>
                          <ul>
                            <li>View and manage user profiles</li>
                            <li>Log your daily activities and workouts</li>
                            <li>Create and manage fitness teams</li>
                            <li>Compete on the leaderboard</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="card">
                        <div className="card-header">
                          <h5 className="mb-0">Features</h5>
                        </div>
                        <div className="card-body">
                          <p>Experience our comprehensive fitness tracking system:</p>
                          <ul>
                            <li>Real-time activity tracking</li>
                            <li>Team management and collaboration</li>
                            <li>Competitive leaderboards</li>
                            <li>Personalized workout suggestions</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
            />
            <Route path="/users" element={<Users />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </div>

        <footer>
          <p>&copy; 2026 OctoFit Tracker. All rights reserved. | Track. Compete. Achieve.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
