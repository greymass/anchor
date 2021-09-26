// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';
import QrReader from 'react-qr-reader';

import { Button, Header, Segment } from 'semantic-ui-react';

import { changeModule } from '../../../../actions/navigation';

class AccountSetupRecover extends Component<Props> {
  state = {
    code: false,
    entry: false,
    scan: false,
  }
  handleScan = (data) => {
    if (data) {
      this.setState({
        scan: false,
        code: data
      });
    }
  }
  handleError = (err) => {
    console.error(err);
  }
  render() {
    const { code, entry, scan } = this.state;
    let content = false;
    if (scan) {
      content = (
        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '25%' }}
        />
      );
    }
    if (entry) {
      content = (
        <p>Enter your 34 key words</p>
      );
    }
    if (code) {
      content = (
        <Segment>
          <p>Code found!</p>
          <p>{code}</p>
          <p>Now lets do something with it.</p>
        </Segment>
      );
    }
    return (
      <Segment>
        <Header>
          Create account
          <Header.Subheader>
            Instructions
          </Header.Subheader>
        </Header>
        <Button
          content="Back to Add Account"
          icon="caret left"
          onClick={() => this.props.actions.changeModule('home/account/setup')}
          primary
        />
        <Segment>
          {(scan)
            ? (
              <Button
                content="Stop Scanning"
                icon="caret left"
                onClick={() => this.setState({ scan: false })}
                primary
              />
            )
            : (
              <React.Fragment>
                <Button
                  content="Scan with Webcam"
                  icon="caret left"
                  onClick={() => this.setState({ scan: true })}
                  primary
                />
                <Button
                  content="Enter Mnemonic Key"
                  icon="caret left"
                  onClick={() => this.setState({ entry: true })}
                  primary
                />
              </React.Fragment>
            )
          }
        </Segment>
        {content}
      </Segment>
    );
  }
}

function mapStateToProps(state) {
  return {
    settings: state.settings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      changeModule
    }, dispatch)
  };
}

export default compose(
  withRouter,
  withTranslation('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(AccountSetupRecover);
