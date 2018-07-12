// @flow
import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';

const languages = [
  { key: 'cn', value: 'zh-CN', flag: 'cn', text: '中文' },
  { key: 'en', value: 'en-US', flag: 'us', text: 'English' },
  { key: 'fr', value: 'fr-FR', flag: 'fr', text: 'Français' },
  { key: 'it', value: 'it-IT', flag: 'it', text: 'Italiano' },
  { key: 'ja', value: 'ja-JP', flag: 'jp', text: '日本語' },
  { key: 'kr', value: 'ko-KR', flag: 'kr', text: '한글' },
  { key: 'ru', value: 'ru-RU', flag: 'ru', text: 'Русский' },
];

export default class GlobalFormFieldLanguage extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue
    };
  }

  onChange = (e, { value }) => {
    const { actions, i18n } = this.props;
    i18n.changeLanguage(value);
    actions.setSetting('lang', value);
  }

  render() {
    const {
      name
    } = this.props;

    const {
      value
    } = this.state;

    return (
      <Dropdown
        defaultValue={value}
        fluid
        name={name}
        onChange={this.onChange}
        options={languages}
      />
    );
  }
}
