// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Popup, Table } from 'semantic-ui-react';
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
      proxy,
      isProxying,
      isValidUser,
      removeProxy,
      t
    } = this.props;

    return (
      <Table.Row positive={isSelected} key={proxy.key}>
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
            content={t('producer_vote_content')}
            header={t('producer_vote_header', { producer: proxy.owner })}
            hoverable
            position="right center"
            trigger={(
              <Button
                color={isSelected ? 'blue' : 'grey'}
                disabled={!isValidUser || isProxying}
                icon={isSelected ? 'checkmark box' : 'minus square outline'}
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
          <b>{ proxy.name }</b>
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
