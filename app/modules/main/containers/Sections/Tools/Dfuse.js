// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Header, Label, Segment, Table } from 'semantic-ui-react';

class ToolsLedger extends Component<Props> {
  render = () => {
    const { connection, settings } = this.props;
    return (
      <Segment>
        <Header>
          Connection Status - dfuse
        </Header>
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell collapsing>
                Endpoint
              </Table.Cell>
              <Table.Cell>
                {connection.httpEndpoint}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>
                Endpoint: dfuse
              </Table.Cell>
              <Table.Cell>
                {(connection.dfuseEndpoint)
                  ? <Label color='green'>True</Label>
                  : <Label color='yellow'>False</Label>
                }
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>
                Connection: API Key
              </Table.Cell>
              <Table.Cell>
                {(connection.dfuseKey)
                  ? connection.dfuseKey
                  : ''
                }
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>
                Connection: API Token
              </Table.Cell>
              <Table.Cell>
                {(connection.dfuseAuthorization)
                  ? connection.dfuseAuthorization
                  : ''
                }
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>
                Connection: API Token Expires
              </Table.Cell>
              <Table.Cell>
                {(connection.dfuseAuthorizationExpires)
                  ? connection.dfuseAuthorizationExpires
                  : ''
                }
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>
                Settings: API Key
              </Table.Cell>
              <Table.Cell>
                {(settings.dfuseKey)
                  ? settings.dfuseKey
                  : ''
                }
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>
                Settings: API Token
              </Table.Cell>
              <Table.Cell>
                {(settings.dfuseAuthorization)
                  ? settings.dfuseAuthorization
                  : ''
                }
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>
                Settings: API Token Expires
              </Table.Cell>
              <Table.Cell>
                {(settings.dfuseAuthorizationExpires)
                  ? settings.dfuseAuthorizationExpires
                  : ''
                }
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Segment>
    );
  }
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    connection: state.connection,
    settings: state.settings,
    validate: state.validate,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ToolsLedger));
