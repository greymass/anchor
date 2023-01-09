// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Store from 'electron-store';

import { Button, Header, Segment, Table } from 'semantic-ui-react';
import GlobalFragmentChainLogo from '../../../../../shared/components/Global/Fragment/ChainLogo';

class ToolsABICache extends Component<Props> {
  state = {
    cleared: undefined
  }
  clear = () => {
    const abiCache = new Store({
      name: 'abis'
    });
    abiCache.clear();
    this.setState({
      cleared: new Date()
    });
  }
  render = () => {
    const { cleared } = this.state;
    console.log('cleared', cleared);
    const abiCache = new Store({
      name: 'abis'
    });
    return (
      <Segment>
        <Header>
          Network ABI Cache ({abiCache.size} items)
        </Header>
        <Button onClick={this.clear}>Clear Cache</Button>
        <Table definition>
          <Table.Body>
            {(abiCache.size)
              ? Object.keys(abiCache.store).map((cache) => {
                  const [chainId, contract] = cache.split('|');
                  return (
                    <Table.Row>
                      <Table.Cell collapsing>
                        <GlobalFragmentChainLogo
                          chainId={chainId}
                          style={{ height: '2em', width: '2em' }}
                        />
                      </Table.Cell>
                      <Table.Cell textAlign="left">
                        {contract}
                      </Table.Cell>
                    </Table.Row>
                  );
                })
              : (
                <Table.Row>
                  <Table.Cell textAlign="center">
                    No Cached ABIs
                  </Table.Cell>
                </Table.Row>
              )
          }
          </Table.Body>
        </Table>
      </Segment>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ToolsABICache));
