// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';
import QrReader from 'react-qr-reader';

import { Button, Grid, Header, List, Segment } from 'semantic-ui-react';

class AccountSetupRecover extends Component<Props> {
  render() {
    return (
      <Segment basic>
        <Grid columns={2}>
          <Grid.Column>
            <QrReader
              delay={300}
              onError={this.props.handleError}
              onScan={this.props.handleScan}
              style={{ width: '90%' }}
            />
          </Grid.Column>
          <Grid.Column>
            <Header>
              Scan QR Code
              <Header.Subheader>
                Line up and scan the QR code on your owner key certificate.
              </Header.Subheader>
            </Header>
            <p><em>Tips for scanning:</em></p>
            <List bulleted>
              <List.Item>Line the QR code up with the red box displayed.</List.Item>
              <List.Item>Avoid moving the paper too much when lined up.</List.Item>
              <List.Item>Ensure the QR code is lit up enough to scan.</List.Item>
            </List>
            <Button
              content="Back"
              icon="caret left"
              onClick={this.props.onBack}
            />
          </Grid.Column>
        </Grid>
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

export default compose(
  withRouter,
  withTranslation('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(AccountSetupRecover);
