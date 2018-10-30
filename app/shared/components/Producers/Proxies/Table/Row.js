// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Popup, Table, Header } from 'semantic-ui-react';
import { isEqual } from 'lodash';

import DangerLink from '../../../Global/Modal/DangerLink';

class ProducersTableRow extends Component<Props> {
  shouldComponentUpdate = (nextProps) =>
    !isEqual(this.props.proxy.owner, nextProps.proxy.owner)
    || !isEqual(this.props.isValidUser, nextProps.isValidUser)
    || !isEqual(this.props.isSelected, nextProps.isSelected);

  render() {
    const {
      addProxy,
      getProxyInfo,
      isSelected,
      isValidUser,
      proxy,
      removeProxy,
      settings,
      t
    } = this.props;

    return (
      <Table.Row key={proxy.owner}>
        <Table.Cell
          singleLine
          textAlign="center"
        >
          <Button
            color="purple"
            icon="magnify"
            onClick={() => getProxyInfo(proxy.owner)}
            size="small"
          />

          <Popup
            content={t('producers_proxies_popup_content', { proxy: proxy.owner })}
            header={t('producers_proxies_popup_header')}
            hoverable
            position="right center"
            trigger={(
              <Button
                color={isSelected ? 'blue' : 'grey'}
                icon={isSelected ? 'circle' : 'circle outline'}
                disabled={!isValidUser}
                onClick={
                  (isSelected)
                  ? () => removeProxy(proxy.owner)
                  : () => addProxy(proxy.owner)
                }
                size="small"
              />
            )}
          />
        </Table.Cell>
        <Table.Cell
          singleLine
        >
          <Header size="small">
            <span styles={{ fontFamily: '"Courier New", Courier, "Lucida Sans Typewriter", "Lucida Typewriter", monospace' }}>
              {proxy.name}
            </span>
            <Header.Subheader>
              <DangerLink
                content={proxy.website.substring(0, 30).replace(/(^\w+:|^)\/\//, '')}
                link={proxy.website}
                settings={settings}
              />
            </Header.Subheader>
          </Header>
        </Table.Cell>
        <Table.Cell
          singleLine
        >
          <b>{ proxy.owner }</b>
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default translate('producers')(ProducersTableRow);
