// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';

import { Button, Divider, Header, Segment } from 'semantic-ui-react';

import GlobalFormFieldWords from '../../../../../../../../../shared/components/Global/Form/Field/Words';
import RecoveryWords from './Words';

class AccountSetupRecoverMnemonicWords extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      // 28 word phrase
      mnemonic: props.mnemonic || [],
    };
  }
  addMnemonicWord = (value) => {
    this.setState({
      mnemonic: [
        ...this.state.mnemonic,
        value
      ]
    });
  }
  addSpecificMnemonicWord = (word, i) => {
    const mnemonic = [...this.state.mnemonic];
    mnemonic[i - 1] = word;
    this.setState({
      mnemonic,
    });
  }
  onReset = () => {
    this.setState({
      mnemonic: [],
    });
  }
  render() {
    const {
      mnemonic,
    } = this.state;
    return (
      <Segment basic>
        <Header>
          Enter Mnemonic Key
          <Header.Subheader>
            Enter the 28 words as displayed labeld as <strong>MNEMONIC KEY</strong> from your owner key certificate.
          </Header.Subheader>
        </Header>
        {(mnemonic.length < 28)
          ? (
            <GlobalFormFieldWords
              onAdd={this.addMnemonicWord}
              wordNumber={mnemonic.length + 1}
            />
          )
          : false
        }
        <Divider horizontal>
          <Header>
            Mnemonic Key
          </Header>
        </Divider>
        <Segment secondary>
          <RecoveryWords
            editable
            onEdit={this.addSpecificMnemonicWord}
            words={mnemonic}
          />
        </Segment>
        <Button
          content="Continue"
          disabled={mnemonic.length < 28}
          fluid
          onClick={() => this.props.onChangeMnemonic([...mnemonic])}
          primary
        />
        <Button
          content="Clear all words"
          fluid
          icon="repeat"
          onClick={this.onReset}
          style={{ marginTop: '1em' }}
        />
        <Button
          content="Back to account name"
          fluid
          icon="caret left"
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
)(AccountSetupRecoverMnemonicWords);
