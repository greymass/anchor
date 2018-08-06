// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { intersection, isEqual } from 'lodash';
import { Button, Checkbox, Divider, Form, Header, Icon, Label, Modal, Segment, Tab } from 'semantic-ui-react';

import GlobalButtonElevate from '../../Button/Elevate';
import GlobalFormFieldAccount from '../../../../components/Global/Form/Field/Account';

import * as AccountsActions from '../../../../actions/accounts';
import * as SettingsActions from '../../../../actions/settings';
import * as WalletsActions from '../../../../actions/wallets';

class GlobalModalAccountImportWatch extends Component<Props> {
  state = {
    allValid: false,
    selected: [],
    valid: false,
    validated: [],
    value: ''
  }
  componentWillReceiveProps(nextProps) {
    const accounts = Object.keys(nextProps.accounts);
    this.isValid(accounts);
  }
  importAccounts = () => {
    const {
      selected
    } = this.state;
    const {
      actions
    } = this.props;
    actions.importWallets(selected, false, false, 'watch');
    this.props.onClose();
  }
  isValid = (accounts) => {
    const { selected } = this.state;
    const matches = intersection(accounts, selected);
    this.setState({
      allValid: (matches.length > 0 && isEqual(matches.sort(), selected.sort())),
      validated: matches
    });
  }
  onChange = (e, data) => this.setState(data);
  onSelect = () => {
    const { value } = this.state;
    const selected = [...this.state.selected];
    const existing = selected.indexOf(value);
    const input = this.input.getWrappedInstance();
    if (existing < 0) {
      selected.push(value);
    }
    if (input) {
      input.reset();
    }
    this.props.actions.getAccounts(selected);
    this.setState({
      selected,
      valid: false,
      value: ''
    });
  }
  onRemoveSelected = (e, { name }) => {
    const selected = [...this.state.selected];
    const existing = selected.indexOf(name);
    if (existing >= 0) {
      selected.splice(existing, 1);
    }
    this.setState({ selected }, () => {
      const accounts = Object.keys(this.props.accounts);
      this.isValid(accounts);
    });
  }
  render() {
    const {
      onClose,
      t,
    } = this.props;
    const {
      allValid,
      selected,
      valid,
      validated,
      value
    } = this.state;
    return (
      <Tab.Pane>
        <Segment basic>
          <p>
            {t('global_account_import_watch_description')}
          </p>
          <Form>
            <Form.Group>
              <GlobalFormFieldAccount
                autoFocus
                label={t('global_account_import_watch_account')}
                name="key"
                placeholder={t('welcome:welcome_account_compare_placeholder')}
                onChange={this.onChange}
                ref={(input) => { this.input = input; }}
                value={value}
                width={12}
              />
              <Form.Button
                color="blue"
                content={t('add')}
                disabled={!valid}
                fluid
                onClick={this.onSelect}
                placeholder='2 Wide'
                style={{ marginTop: '1.25em' }}
                width={4}
              />
            </Form.Group>
          </Form>
          {(selected.length > 0)
            ? (
              <Segment stacked color="blue">
                {(selected.map((account) => (
                  <div key={account}>
                    <Checkbox
                      checked
                      label={account}
                      name={account}
                      onClick={this.onRemoveSelected}
                    />
                    {(validated.indexOf(account) >= 0)
                      ? false
                      : (
                        <Label
                          color="red"
                          content={t('global_account_import_watch_account_not_found')}
                          size="tiny"
                          style={{ marginLeft: '1em' }}
                        />
                      )
                    }
                  </div>
                )))}
              </Segment>
            )
            : false
          }
        </Segment>
        <Divider />
        <Segment basic clearing>
          <Button
            floated="left"
            onClick={onClose}
          >
            <Icon name="x" /> {t('cancel')}
          </Button>
          <Button
            color="green"
            content={t('global_button_account_import_action')}
            disabled={!allValid}
            floated="right"
            icon="circle plus"
            onClick={this.importAccounts}
          />
        </Segment>
      </Tab.Pane>
    );
  }
}


function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    settings: state.settings,
    system: state.system,
    validate: state.validate
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...AccountsActions,
      ...SettingsActions,
      ...WalletsActions
    }, dispatch)
  };
}

export default compose(
  translate('global', {
    withRef: true
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalModalAccountImportWatch);
