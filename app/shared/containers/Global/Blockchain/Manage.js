// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';

import { Button, Card, Header, Icon, Segment } from 'semantic-ui-react';
import { sortBy } from 'lodash';

import { setSetting } from '../../../actions/settings';
import { pinBlockchain, swapBlockchain, unpinBlockchain } from '../../../actions/blockchains';
import { changeModule } from '../../../../modules/main/actions/navigation';

import GlobalFragmentChainLogo from '../../../components/Global/Fragment/ChainLogo';
import GlobalBlockchainForm from './Form';
import GlobalBlockchainEnable from './Manage/Enable';

class GlobalBlockchainManage extends Component<Props> {
  constructor(props) {
    super(props);
    const chainId = (props.match && props.match.params && props.match.params.chain_id)
      ? props.match.params.chain_id
      : false;
    this.state = {
      editing: chainId,
      enabling: (!props.settings.blockchains || props.settings.blockchains.length === 0),
    };
  }
  enableBlockchains = () => this.setState({ enabling: !this.state.enabling })
  editBlockchain = (e, { chainId }) => {
    this.setState({ editing: chainId });
    e.stopPropagation();
    return false;
  }
  editBlockchainComplete = () => this.setState({ editing: false })
  pinBlockchain = (e, { chainId }) => {
    this.props.actions.pinBlockchain(chainId);
    e.stopPropagation();
    return false;
  }
  unpinBlockchain = (e, { chainId }) => {
    this.props.actions.unpinBlockchain(chainId);
    e.stopPropagation();
    return false;
  }
  swapBlockchain = (chainId) => {
    this.props.actions.swapBlockchain(chainId);
    // Route to homepage
    this.props.actions.changeModule('');
  }
  render() {
    const {
      blockchains,
      settings,
      t,
      wallets,
    } = this.props;
    const {
      editing,
      enabling,
    } = this.state;
    const filtered = (settings.blockchains)
      ? blockchains.filter(b => (settings.blockchains.includes(b.chainId)))
      : [];
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
          content={t('global_blockchain_manage_header')}
          subheader={t('global_blockchain_manage_subheader')}
          size="large"
          style={{ marginTop: 0 }}
        />
        <Card.Group>
          {sorted.map((blockchain) => {
            const accounts = wallets.filter(w => (w.chainId === blockchain.chainId)).length;
            const isPinned = (settings.pinnedBlockchains.includes(blockchain.chainId));
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
                      <strong>{accounts}</strong> {t('global_blockchain_manage_card_one')}
                    </span>
                  </Card.Meta>
                </Card.Content>
                <Card.Content
                  extra
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button
                    color={(isPinned) ? 'blue' : undefined}
                    chainId={blockchain.chainId}
                    icon="pin"
                    onClick={(!isPinned) ? this.pinBlockchain : this.unpinBlockchain}
                    size="small"
                  />
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
        </Card.Group>
        <Card.Group>
          <Card
            onClick={this.enableBlockchains}
            raised
            style={{ width: '12em' }}
          >
            <Segment
              basic
              textAlign="center"
              secondary
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
              <Card.Header>{t('global_blockchain_manage_card_two_header')}</Card.Header>
              <Card.Description>
                {t('global_blockchain_manage_card_two_description')}
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
      pinBlockchain,
      setSetting,
      swapBlockchain,
      unpinBlockchain,
    }, dispatch)
  };
}

export default compose(
  withTranslation('global'),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalBlockchainManage);
