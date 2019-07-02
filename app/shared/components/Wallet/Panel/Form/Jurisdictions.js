// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Form } from 'semantic-ui-react';

export default class JurisdictionForm extends Component<Props> {
  componentDidMount() {
    const { actions } = this.props;
    actions.getJurisdictions();
  }

  render() {
    const options = [
      { key: 'pl', value: 'china', text: 'china' },
    ];

    return (
      <I18n ns="wallet">
        {
          (t) => (
            <Form.Dropdown
              options={options}
              placeholder="Select Jurisdiction"
              fluid
              search
              multiple
              selection
            />
          )
        }
      </I18n>
    );
  }

}
