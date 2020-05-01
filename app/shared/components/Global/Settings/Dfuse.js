// @flow
import React, { Component } from 'react';
import { Checkbox, Input } from 'semantic-ui-react';
import { withTranslation } from 'react-i18next';

export class GlobalSettingsDfuse extends Component<Props> {
  state = {
    value: '',
    visible: false
  };
  onToggleKey = () => this.setState({ visible: !this.state.visible });
  onChange = (e, { value }) => {
    const { actions } = this.props;
    actions.setSetting('dfuseKey', value);
  };
  render() {
    const {
      name,
      selection,
      t,
      value,
    } = this.props;
    const { visible } = this.state
    return (
      <React.Fragment>
        <p>
          <Input
            name={name}
            onChange={this.onChange}
            type={(visible) ? 'text' : 'password'}
            value={value}
          />
        </p>
        <p>
          <Checkbox
            label={t('tools_change_show_api_key')}
            onChange={this.onToggleKey}
            checked={visible}
          />
        </p>
      </React.Fragment>
    );
  }
}

export default withTranslation('tools')(GlobalSettingsDfuse);
