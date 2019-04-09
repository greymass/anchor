// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { find, sortBy } from 'lodash';
import { Form, Header, Icon, Segment, Table } from 'semantic-ui-react';

import GlobalFormFieldUrl from '../../../components/Global/Form/Field/Url';
import GlobalFragmentChainLogo from '../../../components/Global/Fragment/ChainLogo';
import * as BlockchainsActions from '../../../actions/blockchains';
import { setSetting } from '../../../actions/settings';

class GlobalBlockchainCheckboxes extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      enabledChains: [...props.settings.blockchains],
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
  render() {
    const {
      blockchains,
      disabled,
      selected,
      settings,
      showName,
    } = this.props;
    const {
      enabledChains,
      invalidEndpoints,
    } = this.state;
    const { chainId } = settings;
    if (!blockchains) return false;
    let blockchain = find(blockchains, { chainId });
    if (!blockchain) {
      blockchain = {};
    }
    if (selected) {
      blockchain = find(blockchains, { chainId: selected });
    }
    const { displayTestNetworks } = settings;
    const filtered = blockchains.filter(b => (((displayTestNetworks && b.testnet) || !b.testnet)));
    const sorted = sortBy(filtered, ['testnet', 'name'], ['asc', 'asc']);
    let trigger = (
      <span>
        <GlobalFragmentChainLogo
          chainId={blockchain.chainId}
          noPopup
          style={{
            float: 'left',
            height: '2em',
            width: '2em',
          }}
        />
        {(showName && blockchain && blockchain.name)
          ? (
            <Header
              content={blockchain.name}
              subheader={`${blockchain.chainId.substr(0, 6)}...${blockchain.chainId.substr(-6)}`}
              size="small"
              style={{ margin: 0 }}
            />
          )
          : false
        }
      </span>
    );
    if (!blockchain.chainId) {
      trigger = false;
    }
    if (disabled) {
      return (
        <Segment
          content={trigger}
          style={{ margin: 0 }}
        />
      );
    }
    return (
      <Form>
        <Table verticalAlign="middle" unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell>Blockchain&nbsp;Network</Table.HeaderCell>
              <Table.HeaderCell>API Server</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {sorted.map((b) => (
              <Table.Row>
                <Table.Cell collapsing textAlign="center">
                  <Icon
                    name={enabledChains.includes(b.chainId) ? 'check square outline' : 'square outline'}
                    onClick={() => this.toggleChain(b.chainId)}
                    size="large"
                    style={{ userSelect: 'none' }}
                  />
                </Table.Cell>
                <Table.Cell collapsing>
                  <GlobalFragmentChainLogo
                    chainId={b.chainId}
                    noPopup
                    style={{
                      height: '2em',
                      width: '2em',
                    }}
                  />
                </Table.Cell>
                <Table.Cell collapsing>
                  <Header
                    content={(b.testnet) ? `(TESTNET) ${b.name}` : b.name}
                    subheader={`${b.chainId.substr(0, 6)}...${b.chainId.substr(-6)}`}
                    size="medium"
                    style={{
                      margin: 0,
                    }}
                  />
                </Table.Cell>
                {enabledChains.includes(b.chainId)
                  ? (
                    <Table.Cell>
                      <GlobalFormFieldUrl
                        defaultValue={b.node || ''}
                        error={invalidEndpoints.includes(b.chainId)}
                        loading={false}
                        name={b.chainId}
                        onChange={this.onNodeChange}
                        width={7}
                      />
                    </Table.Cell>
                  )
                  : false
                }
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
  translate('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalBlockchainCheckboxes);
