// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Form, Header, Segment } from 'semantic-ui-react';

class ContractInterfaceSelectorAction extends Component<Props> {
  render() {
    const {
      contract,
      contractAction,
      onChange,
      t
    } = this.props;
    const actionOptions = contract.getActions().map((action) => ({
      text: action.name,
      value: action.type,
    }));
    return (
      <React.Fragment>
        <Header>
          {t('interface_actions_header')}
          <Header.Subheader>
            {t('interface_actions_subheader')}
          </Header.Subheader>
        </Header>
        <p>
          {t('interface_actions_instructions')}
        </p>
        <Segment secondary stacked>
          <Form>
            <Form.Dropdown
              defaultValue={contractAction}
              fluid
              label={t('interface_actions_header')}
              name="contractAction"
              placeholder={t('interface_actions_header')}
              onChange={onChange}
              options={actionOptions}
              search
              selection
            />
          </Form>
        </Segment>
      </React.Fragment>
    );
  }
}

export default translate('contract')(ContractInterfaceSelectorAction);
