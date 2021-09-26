// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';

import { Accordion, Button, Header, Icon, Segment } from 'semantic-ui-react';

import AccountSetupElementsLedgerOptionsLedgerAll from './Options/LedgerAll';
import AccountSetupElementsLedgerOptionsLedgerRecover from './Options/LedgerRecover';
import AccountSetupElementsLedgerOptionsLedgerUse from './Options/LedgerUse';

class AccountSetupElementsLedgerOptions extends Component<Props> {
  state = { activeIndex: 0 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;
    return (
      <React.Fragment>

        <Header>
          How would you like to use your Ledger?
          <Header.Subheader>
            Please select an option below to learn more and proceed.
          </Header.Subheader>
        </Header>

        <Accordion styled>
          <Accordion.Title
            active={activeIndex === 3}
            index={3}
            onClick={this.handleClick}
            style={{ color: 'black' }}
          >
            <Icon name="dropdown" />
            Recommended: Owner Key Certificate for recovery and Ledger for regular use.
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 3}>
            <Segment>
              <AccountSetupElementsLedgerOptionsLedgerUse />
            </Segment>
            <Button
              content="Continue"
              fluid
              onClick={() => this.props.selectMethod('use')}
              primary
            />
          </Accordion.Content>
          <Accordion.Title
            active={activeIndex === 1}
            index={1}
            onClick={this.handleClick}
            style={{ color: 'black' }}
          >
            <Icon name="dropdown" />
            Ledger for account recovery and Anchor for regular use.
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <Segment>
              <AccountSetupElementsLedgerOptionsLedgerRecover />
            </Segment>
            <Button
              content="Continue"
              fluid
              onClick={() => this.props.selectMethod('recover')}
              primary
            />
          </Accordion.Content>
          <Accordion.Title
            active={activeIndex === 2}
            index={2}
            onClick={this.handleClick}
            style={{ color: 'black' }}
          >
            <Icon name="dropdown" />
            Ledger for account recovery and regular use.
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 2}>
            <Segment>
              <AccountSetupElementsLedgerOptionsLedgerAll />
            </Segment>
            <Button
              content="Continue"
              fluid
              onClick={() => this.props.selectMethod('all')}
              primary
            />
          </Accordion.Content>
        </Accordion>
      </React.Fragment>
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
)(AccountSetupElementsLedgerOptions);
