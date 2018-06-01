// @flow
import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';

import FormConnectionContainer from '../../containers/Form/Connection';

const { shell } = require('electron');

export default class SidebarConnection extends Component<Props> {
  openLink = (url) => shell.openExternal(url);
  render() {
    return (
      <Segment
        size="small"
        stacked
      >
        <FormConnectionContainer />
      </Segment>
    );
  }
}
