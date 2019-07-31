// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Button, Header, Segment, Tab } from 'semantic-ui-react';

import GlobalModalAccountImportRequest from './Request';
import GlobalModalAccountImportContractsSetupAccount from './Contracts';

class GlobalModalAccountImportWelcome extends Component<Props> {
  state = {
    pane: false
  }
  onClose = () => this.setState({ pane: false })
  onClick = (e, { pane }) => this.setState({ pane })
  render() {
    const {
      t,
    } = this.props;
    const {
      pane
    } = this.state;
    if (pane) {
      switch (pane) {
        case 'contract':
          return <GlobalModalAccountImportContractsSetupAccount onClose={this.onClose} />;
        case 'request':
          return <GlobalModalAccountImportRequest onClose={this.onClose} />;
        default:
          break;
      }
    }
    return (
      <Tab.Pane>
        <Segment basic>
          <Header
            content="Create account via Smart Contract"
            subheader="If you have EOS already, you can transfer a small amount to a smart contract to have an account created."
          />
          <Button
            color="blue"
            content="Create via Smart Contract"
            icon="user"
            pane="contract"
            onClick={this.onClick}
          />
        </Segment>
        <Segment basic>
          <Header
            content="Create account via Request Code"
            subheader="A request code can be given to an untrusted party who is willing to create an account for you."
          />
          <Button
            color="blue"
            content="Create via Request Code"
            icon="user"
            pane="request"
            onClick={this.onClick}
          />
        </Segment>
      </Tab.Pane>
    );
  }
}


function mapStateToProps(state) {
  return {
    storage: state.storage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({

    }, dispatch)
  };
}

export default compose(
  translate('global', {
    withRef: true
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalModalAccountImportWelcome);
