// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import TimeAgo from 'react-timeago';
import { PrivateKey } from '@greymass/eosio';

import { Button, Header, Segment, Table } from 'semantic-ui-react';

const { ipcRenderer } = require('electron');

class ToolsLinkService extends Component<Props> {
  linkConnect = () => ipcRenderer.send('linkConnect')
  linkDisconnect = () => ipcRenderer.send('linkDisconnect')
  linkRestart = () => ipcRenderer.send('linkRestart')
  requestKeyReset = () => ipcRenderer.send('linkKeyReset')
  render() {
    const {
      sessions,
      t
    } = this.props;
    let requestKey;
    let requestKeyError;
    try {
      requestKey = PrivateKey.from(sessions.requestKey).toPublic();
    } catch (e) {
      requestKey = 'INVALID KEY';
      requestKeyError = e;
    }
    return (
      <Segment color="violet" piled style={{ margin: 0 }}>
        <Header
          content={t('tools_link_service_header')}
          subheader={t('tools_link_service_subheader')}
        />
        <Button
          color="green"
          content={t('connect')}
          icon="play"
          onClick={this.linkConnect}
          size="tiny"
        />
        <Button
          color="red"
          content={t('disconnect')}
          icon="stop"
          onClick={this.linkDisconnect}
          size="tiny"
        />
        <Button
          color="blue"
          content={t('restart')}
          icon="refresh"
          onClick={this.linkRestart}
          size="tiny"
        />
        <Segment basic size="large">
          <Table definition>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={4} />
                <Table.HeaderCell width={14} />
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  Link ID
                </Table.Cell>
                <Table.Cell key={sessions.linkId}>
                  {sessions.linkId}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  Request Key
                </Table.Cell>
                <Table.Cell>
                  <p>{String(requestKey)}</p>
                  {requestKeyError ? String(requestKeyError) : ''}
                  <br />
                  <Button onClick={this.requestKeyReset}>
                    Reset Request Key
                  </Button>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  Initialized
                </Table.Cell>
                <Table.Cell key={sessions.lastCreate}>
                  <TimeAgo
                    date={sessions.lastCreate}
                  />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  Connected
                </Table.Cell>
                <Table.Cell key={sessions.lastOpen}>
                  <TimeAgo
                    date={sessions.lastOpen}
                  />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  Last Event
                </Table.Cell>
                <Table.Cell key={sessions.lastEvent}>
                  <TimeAgo
                    date={sessions.lastEvent}
                  />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  Last Ping
                </Table.Cell>
                <Table.Cell key={sessions.lastPing}>
                  <TimeAgo
                    date={sessions.lastPing}
                  />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  Last Message
                </Table.Cell>
                <Table.Cell key={sessions.lastMessage}>
                  <TimeAgo
                    date={sessions.lastMessage}
                  />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  Last Disconnect
                </Table.Cell>
                <Table.Cell key={sessions.lastClose}>
                  <TimeAgo
                    date={sessions.lastClose}
                  />
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Segment>
      </Segment>
    );
  }
}

export default withTranslation('tools')(ToolsLinkService);
