// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';
import { find } from 'lodash';

import { Button, Card, Header, Segment } from 'semantic-ui-react';

import GlobalFragmentChainLogo from '../../../../../../../../../shared/components/Global/Fragment/ChainLogo';

const supportedChains = [
  // EOS
  'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
  // FIO
  // '21dcae42c0182200e93f954a074011f9048a7624c6fe81d3c9541a614a88bd1c',
  // TELOS
  '4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11',
  // PROTON
  '384da888112027f0321850a169f737c33e53b388aad48b5adace4bab97f437e0',
  // WAX
  '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4',
  // Jungle 3
  '2a02a0053e5a8cf73a56ba0fda11e4d92e0238a4a2aa74fccf46d5a910746840',
];

class AccountSetupRecoverNetwork extends Component<Props> {
  render() {
    const {
      blockchains,
    } = this.props;
    return (
      <Segment basic>
        <Header>
          Select the network of the account to recover
          <Header.Subheader>
            The network is displayed on the Owner Key Certificate under the heading <strong>NETWORK</strong>.
          </Header.Subheader>
        </Header>
        <Segment basic padded textAlign="center">
          <p>Click the blockchain that matches what is displayed on your owner key certificate.</p>
          <Card.Group style={{
              'align-items': 'center',
              'justify-content': 'center',
            }}
          >
            {supportedChains.map(chainId => {
              const blockchain = find(blockchains, { chainId });
              return (
                <Card
                  onClick={() => this.props.onChangeNetwork(blockchain.chainId)}
                  raised
                  style={{
                    maxWidth: '96px',
                    width: 'auto'
                  }}
                >
                  <GlobalFragmentChainLogo
                    chainId={blockchain.chainId}
                    noPopup
                    style={{
                      background: 'white',
                      padding: '6px',
                      width: '96px'
                    }}
                  />
                  <Card.Content style={{ borderTop: 'none' }}>
                    <Card.Header>
                      {blockchain.name.replace('(EOS Testnet)', '')}
                    </Card.Header>
                  </Card.Content>
                </Card>
              );
            })}
          </Card.Group>
        </Segment>
        <Button
          content="Back"
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
    blockchains: state.blockchains,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({

    }, dispatch)
  };
}

export default compose(
  withRouter,
  withTranslation('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(AccountSetupRecoverNetwork);
