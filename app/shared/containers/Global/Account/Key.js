// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Button, Header, Modal, Segment } from 'semantic-ui-react';
import { find } from 'lodash';

import GlobalButtonElevate from '../Button/Elevate';
import GlobalFormFieldKeyPrivate from '../../../components/Global/Form/Field/Key/Private';

import { decrypt } from '../../../actions/wallet';
import * as WalletActions from '../../../actions/wallet';

const CryptoJS = require('crypto-js');
const ecc = require('eosjs-ecc');

class GlobalAccountKey extends Component<Props> {
  unlock = (password) => {
    const {
      actions,
      pubkey,
    } = this.props;
    actions.unlockByKey(pubkey, password);
  }
  render() {
    const {
      auth,
      connection,
      settings,
      t,
      validate,
    } = this.props;
    let wif;
    if (auth) {
      const {
        hash,
        key
      } = auth;
      if (hash && key) {
        wif = decrypt(key, hash, 1).toString(CryptoJS.enc.Utf8);
      }
    }
    return (
      <Modal
        closeIcon
        onClose={this.props.onClose}
        open
        size
      >
        <Modal.Header>
          <Header
            content={t('global_account_key_modal_header')}
            icon="id card"
            subheader={t('global_account_key_modal_subheader')}
          />
        </Modal.Header>
        <Modal.Content>
          {(auth)
            ? (
              <Segment basic padded>
                <GlobalFormFieldKeyPrivate
                  autoFocus
                  connection={connection}
                  label={t('global_account_import_private_key')}
                  name="key"
                  placeholder={t('welcome:welcome_key_compare_placeholder')}
                  qr
                  value={wif}
                />
              </Segment>
            )
            : (
              <Segment basic padded textAlign="center">
                <GlobalButtonElevate
                  onSuccess={(password) => this.unlock(password)}
                  settings={settings}
                  trigger={(
                    <Button
                      content={t('wallet:wallet_panel_wallet_unlock')}
                      primary
                    />
                  )}
                  validate={validate}
                />
              </Segment>
            )
          }
        </Modal.Content>
      </Modal>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { pubkey } = ownProps;
  const { auths } = state;
  const auth = find(auths.keystore, { pubkey });
  return {
    auth,
    connection: state.connection,
    settings: state.settings,
    validate: state.validate,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...WalletActions,
    }, dispatch)
  };
}

export default compose(
  withTranslation(['global', 'wallet']),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalAccountKey);
