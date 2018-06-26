// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Header, Icon, Table } from 'semantic-ui-react';

import DangerLink from '../../Global/Modal/DangerLink';

class ActionsTableRow extends Component<Props> {
  render() {
    const {
      action,
      t
    } = this.props;

    return (
      <Table.Row key={action.key}>
        <Table.Cell
          singleLine
        >
          <Header size="tiny">
            <span styles={{ fontFamily: '"Courier New", Courier, "Lucida Sans Typewriter", "Lucida Typewriter", monospace' }}>
              { t(action.type) }
            </span>
            <Header.Subheader>
              <DangerLink
                content={action.url.substring(0, 30).replace(/(^\w+:|^)\/\//, '')}
                link={action.url}
              />
            </Header.Subheader>
          </Header>
        </Table.Cell>
        <Table.Cell
          singleLine
        >
          <span>
            {action.date}
          </span>
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default translate('actions')(ActionsTableRow);
