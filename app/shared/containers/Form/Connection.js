// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import debounce from 'lodash/debounce';
import { I18n } from 'react-i18next';
import { Button, Form, Header } from 'semantic-ui-react';

import WalletPanelFormNode from '../../components/Wallet/Panel/Form/Node';
import * as SettingsActions from '../../actions/settings';
import * as ValidateActions from '../../actions/validate';

type Props = {
  actions: {
    setSettingWithValidation: () => void,
    validateNode: () => void
  },
  chain: {},
  settings: {
    node: string
  },
  validate: {}
};

class FormConnectionContainer extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      node: props.settings.node || ''
    };
  }

  componentDidMount() {
    const {
      actions,
      validate
    } = this.props;
    const {
      node
    } = this.state;
    // Validate settings on app start
    if (validate.NODE !== 'SUCCESS') {
      actions.validateNode(node);
    }
  }

  onChange = debounce((e, { name, value }) => {
    this.setState({
      [name]: value,
    });
    const {
      actions
    } = this.props;
    const { setSettingWithValidation } = actions;
    setSettingWithValidation(name, value);
  }, 300)

  onToggle = () => this.setState({ editing: !this.state.editing });

  render() {
    const {
      chain,
      validate
    } = this.props;
    const {
      editing,
      node
    } = this.state;
    const formElement = (
      <Form>
        <WalletPanelFormNode
          onChange={this.onChange}
          validate={validate}
          value={node}
        />
      </Form>
    );
    let formattedHost = '';
    try {
      const { host } = new URL(node);
      formattedHost = host;
    } catch (e) {
      // console.log('url error', e);
    }
    return (
      <I18n ns="wallet">
        {
          (t) => (
            <div>
              {(validate.NODE !== 'SUCCESS' || editing) ? formElement : ''}
              {(validate.NODE === 'SUCCESS' && editing)
                ? (
                  <Button
                    content="Confirm"
                    icon="checkmark"
                    onClick={this.onToggle}
                    primary
                    size="small"
                    style={{ marginTop: '1em' }}
                  />
                )
                : ''
              }
              {(validate.NODE === 'SUCCESS' && !editing)
                ? [
                  (
                    <Button
                      icon="settings"
                      key="nodeToggle"
                      floated="right"
                      onClick={this.onToggle}
                      size="small"
                    />
                  ), (
                    <Header
                      key="nodeHeader"
                      size="tiny"
                      style={{ marginTop: 0 }}
                    >
                      {t('block_height')}: {chain.head_block_num}
                      <Header.Subheader>
                        {formattedHost}
                      </Header.Subheader>
                    </Header>
                  )
                ]
                : ''
              }
            </div>
          )
        }
      </I18n>
    );
  }
}

function mapStateToProps(state) {
  return {
    chain: state.chain,
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FormConnectionContainer));
