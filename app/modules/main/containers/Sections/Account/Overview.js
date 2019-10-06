// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import {
  withRouter
} from 'react-router-dom';
import { Button, Container, Divider, Grid, Header, Icon, Progress, Segment, Table } from 'semantic-ui-react';

import AccountHeader from './Header';
import AccountOverviewRam from './Overview/Ram';
import AccountOverviewResource from './Overview/Resource';

import * as AccountsActions from '../../../../../shared/actions/accounts';
import * as NavigationActions from '../../../actions/navigation';

import GlobalAccountFragmentRamPercent from '../../../../../shared/containers/Global/Account/Fragment/Ram/Percent';
import GlobalAccountFragmentResourcePercent from '../../../../../shared/containers/Global/Account/Fragment/Resource/Percent';
import GlobalAccountFragmentResourceProgress from '../../../../../shared/containers/Global/Account/Fragment/Resource/Progress';
import GlobalAccountFragmentResourceStaked from '../../../../../shared/containers/Global/Account/Fragment/Resource/Staked';
import GlobalAccountFragmentResourceStakedDelegated from '../../../../../shared/containers/Global/Account/Fragment/Resource/Staked/Delegated';
import GlobalAccountFragmentResourceStakedSelf from '../../../../../shared/containers/Global/Account/Fragment/Resource/Staked/Self';
import GlobalAccountFragmentResourceUsage from '../../../../../shared/containers/Global/Account/Fragment/Resource/Usage';
import GlobalAccountFragmentResourceMax from '../../../../../shared/containers/Global/Account/Fragment/Resource/Max';
import GlobalAccountFragmentStaleness from '../../../../../shared/containers/Global/Account/Fragment/Staleness';
import GlobalAccountFragmentSystemTokenBalance from '../../../../../shared/containers/Global/Account/Fragment/SystemTokenBalance';
import GlobalAccountFragmentSystemTokenValue from '../../../../../shared/containers/Global/Account/Fragment/SystemTokenValue';
import GlobalAccountFragmentTokenBalance from '../../../../../shared/containers/Global/Account/Fragment/TokenBalance';
import GlobalAccountFragmentTokenDelegated from '../../../../../shared/containers/Global/Account/Fragment/TokenDelegated';
import GlobalAccountFragmentTokenRefunding from '../../../../../shared/containers/Global/Account/Fragment/TokenRefunding';
import GlobalAccountFragmentTokenStaked from '../../../../../shared/containers/Global/Account/Fragment/TokenStaked';
import GlobalAccountFragmentVoterInfoVotes from '../../../../../shared/containers/Global/Account/Fragment/VoterInfo/Votes';
import GlobalAccountFragmentVoterInfoEffectiveness from '../../../../../shared/containers/Global/Account/Fragment/VoterInfo/Effectiveness';
import GlobalAccountFragmentVoterInfoWeightValue from '../../../../../shared/containers/Global/Account/Fragment/VoterInfo/WeightValue';
import GlobalAccountFragmentVoterInfoProxy from '../../../../../shared/containers/Global/Account/Fragment/VoterInfo/Proxy';

class AccountOverview extends Component<Props> {
  constructor(props) {
    super(props);
    const account = props.match.params.account_name;
    const loaded = (
      Object.keys(this.props.accounts).includes(account)
      && Object.keys(this.props.balances).includes(account)
    );
    this.state = {
      account,
      expanded: {},
      loaded,
    };
  }
  componentDidMount() {
    const { account } = this.state;
    if (
      // Missing account
      !Object.keys(this.props.accounts).includes(account)
      // Missing balance
      || !Object.keys(this.props.balances).includes(account)
    ) {
      this.props.actions.getAccount(account);
    }
  }
  componentDidUpdate(prevProps) {
    const { settings } = this.props;
    // If the user changes the current account, change the UI
    if (
      settings.account !== prevProps.settings.account
      || settings.chainId !== prevProps.settings.chainId
    ) {
      this.setState({
        account: settings.account,
        loaded: false,
      }, () => this.props.actions.changeModule(`account/${settings.account}`));
    }
    // Let the UI know when the account is loaded
    const { loaded } = this.state;
    if (!loaded) {
      const { accounts, balances } = this.props;
      if (
        Object.keys(accounts).includes(settings.account)
        && Object.keys(balances).includes(settings.account)
      ) {
        this.setState({ loaded: true });
      }
    }
  }
  toggleExpand = (e, { name }) => {
    this.setState({
      expanded: Object.assign({}, this.state.expanded, {
        [name]: !this.state.expanded[name]
      })
    });
  }
  refresh = () => {
    const { getAccount } = this.props.actions;
    getAccount(this.state.account);
  }
  render() {
    const {
      t
    } = this.props;
    const {
      account,
      expanded,
      loaded,
    } = this.state;
    if (!account || account === 'undefined') {
      return (
        <Segment>
          <Header>
            Select an account
            <Header.Subheader>

            </Header.Subheader>
          </Header>
        </Segment>
      )
    }
    return (
      <React.Fragment>
        <Container fluid clearing>
          <Button
            basic
            color="grey"
            content="Refresh"
            floated="right"
            icon="refresh"
            onClick={this.refresh}
          />
          <Header
            content="Resource Overview"
            subheader="Overview of resources for the selected account."
            style={{ margin: 0 }}
          />
        </Container>
        {(loaded)
          ? (
            <React.Fragment>
              <AccountHeader
                account={account}
              />
              <AccountOverviewRam
                account={account}
              />
              <AccountOverviewResource
                account={account}
                resource="cpu"
              />
              <AccountOverviewResource
                account={account}
                resource="net"
              />
            </React.Fragment>
          )
          : false
        }
        {(!loaded)
          ? (
            <Segment>
              <Header icon size="large" textAlign="center">
                <Icon
                  loading
                  name="circle notched"
                />
                Loading Account Data...
                <Header.Subheader
                  content="The data for this account is being fetched from an API server."
                />
              </Header>
            </Segment>
          )
          : false
        }
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    balances: state.balances,
    connection: state.connection,
    resources: state.resources,
    settings: state.settings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...NavigationActions,
      ...AccountsActions,
    }, dispatch)
  };
}

export default compose(
  withRouter,
  translate('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(AccountOverview);
