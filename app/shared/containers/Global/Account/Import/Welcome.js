// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Button, Header, Icon, Segment, Tab } from 'semantic-ui-react';

class GlobalModalAccountImportWelcome extends Component<Props> {
  render() {
    const {
      storage,
      t,
    } = this.props;
    return (
      <Tab.Pane>
        <Segment basic>
          <Header
            content="Scan for accounts on this blockchain"
            subheader="Anchor will automatically query the EOS blockchains for accounts matching your known public keys."
          />
          {(!(storage.keys && storage.keys.length))
            ? (
              <p>
                <Icon color="grey" name="info circle" />
                Scanning will be enabled after one key pair is saved.
              </p>
            )
            : false
          }
          <Button
            color="blue"
            content="Scan for Accounts"
            disabled={!(storage.keys && storage.keys.length)}
            icon="search"
            onClick={() => this.props.onTabChange(null, { activeIndex: 1 })}
          />
        </Segment>
        <Segment basic>
          <Header
            content="Import an existing account"
            subheader="Configure Anchor to use existing accounts on the EOS blockchain."
          />
          <Button
            color="blue"
            content="Import Account"
            icon="id card"
            onClick={() => this.props.onTabChange(null, { activeIndex: 2 })}
          />
        </Segment>
        <Segment basic style={{ display: 'none' }}>
          <Header
            content="Setup a new account"
            subheader="Import new or existing key pairs and then have an account created."
          />
          <Button
            color="blue"
            content="Setup Account"
            icon="user plus"
            onClick={() => this.props.onTabChange(null, { activeIndex: 3 })}
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
