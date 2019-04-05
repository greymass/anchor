// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { find } from 'lodash';
import ReactJson from 'react-json-view';
import { translate } from 'react-i18next';
import { Header, Icon, Segment } from 'semantic-ui-react';

import GlobalFragmentBlockchain from '../../../../../shared/components/Global/Fragment/Blockchain';
import GlobalFragmentChainLogo from '../../../../../shared/components/Global/Fragment/ChainLogo';

class OverviewBlockchainContainer extends Component<Props> {
  componentDidUpdate(prevProps, prevState) {
    Object.entries(this.props).forEach(([key, val]) =>
      prevProps[key] !== val && console.log(`Prop '${key}' changed`)
    );
  }
  render() {
    const {
      blockchain,
      node,
    } = this.props;
    if (!blockchain) return false;
    return (
      <Segment color="green">
        <Header>
          <GlobalFragmentChainLogo
            avatar
            chainId={blockchain.chainId}
          />
          <Header.Content style={{ overflow: 'hidden' }}>
            {blockchain.name}
            <Header.Subheader>
              {blockchain.chainId.substr(0, 8)}...{blockchain.chainId.substr(-8)}
            </Header.Subheader>

          </Header.Content>
        </Header>

      </Segment>
    );
  }
}

function mapStateToProps(state) {
  return {
    blockchain: find(state.blockchains, { chainId: state.settings.chainId }),
    node: state.connection.httpEndpoint,
    settings: state.settings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({

    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OverviewBlockchainContainer);
