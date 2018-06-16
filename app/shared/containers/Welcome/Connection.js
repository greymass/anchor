// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';
import debounce from 'lodash/debounce';
import { translate } from 'react-i18next';
import { Button, Checkbox, Container, Form, Input, Message } from 'semantic-ui-react';

import * as SettingsActions from '../../actions/settings';
import * as ValidateActions from '../../actions/validate';

type Props = {
  actions: {
    onStageSelect: () => void,
    setSettingWithValidation: () => void
  },
  settings: {
    node: string
  },
  t: () => void,
  validate: {}
};

class WelcomeConnectionContainer extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      node: props.settings.node || '',
      sslConfirm: false
    };
  }

  componentDidMount() {
    const {
      actions,
      validate
    } = this.props;
    if (validate.NODE !== 'SUCCESS' && this.state.node) {
      const { validateNode } = actions;
      validateNode(this.state.node);
    }
  }

  isSafeish = (url) => url.startsWith('http:') || url.startsWith('https:')

  onChange = debounce((e, { name, value }) => {
    this.setState({
      [name]: value,
    });
  }, 500)

  onConfirm = (e, { checked }) => {
    this.setState({
      sslConfirm: checked
    });
  }

  onConnect = () => {
    const {
      node
    } = this.state;
    const {
      actions,
      onStageSelect
    } = this.props;
    const { setSettingWithValidation } = actions;
    setSettingWithValidation('node', node);
    if (onStageSelect) {
      onStageSelect(1);
    }
  }

  onToggle = () => this.setState({ editing: !this.state.editing });

  render() {
    const {
      t,
      validate
    } = this.props;
    const {
      node,
      sslConfirm
    } = this.state;
    // let formattedHost = '';
    let sslEnabled = false;
    let validUrl = false;
    try {
      const {
        // host,
        protocol
      } = new URL(node);
      validUrl = true;
      sslEnabled = (protocol === 'https:');
      // formattedHost = host;
    } catch (e) {
      // console.log('url error', e);
    }
    let message = (
      <Message
        color="blue"
        content={(
          <p>
            <a
              onClick={() => this.openLink('https://github.com/greymass/eos-voter/blob/master/nodes.md')}
              onKeyPress={() => this.openLink('https://github.com/greymass/eos-voter/blob/master/nodes.md')}
              role="link"
              style={{ cursor: 'pointer' }}
              tabIndex={0}
            >
              {t('welcome:welcome_more_servers_2')}
            </a>
          </p>
        )}
        icon="info circle"
        info
        header={t('welcome:welcome_more_servers_1')}
      />
    );
    let checkbox = false;
    // display an error if the server could not be validated
    if (validate.NODE === 'FAILURE') {
      message = (
        <Message
          color="red"
          content={t('welcome:welcome_server_connection_fail_content')}
          header={t('welcome:welcome_server_connection_fail_title')}
          icon="warning sign"
        />
      );
    }
    // display a warning + checkbox if non-ssl
    if (validUrl && !sslEnabled) {
      if (!sslConfirm) {
        message = (
          <Message
            color="orange"
            content={t('welcome:welcome_ssl_warning_content')}
            header={t('welcome:welcome_ssl_warning_title')}
            icon="warning sign"
          />
        );
      }
      checkbox = (
        <p>
          <Checkbox
            label={t('welcome:welcome_ssl_warning_confirm')}
            onChange={this.onConfirm}
            checked={sslConfirm}
          />
        </p>
      );
    }
    // safeish true and ssl or non-ssl confirmed
    const disabled = !(this.isSafeish(node) && (sslConfirm || sslEnabled));
    return (
      <Form
        onSubmit={this.onConnect}
      >
        <Form.Field
          autoFocus
          control={Input}
          fluid
          icon={(validate.NODE === 'SUCCESS') ? 'checkmark' : 'x'}
          label={t('wallet_panel_form_node')}
          loading={(validate.NODE === 'PENDING')}
          name="node"
          onChange={this.onChange}
          placeholder="https://..."
          defaultValue={node}
        />
        {message}
        {checkbox}
        <Container textAlign="center">
          <Button
            content={t('welcome:welcome_connect_server')}
            disabled={disabled}
            icon="exchange"
            primary
            size="small"
            style={{ marginTop: '1em' }}
          />
        </Container>
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return {
    settings: state.settings,
    validate: state.validate
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...SettingsActions,
      ...ValidateActions
    }, dispatch)
  };
}

export default compose(
  withRouter,
  translate('wallet'),
  connect(mapStateToProps, mapDispatchToProps)
)(WelcomeConnectionContainer);
