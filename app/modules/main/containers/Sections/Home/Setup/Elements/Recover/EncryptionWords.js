// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';

import { Button, Divider, Header, Message, Segment } from 'semantic-ui-react';

import AccountSetupElementsWordsList from '../Words/List';
import GlobalFormFieldWords from '../../../../../../../../shared/components/Global/Form/Field/Words';

class AccountSetupRecoverEncryptionWords extends Component<Props> {
  state = {
    // Encryption Keys (6 words)
    encryption: [],
  }
  addEncryptionWord = (value) => {
    this.setState({
      encryption: [
        ...this.state.encryption,
        value
      ]
    }, () => {
      this.props.setEncryptionWords(this.state.encryption);
    });
  }
  resetEncryptionWords = () => {
    this.setState({ encryption: [] });
    this.props.setEncryptionWords([]);
    this.props.resetError();
  }
  onClick = () => {
    this.props.setEncryptionWords(this.state.encryption);
    this.props.onClick();
  }
  render() {
    const {
      encryption,
    } = this.state;
    const {
      error
    } = this.props;
    return (
      <Segment basic>
        <Header>
          Enter Encryption Key
          <Header.Subheader>Enter the 6 words as displayed labeld as <strong>ENCRYPTION KEY</strong> from your owner key certificate.</Header.Subheader>
        </Header>
        {(encryption.length < 6)
          ? (
            <React.Fragment>
              <p>Enter word #{encryption.length + 1}.</p>
              <GlobalFormFieldWords
                onAdd={this.addEncryptionWord}
              />
            </React.Fragment>
          )
          : false
        }
        <Divider horizontal><Header>Encryption Key</Header></Divider>
        <Segment secondary>
          {(encryption.length)
            ? (
              <AccountSetupElementsWordsList words={encryption} />
            )
            : (
              <p>Enter your first word to get started.</p>
            )
          }
        </Segment>
        {(error)
          ? (
            <Message
              error
              header={error.message}
              content="Check that the encryption words above match. If they do, go back and ensure the network, account name, and mnemonic words also match."
            />
          )
          : false
        }
        <Button
          content="Continue"
          disabled={encryption.length !== 6}
          fluid
          onClick={this.onClick}
          primary
        />
        <Button
          content="Clear all words"
          fluid
          icon="repeat"
          onClick={this.resetEncryptionWords}
          style={{ marginTop: '1em' }}
        />
        <Button
          content="Go back to start and try again"
          icon="caret left"
          fluid
          onClick={this.props.onBack}
          style={{ marginTop: '1em' }}
        />
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
)(AccountSetupRecoverEncryptionWords);
