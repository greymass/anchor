// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Checkbox, Divider, Header, List, Segment } from 'semantic-ui-react';

import EOSAccount from '../../../../../utils/EOS/Account';

class GlobalModalAccountImportElementsAccountList extends Component<Props> {
  render() {
    const {
      accounts,
      connection,
      publicKey,
      selected,
      system,
      t,
      wallets,
    } = this.props;
    const matches = accounts.__lookups;
    const results = accounts.__results;

    const authorizations = {};

    matches.forEach((account) => {
      const data = accounts[account];
      if (data) {
        const authorizationList = new EOSAccount(data).getAuthorizations(publicKey);
        authorizationList.forEach((authorization) => {
          const existingWallet = wallets.find(wallet => authorization.perm_name === wallet.authorization &&
              account === wallet.account &&
              connection.chainId === wallet.chainId);
          if (!existingWallet) {
            authorizations[account] = authorizations[account] || [];
            authorizations[account].push(authorization);
          }
        });
      }
    });

    const hasAuthorizationsToDisplay = Object.values(authorizations).filter(authorizationList => authorizationList.length > 0).length > 0;

    return (
      <React.Fragment>
        {(publicKey && matches.length > 0 && hasAuthorizationsToDisplay)
          ? (
            <Segment stacked color="blue">
              <Header size="small">
                Accounts found to match key:
                <Header.Subheader>
                  {publicKey}
                </Header.Subheader>
              </Header>
              <List divided relaxed>
                {(matches.map((account) => {
                  if (authorizations[account]) {
                    return authorizations[account].map((authorization) => {
                      const auth = `${account}@${authorization.perm_name}`;
                      return (
                        <List.Item>
                          <Checkbox
                            checked={selected && selected.includes(auth)}
                            label={auth}
                            name={auth}
                            onChange={this.props.toggleAccount}
                            publicKey={publicKey}
                          />
                          {(results[publicKey] && results[publicKey].addresses && results[publicKey].addresses.length > 0)
                            ? (
                              <List style={{ marginLeft: '2em' }}>
                                <List.Header>Addresses</List.Header>
                                {results[publicKey].addresses.map((address) => (
                                  <List.Item>{address.fio_address}</List.Item>
                                ))}
                              </List>
                            )
                            : false
                          }
                        </List.Item>
                      );
                    });
                  }
                  return false;
                }))}
              </List>
            </Segment>
          )
          : false
        }
        {(publicKey && matches.length === 0 && system.ACCOUNT_BY_KEY === 'PENDING')
          ? <Segment loading />
          : false
        }
        {(publicKey && matches.length === 0 && system.ACCOUNT_BY_KEY === 'SUCCESS')
          ? (
            <Segment stacked color="red">
              <Header>
                {t('welcome:welcome_account_lookup_fail_title')}
              </Header>
              {t('welcome:welcome_account_lookup_fail_content')}
            </Segment>
          )
          : false
        }
        {(!publicKey)
          ? (
            <Segment>
              <p>{t('welcome:welcome_account_lookup_no_accounts')}</p>
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
    connection: state.connection,
    system: state.system,
    wallets: state.wallets,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({

    }, dispatch)
  };
}

export default compose(
  withTranslation(['global', 'welcome']),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalModalAccountImportElementsAccountList);
