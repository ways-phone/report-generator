import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Sidebar extends Component {
  props: {
    location: string
  };

  setActiveLink(linkName) {
    if (linkName === this.props.location) {
      return 'active';
    }
    return '';
  }

  render() {
    return (
      <nav className="navbar navbar-inverse sidebar" role="navigation">
        <div className="container-fluid">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle"
              data-toggle="collapse"
              data-target="#bs-sidebar-navbar-collapse-1"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <a className="navbar-brand">
              WAYS WTD<span
                style={{ fontSize: '16px' }}
                className="pull-right hidden-xs showopacity fa fa-calculator"
              />
            </a>
          </div>

          <div
            className="collapse navbar-collapse"
            id="bs-sidebar-navbar-collapse-1"
          >
            <ul className="nav navbar-nav">
              <li className={this.setActiveLink('Upload')}>
                <Link to="/">
                  Upload<span
                    style={{ fontSize: '16px' }}
                    className="pull-right hidden-xs showopacity fa fa-upload"
                  />
                </Link>
              </li>
              <li className={this.setActiveLink('CreateReport')}>
                <Link to="/create-report">
                  Create Report<span
                    style={{ fontSize: '16px' }}
                    className="pull-right hidden-xs showopacity fa fa-database"
                  />
                </Link>
              </li>
              <li className={this.setActiveLink('GenerateReport')}>
                <Link to="/generate-report">
                  Generate Report<span
                    style={{ fontSize: '16px' }}
                    className="pull-right hidden-xs showopacity fa fa-bar-chart"
                  />
                </Link>
              </li>
              <li className={this.setActiveLink('Outcomes')}>
                <Link to="/outcomes">
                  Outcomes<span
                    style={{ fontSize: '16px' }}
                    className="pull-right hidden-xs showopacity fa fa-certificate"
                  />
                </Link>
              </li>
              <li className={this.setActiveLink('KPI')}>
                <Link to="/kpi">
                  Campaign KPIs<span
                    style={{ fontSize: '16px' }}
                    className="pull-right hidden-xs showopacity fa fa-balance-scale"
                  />
                </Link>
              </li>

              {/* <li className="dropdown">
                <a className="dropdown-toggle" data-toggle="dropdown">
                  Settings <span className="caret" />
                  <span
                    style={{ fontSize: '16px' }}
                    className="pull-right hidden-xs showopacity glyphicon glyphicon-cog"
                  />
                </a>
                <ul className="dropdown-menu forAnimate" role="menu">
                  <li>
                    <a>Action</a>
                  </li>
                  <li>
                    <a>Another action</a>
                  </li>
                  <li>
                    <a>Something else here</a>
                  </li>
                  <li className="divider" />
                  <li>
                    <a>Separated link</a>
                  </li>
                  <li className="divider" />
                  <li>
                    <a>One more separated link</a>
                  </li>
                </ul>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
