// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Button } from 'semantic-ui-react';

import WalletModalUnlock from '../../Modal/Unlock';

class WalletPanelButtonUnlock extends Component<Props> {
  state = {
    password: '',
    open: false
  }

  onChange = (e, { value }) => this.setState({ password: value })

  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.onSubmit();
    }
  }

  onOpen = () => this.setState({ open: true });
  onClose = () => this.setState({ open: false });

  onSubmit = () => {
    const {
      unlockWallet
    } = this.props;
    const {
      password
    } = this.state;
    unlockWallet(password);
  }

  render() {
    const {
      buttonStyles,
      settings,
      t,
      validate
    } = this.props;
    const styles = Object.assign({}, {
      color: 'purple',
      content: t('wallet_panel_wallet_unlock'),
      icon: 'unlock',
    }, buttonStyles);
    const {
      open
    } = this.state;
    return (
      <WalletModalUnlock
        onChange={this.onChange}
        onKeyPress={this.onKeyPress}
        onClose={this.onClose}
        onSubmit={this.onSubmit}
        open={open}
        settings={settings}
        trigger={(
          <Button
            color="purple"
            content={styles.content}
            fluid={styles.fluid}
            floated={styles.floated}
            icon="unlock"
            onClick={this.onOpen}
            size={styles.size}
            style={styles.style}
          />
        )}
        validate={validate}
      />
    );
  }
}

export default withTranslation('wallet')(WalletPanelButtonUnlock);
