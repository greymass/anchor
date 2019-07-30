// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button } from 'semantic-ui-react';

export class GlobalButtonAccountImport extends Component<Props> {
  onClick = () => {
    const {
      history,
    } = this.props;
    history.push('/tools/accounts');
  }
  render() {
    const {
      t
    } = this.props;
    return (
      <Button
        color="blue"
        content={t('global_button_account_import_action')}
        icon="circle plus"
        onClick={this.onClick}
      />
    );
  }
}

export default translate(['global', 'welcome'])(GlobalButtonAccountImport);
