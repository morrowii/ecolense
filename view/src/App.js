
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import './App.css';
import Authentication from './components/Authentication.js';
import Sites from './components/Projects/Sites.js';
import SiteOverview from './components/Projects/SiteOverview';
import Inventory from './components/Inventory/Inventory.js';
import Navbar from './components/Navbar/Navbar.js';

class App extends Component {

  state = {
    isAuth: false,
    siteID: 1,
    studyYear: 2017
  };

  checkAuth = (status) => {
    this.setState({ isAuth: status });
  }

  handleLogout = () => {
    localStorage.removeItem("tkkn");
    this.setState({ isAuth: false });
    this.forceUpdate();
  }

  handleSiteID = (event) => {
    this.setState({ siteID: event.target.id });
  }

  handleStudyYear = (event) => {
    this.setState({ studyYear: event.target.id });
  }

  render() {
    return (
      <Router>
        <div className="App">
          {this.state.isAuth && <Navbar handleLogout={this.handleLogout} />}
          <header className="App-header">
          </header>
          <div>
            {!this.state.isAuth && <Route path="/" render={(props) => <Authentication {...props} checkAuth={this.checkAuth} />} />}
            {
              this.state.isAuth &&
              <div>
                <Route exact path="/" render={(props) => <Sites {...props} handleSiteID={this.handleSiteID} />} />
                <Route exact path="/site" render={(props) => <SiteOverview {...props} siteID={this.state.siteID} handleStudyYear={this.handleStudyYear} />} />
                <Route path="/inventory" render={(props) => <Inventory {...props} siteID={this.state.siteID} studyYear={this.state.studyYear} />} />
              </div>
            }
          </div>
          <footer className="footer">
          </footer>
        </div>
      </Router>
    )
  }
}

export default App;
