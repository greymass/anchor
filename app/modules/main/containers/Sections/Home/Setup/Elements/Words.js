// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';

import { Button, Segment } from 'semantic-ui-react';

import AccountSetupElementsWordsComplete from './Words/Complete';
import AccountSetupElementsWordsConfirm from './Words/Confirm';
import AccountSetupElementsWordsWrite from './Words/Write';

class AccountSetupElementsWords extends Component<Props> {
  state = {
    stage: 'write',
    verified: false,
  }
  onVerified = () => {
    this.setState({ verified: true });
  }
  render() {
    const {
      creating,
      onComplete,
      words,
    } = this.props;
    const {
      stage,
      verified
    } = this.state;
    let content;
    switch (stage) {
      case 'complete': {
        content = <AccountSetupElementsWordsComplete />;
        break;
      }
      case 'verify': {
        content = <AccountSetupElementsWordsConfirm onVerified={this.onVerified} words={words} />;
        break;
      }
      default: {
        content = <AccountSetupElementsWordsWrite words={words} />;
        break;
      }
    }
    return (
      <Segment clearing size="large">
        {content}
        {(stage === 'verify')
          ? (
            <React.Fragment>
              <p>
                <Button
                  content="Continue"
                  disabled={!verified}
                  fluid
                  primary
                  onClick={() => this.setState({ stage: 'complete' })}
                />
              </p>
              <p>
                <Button
                  content="Back to words"
                  fluid
                  onClick={() => this.setState({ stage: 'write' })}
                />
              </p>
            </React.Fragment>
          )
          : false
        }
        {(stage === 'write')
          ? (
            <React.Fragment>
              <Button
                content="Continue"
                fluid
                primary
                onClick={() => this.setState({ stage: 'verify' })}
                style={{ margin: '1em 0' }}
              />
              <Button
                content="Back to export"
                fluid
                onClick={this.props.onCancel}
                style={{ margin: '1em 0' }}
              />
            </React.Fragment>
          )
          : false
        }
        {(stage === 'complete')
          ? (
            <React.Fragment>
              <Button
                content="Complete Backup"
                fluid
                loading={creating}
                primary
                onClick={onComplete}
              />
            </React.Fragment>
          )
          : false
        }
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
)(AccountSetupElementsWords);
