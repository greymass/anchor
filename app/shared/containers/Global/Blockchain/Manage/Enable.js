// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { sortBy } from 'lodash';
import { Button, Form, Header, Icon, Label, Table } from 'semantic-ui-react';

import GlobalBlockchainResync from './Resync';
import GlobalFormFieldUrl from '../../../../components/Global/Form/Field/Url';
import GlobalFragmentChainLogo from '../../../../components/Global/Fragment/ChainLogo';
import * as BlockchainsActions from '../../../../actions/blockchains';
import { setSetting } from '../../../../actions/settings';
import GlobalModalAccountImportPassword from '../../Account/Import/Password';

class GlobalBlockchainEnable extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      enabledChains: (props.settings.blockchains) ? [...props.settings.blockchains] : [],
      invalidEndpoints: [],
    };
  }
  swapBlockchain = (chainId) => {
    const { actions } = this.props;
    actions.swapBlockchain(chainId);
  }
  toggleChain = (chainId) => {
    const { enabledChains } = this.state;
    const index = enabledChains.indexOf(chainId);
    if (index !== -1) {
      enabledChains.splice(index, 1);
    } else {
      enabledChains.push(chainId);
    }
    this.setState({ enabledChains });
    this.props.actions.setSetting('blockchains', [...enabledChains]);
  }
  onNodeChange = (e, { name, value, valid }) => {
    const { actions } = this.props;
    const { invalidEndpoints } = this.state;
    const modifiedInvalidEndpoints = [...invalidEndpoints];
    if (!valid && !invalidEndpoints.includes(name)) {
      modifiedInvalidEndpoints.push(name);
    }
    if (valid && invalidEndpoints.includes(name)) {
      modifiedInvalidEndpoints.splice(invalidEndpoints.indexOf(name), 1);
    }
    this.setState({ invalidEndpoints: modifiedInvalidEndpoints }, () => {
      if (valid) {
        actions.updateBlockchainSetting(name, 'node', value);
      }
    });
  }
  complete = () => {
    const {
      actions,
      onComplete,
      settings,
    } = this.props;
    if (!settings.walletInit) {
      actions.setSetting('walletInit', true);
    }
    if (onComplete) {
      onComplete();
    }
  }
  render() {
    const {
      blockchains,
      settings,
      t,
    } = this.props;
    const {
      enabledChains,
      invalidEndpoints,
    } = this.state;
    if (!blockchains) return false;
    let passwordPrompt = false;
    if (!settings.walletHash) {
      passwordPrompt = true;
    }
    const { displayTestNetworks } = settings;
    const filtered = blockchains.filter(b => (((displayTestNetworks && b.testnet) || !b.testnet)));
    const sorted = sortBy(filtered, ['testnet', 'name'], ['asc', 'asc']);
    const chainCount = enabledChains.length;
    if (passwordPrompt) {
      return <GlobalModalAccountImportPassword onClose={this.props.onClose} />;
    }
    return (
      <Form>
        <Header
          content={t('global_blockchain_enable_header')}
          subheader={t('global_blockchain_enable_subheader')}
          size="large"
          style={{ marginTop: 0 }}
        />
        <Button
          content={(chainCount !== 0)
            ? t('global_blockchain_enable_button_one_enable', { chainCount })
            : t('global_blockchain_enable_button_one_choose')
          }
          disabled={chainCount === 0}
          icon={chainCount === 0 ? 'warning sign' : 'checkmark'}
          onClick={this.complete}
          primary={(chainCount !== 0)}
        />
        <Button
          chainId="new"
          content={t('global_blockchain_enable_button_two')}
          floated="right"
          icon="circle plus"
          onClick={this.props.onEdit}
        />
        <GlobalBlockchainResync />
        <Table verticalAlign="middle" unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell />
              {(displayTestNetworks)
                ? (
                  <Table.HeaderCell>{t('global_blockchain_enable_header_cell_one')}</Table.HeaderCell>
                )
                : false
              }
              <Table.HeaderCell>{t('global_blockchain_enable_header_cell_two')}</Table.HeaderCell>
              <Table.HeaderCell>{t('global_blockchain_enable_header_cell_three')}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {sorted.map((b) => (
              <Table.Row
                style={{ backgroundColor: enabledChains.includes(b.chainId) ? '#ffffff' : '#ececec' }}
              >
                <Table.Cell
                  collapsing
                  onClick={() => this.toggleChain(b.chainId)}
                  textAlign="center"
                >
                  <Icon
                    name={enabledChains.includes(b.chainId) ? 'check square outline' : 'square outline'}
                    size="large"
                    style={{ userSelect: 'none' }}
                  />
                </Table.Cell>
                <Table.Cell
                  collapsing
                  onClick={() => this.toggleChain(b.chainId)}
                >
                  <GlobalFragmentChainLogo
                    chainId={b.chainId}
                    noPopup
                    style={{
                      height: '2em',
                      width: '2em',
                    }}
                  />
                </Table.Cell>
                {(displayTestNetworks)
                  ? (
                    <Table.Cell collapsing>
                      {(b.testnet)
                        ? <Label color="orange">Testnet</Label>
                        : <Label color="green">Mainnet</Label>
                      }
                    </Table.Cell>
                  )
                  : false
                }
                <Table.Cell collapsing>
                  <Header
                    content={b.name}
                    subheader={(b.chainId) ? `${b.chainId.substr(0, 6)}...${b.chainId.substr(-6)}` : 'Unknown Chain ID'}
                    size="medium"
                    style={{
                      margin: 0,
                    }}
                  />
                </Table.Cell>
                <Table.Cell>
                  {(enabledChains.includes(b.chainId) && settings.walletMode !== 'cold')
                    ? (
                      <GlobalFormFieldUrl
                        defaultValue={b.node || ''}
                        error={invalidEndpoints.includes(b.chainId)}
                        loading={false}
                        name={b.chainId}
                        onChange={this.onNodeChange}
                        width={7}
                      />
                    )
                    : false
                  }
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return {
    blockchains: state.blockchains,
    settings: state.settings,
    validate: state.validate,
    wallet: state.wallet,
    wallets: state.wallets
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      setSetting,
      ...BlockchainsActions,
    }, dispatch)
  };
}

export default compose(
  withTranslation('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalBlockchainEnable);
