import React, { Component } from "react";
import _ from "underscore";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as actions from "../actions/action.kpi";
import CreateKPI from "../components/create-campaign";
import KpiTable from "../components/kpi-table";
import EdiTable from "../components/editable";
import Sidebar from "../components/sidebar";

class KpiPage extends Component {
  props: {
    addCampaignKPI: () => void,
    fetchCampaignKpis: () => void,
    updateCampaignKPI: campaign => void,
    deleteCampaignKPI: campaign => void,
    kpis: [],
    err: {},
    success: string
  };

  componentDidMount() {
    this.props.fetchCampaignKpis();
  }

  render() {
    return (
      <div>
        <Sidebar />
        <div className="body-container">
          <EdiTable
            update={this.props.updateCampaignKPI}
            delete={this.props.deleteCampaignKPI}
            data={_.sortBy(this.props.kpis, "name")}
            onSubmit={this.props.addCampaignKPI}
            errors={this.props.err}
            success={this.props.success}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.kpi;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(KpiPage);
