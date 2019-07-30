// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { map } from 'lodash';
import { Header, Segment, Tab } from 'semantic-ui-react';

import GlobalFormFieldAccount from '../../../../../components/Global/Form/Field/Account';
import GlobalFormFieldPublicKeys from '../../../../../components/Global/Form/Field/PublicKeys';

class GlobalModalAccountImportContractsSetupAccount extends Component<Props> {
  state = {
    account: '',
    active: false,
    owner: false,
    valid: {},
  }
  onChange = (e, { name, value, valid }) => this.setState({
    [name]: value,
    valid: Object.assign({}, this.state.valid, { [name]: valid })
  })
  render() {
    const {
      pubkeys,
      t,
    } = this.props;
    const {
      active,
      account,
      owner,
      valid
    } = this.state;
    const isUnique = true;
    const isValid = (
      Object.values(valid).every(v => v)
      && active && owner && account
      && isUnique
    );
    console.log(isValid)
    return (
      <Tab.Pane>
        <Segment basic>
          <GlobalFormFieldAccount
            fluid
            label="Desired Account Name"
            name="account"
            onChange={this.onChange}
            rules="generic"
          />
          <GlobalFormFieldPublicKeys
            excluded={[active]}
            label="Owner Key"
            name="owner"
            onChange={this.onChange}
            pubkeys={pubkeys}
          />
          <GlobalFormFieldPublicKeys
            excluded={[owner]}
            label="Active Key"
            name="active"
            onChange={this.onChange}
            pubkeys={pubkeys}
          />
          <p>Instructions on how this works.</p>
          <p>Form to create a new memo for use within the smart contract:</p>
          <p>1) Search for an available account name.</p>
          <p>2) Select a public key from storage to use for active.</p>
          <p>3) Select a public key from storage to use for owner.</p>
          <p>4) Click Generate Memo, which creates the string the user needs to use as the memo.</p>
          <p>5) Instructions on withdrawing from an exchange to the `setupaccount` account name with the memo that was just generated for them.</p>
        </Segment>
      </Tab.Pane>
    );
  }
}


function mapStateToProps(state) {
  return {
    pubkeys: {
      available: state.storage.keys,
      unlocked: map(state.auths.keystore, 'pubkey')
    },
    settings: state.settings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
    }, dispatch)
  };
}

export default compose(
  translate('global', {
    withRef: true
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalModalAccountImportContractsSetupAccount);
