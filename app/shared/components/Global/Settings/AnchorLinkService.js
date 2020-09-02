// @flow
import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';
import { withTranslation } from 'react-i18next';
import debounce from 'lodash/debounce';

export class GlobalSettingsAnchorLinkService extends Component<Props> {
  onChange = debounce((e, { value }) => {
    const { actions } = this.props;
    actions.setSetting('anchorLinkServiceUrl', value);
  }, 300)
  render() {
    const {
      name,
      value,
    } = this.props;
    return (
      <Input
        name={name}
        onChange={this.onChange}
        style={{ display: 'none' }}
        type="text"
        value={value}
      />
    );
  }
}

export default withTranslation('tools')(GlobalSettingsAnchorLinkService);
