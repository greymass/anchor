// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

import { Form, Header, Segment } from 'semantic-ui-react';

class ContractInterfaceSelectorAction extends Component<Props> {
  render() {
    const {
      contract,
      contractAction,
      onChange,
      system,
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
              loading={system.GETABI === 'PENDING'}
              name="contractAction"
              onChange={onChange}
              options={actionOptions}
              placeholder={t('interface_actions_header')}
              search
              selection
            />
          </Form>
        </Segment>
      </React.Fragment>
    );
  }
}

export default withTranslation('contract')(ContractInterfaceSelectorAction);
