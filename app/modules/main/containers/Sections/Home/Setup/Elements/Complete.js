// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';

import { Button, Header, Segment } from 'semantic-ui-react';

import { changeModule } from '../../../../../actions/navigation';
import { createWallet } from '../../../../../actions/account';

class AccountSetupElementsComplete extends Component<Props> {
  state = {
    loading: false
  }
  onSkip = () => {
    const { accountcreate, actions, ledgerMethod } = this.props;
    const { account, chainId } = accountcreate;
    const { active, accountName } = account;
    this.setState({
      loading: true
    }, () => {
      // update storage
      actions.createWallet(chainId, accountName, active, ledgerMethod);
      setTimeout(() => {
          actions.changeModule('');
      }, 1000)
    })
  }
  render() {
    const { loading } = this.state
    const { accountcreate, actions, ledger, ledgerMethod } = this.props;
    const { accountName, chainId } = accountcreate.account;
    return (
      <Segment loading={loading} size="large">
        <Header size="large">
          Account successfully created!
        </Header>
        <p>
          The <strong>{accountName}</strong> account has been created on the <strong>{accountcreate.blockchain.name}</strong> blockchain.
        </p>
        {(ledgerMethod && ['all', 'recover'].includes(ledgerMethod))
          ? (
            <React.Fragment>
              <p>
                Anchor is now ready to use. If you need to recover your account, connect your Ledger device and import the owner permission.
              </p>
              <Button
                content="Finish"
                fluid
                onClick={this.onSkip}
                primary
              />
            </React.Fragment>
          )
          : false
        }
        {(!ledgerMethod || ['use'].includes(ledgerMethod))
          ? (
            <React.Fragment>
              <p>
                Now lets make sure your account is secured from computer failure by printing an owner key certificate.
              </p>
              <p>
                <Button
                  content="Create Backup"
                  fluid
                  icon="print"
                  onClick={() => actions.changeModule(`home/account/backup/${chainId}/${accountName}/true`)}
                  primary
                  size="large"
                />
              </p>
              <Button
                content="I'll do this later"
                fluid
                icon="cancel"
                onClick={this.onSkip}
              />
            </React.Fragment>
          )
          : false
        }
      </Segment>
    );
  }
}

function mapStateToProps(state) {
  return {
    accountcreate: state.accountcreate,
    ledger: state.ledger,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      changeModule,
      createWallet,
    }, dispatch)
  };
}

export default compose(
  withRouter,
  withTranslation('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(AccountSetupElementsComplete);
