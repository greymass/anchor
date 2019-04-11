// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Card, Header, Icon, Label, Segment } from 'semantic-ui-react';
import { sortBy } from 'lodash';

import { setSetting } from '../../../actions/settings';
import { swapBlockchain } from '../../../actions/blockchains';
import { changeModule } from '../../../../modules/main/actions/navigation';


import GlobalFragmentChainLogo from '../../../components/Global/Fragment/ChainLogo';
import ToolsModalBlockchain from '../../../components/Tools/Modal/Blockchain';
import GlobalBlockchainForm from './Form';
import GlobalBlockchainEnable from './Manage/Enable';

class GlobalBlockchainManage extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      enabling: (props.settings.blockchains.length === 0),
    }
  }
  enableBlockchains = () => this.setState({ enabling: !this.state.enabling })
  editBlockchain = (e, { chainId }) => {
    this.setState({ editing: chainId });
    e.stopPropagation();
    return false;
  }
  editBlockchainComplete = () => this.setState({ editing: false })
  swapBlockchain = (chainId) => {
    this.props.actions.swapBlockchain(chainId);
    // Route to homepage
    this.props.actions.changeModule('');
  }
  render() {
    const {
      blockchains,
      settings,
      wallets,
    } = this.props;
    const {
      editing,
      enabling,
    } = this.state;
    const filtered = blockchains.filter(b => (settings.blockchains.includes(b.chainId)));
    const sorted = sortBy(filtered, ['testnet', 'name'], ['asc', 'asc']);
    if (editing) {
      return (
        <Segment style={{ marginTop: 0 }}>
          <GlobalBlockchainForm
            blockchain={editing}
            onCancel={this.editBlockchainComplete}
            onSubmit={this.editBlockchainComplete}
          />
        </Segment>
      );
    }
    if (enabling || !settings.walletInit) {
      return (
        <Segment style={{ marginTop: 0 }}>
          <GlobalBlockchainEnable
            onEdit={this.editBlockchain}
            onComplete={this.enableBlockchains}
          />
        </Segment>
      );
    }
    return (
      <Segment style={{ marginTop: 0 }}>
        <Header
          content="Select which blockchain you'd like to use"
          subheader="You can easily switch between blockchains using the dropdown menu in the upper left menu."
          style={{ marginTop: 0 }}
        />
        <Card.Group>
          {sorted.map((blockchain) => {
            const accounts = wallets.filter(w => (w.chainId === blockchain.chainId)).length;
            return (
              <Card
                onClick={() => this.swapBlockchain(blockchain.chainId)}
                raised
                style={{ width: '12em' }}
              >
                <GlobalFragmentChainLogo
                  chainId={blockchain.chainId}
                  noPopup
                  style={{ height: '12em', width: '12em' }}
                />
                <Card.Content>
                  <Card.Header>{blockchain.name}</Card.Header>
                  <Card.Meta>
                    <span>
                      <strong>{accounts}</strong> accounts
                    </span>
                  </Card.Meta>
                </Card.Content>
                <Card.Content extra>
                  <Button
                    chainId={blockchain.chainId}
                    floated="right"
                    icon="settings"
                    onClick={this.editBlockchain}
                    size="small"
                  />
                </Card.Content>
              </Card>
            );
          })}
          <Card
            onClick={this.enableBlockchains}
            raised
            style={{ width: '12em' }}
          >

            <Segment
              basic
              textAlign="center"
              style={{
                height: '12em',
                marginBottom: 0,
                width: '12em',
              }}
            >
              <Icon
                centered
                name="cubes"
                size="massive"
                style={{ marginTop: '0.15em' }}
              />
            </Segment>
            <Card.Content>
              <Card.Header>Add/Remove</Card.Header>
              <Card.Description>
                Manage which blockchains Anchor is configured to interact with.
              </Card.Description>
            </Card.Content>
          </Card>
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
      changeModule,
      setSetting,
      swapBlockchain,
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GlobalBlockchainManage));
