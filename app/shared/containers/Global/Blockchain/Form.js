// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import compose from 'lodash/fp/compose';
import { withTranslation } from 'react-i18next';
import { Accordion, Button, Divider, Form, Icon, Message } from 'semantic-ui-react';
import { find } from 'lodash';
import { delete as del, set } from 'dot-prop-immutable';

import GlobalFormFieldString from '../../../components/Global/Form/Field/String';
import GlobalFormFieldServer from '../../../components/Global/Form/Field/Url';

import BlockchainsActions from '../../../actions/blockchains';
import SettingsActions from '../../../actions/settings';
import ValidateActions from '../../../actions/validate';

class GlobalBlockchainForm extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      loading: {},
      newChain: !!(props.chainId === 'new'),
      showAdvanced: !!(props.chainId === 'new'),
      values: Object.assign({}, props.blockchain),
      valids: {
        endpoint: true //props.settings.walletMode === 'cold' || false
      },
    };
  }
  static getDerivedStateFromProps(props, state) {
    const { validate } = props;
    let derived = {};
    if (state.values.node) {
      if (validate.NODE === 'PENDING') {
        // derived = set(state, 'valids.endpoint', false);
        // derived = set(derived, 'loading.endpoint', true);
        derived = set(state, 'errors', {});
      }
      if (validate.NODE === 'FAILURE') {
        // derived = set(state, 'errors.endpoint', 'undefined');
        derived = del(derived, 'loading.endpoint');
      }
      if (validate.NODE === 'SUCCESS') {
        derived = set(state, 'errors', {});
        // derived = set(state, 'valids.endpoint', true);
        // derived = del(derived, 'loading.endpoint');
      }
    }
    return derived;
  }
  componentDidMount() {
    this.props.actions.clearValidationState();
    const {
      settings
    } = this.props;
    const {
      chainId,
      node
    } = this.state.values;
    if (settings.walletMode !== 'cold' && node && chainId) {
      // this.props.actions.validateNode(node, chainId);
    }
  }
  showAdvanced = () => this.setState({ showAdvanced: !this.state.showAdvanced });
  isValid = () => !Object.values(this.state.valids).includes(false)
  onCancel = () => {
    this.state = {
      values: Object.assign({}, this.props.blockchain)
    };
    const { onCancel } = this.props;
    if (onCancel) {
      onCancel();
    }
  }
  onChange = (e, { name, valid, value }) => this.setState({
    values: set(this.state.values, name, value),
    valids: set(this.state.valids, name, valid),
  })
  onNodeChange = (e, { name, valid, value }) => this.setState({
    values: set(this.state.values, name, value),
    valids: set(this.state.valids, name, valid),
  }, () => {
    // this.props.actions.validateNode(value, this.state.values.chainId, false)
  })
  onSelect = (e, { name, value }) => this.setState({
    values: set(this.state.values, name, value)
  })
  onCheck = (e, { name, checked }) => this.setState({
    values: set(this.state.values, name, checked)
  })
  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.onSubmit(e);
      e.preventDefault();
      return false;
    }
  }
  onSubmit = () => {
    const {
      actions,
      onCancel,
      onSubmit,
      settings
    } = this.props;
    const { values } = this.state;
    if (this.isValid()) {
      const isCurrentChain = !!(settings.chainId === values.chainId);
      if (isCurrentChain) {
        actions.setSetting('node', values.node);
      }
      actions.updateBlockchain(values);
      if (onSubmit) {
        onSubmit();
      }
      if (onCancel) {
        onCancel();
      }
    }
  };
  render() {
    const {
      app,
      settings,
      t,
    } = this.props;
    const {
      errors,
      loading,
      newChain,
      showAdvanced,
      values,
    } = this.state;
    const options = app.features.map((feature) => ({
      key: feature,
      text: t(`global:global_app_feature_${feature}_name`),
      value: feature,
    }));
    const {
      chainId,
      keyPrefix,
      name,
      node,
      supportedContracts,
      symbol,
      testnet,
    } = values;
    const hasErrors = (Object.keys(errors).length > 0);
    return (
      <Form
        error={hasErrors}
        onKeyPress={this.onKeyPress}
        onSubmit={this.onSubmit}
      >
        <GlobalFormFieldString
          autoFocus={newChain}
          defaultValue={chainId || ''}
          disabled={!newChain}
          label={t('tools_form_blockchain_chainid_label')}
          name="chainId"
          onChange={this.onChange}
        />
        <GlobalFormFieldString
          autoFocus={!newChain}
          defaultValue={name || ''}
          label={t('tools_form_blockchain_name_label')}
          name="name"
          onChange={this.onChange}
        />
        {(settings.walletMode !== 'cold')
          ? (
            <GlobalFormFieldServer
              defaultValue={node || ''}
              label={t('tools_form_blockchain_node_label')}
              loading={loading.endpoint}
              name="node"
              onChange={this.onNodeChange}
            />
          )
          : false
        }
        <Form.Field>
          <Accordion fluid styled>
            <Accordion.Title active={showAdvanced} index={0} onClick={this.showAdvanced}>
              <Icon name='dropdown' />
              {t('tools_form_blockchain_advanced_configuration')}
            </Accordion.Title>
            <Accordion.Content active={showAdvanced}>
              <GlobalFormFieldString
                defaultValue={keyPrefix || ''}
                label={t('tools_form_blockchain_keyprefix_label')}
                name="keyPrefix"
                onChange={this.onChange}
              />
              <GlobalFormFieldString
                defaultValue={symbol || ''}
                label={t('tools_form_blockchain_symbol_label')}
                name="symbol"
                onChange={this.onChange}
              />
              <Form.Select
                defaultValue={supportedContracts}
                fluid
                label={t('tools_form_blockchain_features_label')}
                multiple
                name="supportedContracts"
                onChange={this.onSelect}
                options={options}
                placeholder={t('tools_form_blockchain_features_placeholder')}
                selection
              />
            </Accordion.Content>
          </Accordion>
        </Form.Field>
        <Form.Field>
          <Form.Checkbox
            checked={testnet}
            label={t('tools_form_blockchain_testnet_label')}
            name="testnet"
            onChange={this.onCheck}
          />
        </Form.Field>
        <Divider hidden />
        {(hasErrors)
          ? (
            <Message error>
              {Object.keys(errors).map((error) => (
                <p>{t(`tools_form_blockchain_node_error_${errors[error]}`)}</p>
              ))}
            </Message>
          )
          : false
        }
        <Button
          content={t('cancel')}
          onClick={this.onCancel}
          secondary
        />
        <Button
          content={t('save')}
          disabled={(!this.isValid() || hasErrors)}
          icon="save"
          floated="right"
          primary
        />
      </Form>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    app: state.app,
    blockchain: find(state.blockchains, { chainId: ownProps.blockchain }),
    chainId: ownProps.blockchain,
    settings: state.settings,
    validate: state.validate
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...BlockchainsActions,
      ...SettingsActions,
      ...ValidateActions,
    }, dispatch)
  };
}

export default compose(
  withTranslation('tools', {
    withRef: true
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalBlockchainForm);
