// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';
import debounce from 'lodash/debounce';

import { Button, Form, Header, Segment } from 'semantic-ui-react';

import GlobalFormFieldAccountName from '../../../../../../../../../shared/components/Global/Form/Field/AccountName';
import { checkAccountAvailability } from '../../../../../../../../../shared/actions/accounts';

class AccountSetupRecoverAccountName extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      accountName: props.account || '',
      valid: true,
    };
  }
  componentDidMount() {
    if (this.state.accountName) {
      const { network } = this.props;
      this.props.actions.checkAccountAvailability(this.state.accountName, network);
    }
  }
  onChange = debounce((e, { value, valid }) => {
    const { network } = this.props;
    if (valid) {
      this.props.actions.checkAccountAvailability(value, network);
    }
    this.setState({
      accountName: value,
      valid
    });
  }, 250)
  render() {
    const { system } = this.props;
    const { accountName, valid } = this.state;
    // Ensure account name exists
    const nameChecked = ['SUCCESS', 'FAILURE'].includes(system.ACCOUNT_AVAILABLE);
    let exists = false;
    if (accountName &&
        accountName.length !== 0 &&
        nameChecked &&
        system.ACCOUNT_AVAILABLE === 'FAILURE' &&
        system.ACCOUNT_AVAILABLE_LAST_ACCOUNT === accountName) {
      exists = true;
    }
    // If account is available and valid, allow proceeding to confirmation step
    const canProceed = (exists && valid);
    return (
      <Segment basic>
        <Header>
          Enter the account name to recover
          <Header.Subheader>
            The account name is displayed on the Owner Key Certificate under the heading <strong>ACCOUNT</strong>.
          </Header.Subheader>
        </Header>
        <Form style={{ margin: '2em 0 4em' }}>
          <Form.Field>
            <label>Account Name</label>
            <GlobalFormFieldAccountName
              autoFocus
              onChange={this.onChange}
              placeholder="Enter the account name..."
              value={accountName}
            />
          </Form.Field>
        </Form>
        <Button
          content="Continue"
          disabled={(!canProceed)}
          fluid
          onClick={() => this.props.onChangeAccount(accountName)}
          primary
          style={{ marginTop: '1em' }}
        />
        <Button
          content="Back to network selection"
          fluid
          icon="caret left"
          onClick={this.props.onBack}
          style={{ marginTop: '1em' }}
        />
      </Segment>
    );
  }
}

function mapStateToProps(state) {
  return {
    system: state.system,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      checkAccountAvailability
    }, dispatch)
  };
}

export default compose(
  withRouter,
  withTranslation('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(AccountSetupRecoverAccountName);
