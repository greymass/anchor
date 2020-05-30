// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Button, Header, Icon, Segment, Tab } from 'semantic-ui-react';

import GlobalModalAccountImportKeys from './Keys';
import GlobalModalAccountImportRequestCode from './Request/Code';

import makeGetKeysUnlocked from '../../../../selectors/getKeysUnlocked';

const defaultState = {
  confirming: false,
  keys: {
    active: '',
    owner: ''
  },
  stage: 1,
  values: {
    accountName: '',
    active: '',
    password: '',
    owner: ''
  },
  validated: {
    accountName: false,
    active: false,
    owner: false,
    keyBackup: false
  },
};

class GlobalModalAccountImportRequest extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, defaultState);
  }
  onChange = (e, { name, valid, value }) => {
    const values = { ...this.state.values };
    const validated = { ...this.state.validated };
    values[name] = value;
    validated[name] = valid;
    this.setState({
      values,
      validated
    }, () => {
      if (name === 'accountName' && value.length !== 0) {
        const { actions } = this.props;
        actions.checkAccountAvailability(value);
      }
    });
  }
  render() {
    const {
      pubkeys,
      t,
    } = this.props;
    return (
      <Tab.Pane>
        <Segment basic>
          <Header
            content={t('global_account_import_request_header_one')}
            subheader={t('global_account_import_request_subheader_one')}
          />
          {(!pubkeys.available.length) ? (
            <GlobalModalAccountImportKeys />
          ) : false}
          {(pubkeys.available.length) ? (
            <GlobalModalAccountImportRequestCode />
          ) : false}
        </Segment>
        <Segment basic clearing>
          <Button
            floated="left"
            onClick={this.props.onClose}
          >
            <Icon name="x" /> {t('cancel')}
          </Button>
        </Segment>
      </Tab.Pane>
    );
  }
}

const makeMapStateToProps = () => {
  const getKeysUnlocked = makeGetKeysUnlocked();
  const mapStateToProps = (state, props) => ({
    pubkeys: getKeysUnlocked(state, props),
    settings: state.settings,
  });
  return mapStateToProps;
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
    }, dispatch)
  };
}

export default compose(
  withTranslation('global', {
    withRef: true
  }),
  connect(makeMapStateToProps, mapDispatchToProps)
)(GlobalModalAccountImportRequest);
