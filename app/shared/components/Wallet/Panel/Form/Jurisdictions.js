// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Form } from 'semantic-ui-react';

export default class JurisdictionForm extends Component<Props> {
  state = {
    options: []
  }

  componentDidMount() {
    const { actions, jurisdictions } = this.props;
    actions.getJurisdictions();
    this.makeOptions(jurisdictions);
  }

  makeOptions(jurisdictions) {
    const options = [];
    const j = jurisdictions.jurisdictions;
    for (let i = 0; i < j.length; i += 1) {
      const name = `${j[i].name} (${j[i].description})`;
      options.push({ code: j[i].code, value: name, text: name });
    }
    this.setState({
      options
    });
  }

  render() {
    return (
      <I18n ns="wallet">
        {
          (t) => (
            <Form.Dropdown
              options={this.state.options}
              placeholder="Select Jurisdiction"
              fluid
              search
              multiple
              selection
              onChange={(e, value) => this.props.onChange(value)}
            />
          )
        }
      </I18n>
    );
  }
}
