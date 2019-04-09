// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Card, Header, Segment } from 'semantic-ui-react';
import { sortBy } from 'lodash';

import { setSetting } from '../../../../../shared/actions/settings';
import { swapBlockchain } from '../../../../../shared/actions/blockchains';

import GlobalFragmentChainLogo from '../../../../../shared/components/Global/Fragment/ChainLogo';

class HomeBlockchainContainer extends Component<Props> {
  swapBlockchain = (chainId) => this.props.actions.swapBlockchain(chainId)
  render() {
    const {
      blockchains,
      settings,
      wallets,
    } = this.props;
    const filtered = blockchains.filter(b => (settings.blockchains.includes(b.chainId)));
    const sorted = sortBy(filtered, ['testnet', 'name'], ['asc', 'asc']);
    return (
      <Segment style={{ marginTop: 0 }}>
        <Header
          content="Select"
          subheader="Select the blockchain you'd like to use."
        />
        <Card.Group>
          {sorted.map((blockchain) => {
            const accounts = wallets.filter(w => (w.chainId === blockchain.chainId)).length;
            return (
              <Card
                extra={(
                  <Button
                    content="Connect"
                    fluid
                    onClick={() => this.swapBlockchain(blockchain.chainId)}
                    primary
                  />
                )}
                header={blockchain.name}
                meta={(
                  <span>
                    <strong>{accounts}</strong> accounts
                  </span>
                )}
                image={(
                  <GlobalFragmentChainLogo
                    chainId={blockchain.chainId}
                    noPopup
                    style={{ height: '12em', width: '12em' }}
                  />
                )}
                raised
                style={{ width: '12em' }}
              />
            );
          })}
        </Card.Group>
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
      swapBlockchain,
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeBlockchainContainer));
