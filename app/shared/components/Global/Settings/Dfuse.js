// @flow
import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';
import { withTranslation } from 'react-i18next';

export class GlobalSettingsDfuse extends Component<Props> {
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

    return (
      <Input
        name={name}
        onChange={this.onChange}
        value={value}
      />
    );
  }
}

export default withTranslation('global')(GlobalSettingsDfuse);
