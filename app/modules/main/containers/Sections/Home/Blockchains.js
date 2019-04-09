// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';

import { setSetting } from '../../../../../shared/actions/settings';

import GlobalBlockchainSetup from '../../../../../shared/containers/Global/Blockchain/Setup';

class HomeBlockchainsContainer extends Component<Props> {
  complete = () => this.props.actions.setSetting('walletInit', true)
  render() {
    const {
      settings,
    } = this.props;
    const chains = (settings.blockchains) ? settings.blockchains.length : 0;
    return (
      <Segment style={{ marginTop: 0 }}>
        <Header
          content="Setup Blockchains"
          subheader="Select which blockchains you would like to enable and use."
        />
        <Button
          content={(chains !== 0)
            ? `Enable ${chains} blockchains`
            : 'Choose a blockchain'
          }
          disabled={chains === 0}
          onClick={this.complete}
          primary={(chains !== 0)}
        />
        <GlobalBlockchainSetup />
      </Segment>
    );
  }
}

function mapStateToProps(state) {
  return {
    settings: state.settings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      setSetting
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeBlockchainsContainer));
