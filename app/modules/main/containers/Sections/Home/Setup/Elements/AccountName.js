// @flow
import React, { Component, useRef } from "react";
import { bindActionCreators } from "redux";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import compose from "lodash/fp/compose";
import { debounce } from 'lodash';

import { Button, Header, Icon, Input, Segment } from "semantic-ui-react";
import GlobalFormFieldAccountName from "../../../../../../../shared/components/Global/Form/Field/AccountName";
import { checkAccountNameValid } from "../../../../../actions/account";

class AccountSetupElementsAccountName extends Component<Props> {
  state = {
    accountName: "",
    available: false,
    name: "",
    premium: "gm",
    valid: false,
  }
  onChange = debounce((e, { value, valid }) => {
    let available = false
    const { blockchain, code, premium } = this.props.accountcreate
    const accountName = `${value}.${premium}`
    if (valid) {
      this.props.actions.checkAccountNameValid(code, accountName);
    }
    this.setState({
      accountName,
      available,
      name: value,
      valid
    })
    this.props.onChange(accountName)
  }, 500)
  random = () => {
    const { premium } = this.props.accountcreate
    const length = 12 - premium.length - 1
    const chars = "abcdefghijklmnopqrstuvwxyz12345";
    let name = ""
    for ( var i = 0; i < length; i++ ) {
      name += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    this.input.onChange(null, {value: name, name: "accountName"})
    this.setState({
      accountName: `${name}.${premium}`,
      name,
      premium
    })
  }
  render() {
    const { accountName, name, premium, valid } = this.state;
    const { accountcreate, onNext, system } = this.props;
    // Ensure account name is available
    const { nameChecked, nameValid } = accountcreate
    let available = false;
    if (name &&
        name.length !== 0 &&
        `${name}.${premium}` === nameChecked &&
        nameChecked &&
        nameValid) {
      available = true;
    }
    // If account is available and valid, allow proceeding to confirmation step
    const canProceed = (available && valid)
    return (
      <Segment basic>
        <Header>
          Create a {accountcreate.blockchain.name} account.
        </Header>
        <p>Enter the desired account name to check its availability.</p>
        <p>
          <GlobalFormFieldAccountName
            label={`.${accountcreate.premium}`}
            labelPosition="right"
            maxlength={12 - premium.length - 1}
            name="accountName"
            onChange={this.onChange}
            ref={(el) => this.input = el}
            value={name}
          />
        </p>
        <p>Note: Your account will be whatever you choose and end with a ".gm"</p>
        {(valid)
          ? (
            <p>
              {(nameChecked && name)
                ? (
                  <span>
                    {(available)
                      ? <Icon color="green" name="check circle" />
                      : <Icon name="times circle" />
                    }
                    {accountName} is {available ? "available" : "taken"}.
                  </span>
                )
                : <span>Checking availability...</span>
              }
            </p>
          )
          : <p>&nbsp;</p>
        }
        <Button
          icon
          labelPosition="left"
          onClick={this.random}
        >
          <Icon name="random" />
          Random Name
        </Button>
        <Button
          disabled={!canProceed}
          icon
          labelPosition="right"
          onClick={onNext}
          primary
        >
          Next
          <Icon name="caret right" />
        </Button>
      </Segment>
    );
  }
}

function mapStateToProps(state) {
  return {
    accountcreate: state.accountcreate,
    system: state.system,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      checkAccountNameValid,
    }, dispatch)
  };
}

export default compose(
  withRouter,
  withTranslation("global"),
  connect(mapStateToProps, mapDispatchToProps)
)(AccountSetupElementsAccountName);
