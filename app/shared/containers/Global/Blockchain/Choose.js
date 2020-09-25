// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';

import { Form, Header, Segment } from 'semantic-ui-react';

import { setSetting } from '../../../actions/settings';

import GlobalBlockchainDropdown from './Dropdown';

class GlobalBlockchainChoose extends Component<Props> {
  state = {
    showTestnets: false
  }
  onChange = (e, { checked }) => this.setState({ showTestnets: checked })
  onSwap = (chainId) => {
    const {
      actions,
      history,
    } = this.props;
    actions.setSetting('blockchains', [chainId]);
    history.push('');
  }
  render() {
    const {
      t,
    } = this.props;
    const {
      showTestnets
    } = this.state;
    return (
      <Segment style={{ marginTop: 0 }}>
        <Header
          content={t('global_blockchain_choose_header')}
          subheader={t('global_blockchain_choose_subheader')}
          size="large"
          style={{ marginTop: 0 }}
        />
        <Segment basic padded="very" textAlign="center">
          <Form>
            <Form.Field>
              <GlobalBlockchainDropdown
                initialize
                onSwap={this.onSwap}
                search
                selection
                showTestnets={showTestnets}
                style={{ width: '30em' }}
              />
            </Form.Field>
            <Form.Field>
              <Form.Checkbox
                label={t('global_blockchain_choose_show_testnets')}
                onChange={this.onChange}
              />
            </Form.Field>
          </Form>
        </Segment>
      </Segment>
    );
  }
}

function mapStateToProps(state) {
  return {
    blockchains: state.blockchains,
    navigation: state.navigation,
    settings: state.settings,
    wallets: state.wallets
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      setSetting,
    }, dispatch)
  };
}

export default compose(
  withTranslation('global'),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalBlockchainChoose);
