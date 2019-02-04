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
  render() {
    const {
      blockchain,
      node,
    } = this.props;
    return (
      <Segment stacked>
        <Header>
          <GlobalFragmentChainLogo
            avatar
            chainId={blockchain.chainId}
          />
          <Header.Content>
            {blockchain.name}
            <Header.Subheader>
              Connected via {node}
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
