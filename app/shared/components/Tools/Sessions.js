// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Button, Grid, Header, Popup, Segment, Table } from 'semantic-ui-react';
import TimeAgo from 'react-timeago';

import GlobalFragmentChainLogo from '../Global/Fragment/ChainLogo';

class ToolsSessions extends Component<Props> {
  render() {
    const {
      actions,
      sessions,
      t,
    } = this.props;
    return (
      <Segment style={{ marginTop: 0 }}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={12}>
              <Header>
                {t('tools_sessions_header')}
                <Header.Subheader>
                  {t('tools_sessions_subheader')}
                </Header.Subheader>
              </Header>
            </Grid.Column>
            <Grid.Column textAlign="right" width={4}>
              <Popup
                content={t('tools_sessions_removeall_description')}
                trigger={(
                  <Button
                    content={t('tools_sessions_removeall_button')}
                    onClick={this.props.actions.clearSessions}
                  />
                )}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Table definition striped unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={3}>{t('tools_sessions_application')}</Table.HeaderCell>
              <Table.HeaderCell>{t('tools_sessions_authority')}</Table.HeaderCell>
              <Table.HeaderCell>{t('tools_sessions_usage')}</Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {(sessions.sessions.length === 0)
              ? (
                <Table.Row>
                  <Table.Cell colSpan={10}>
                    {t('tools_sessions_nosessions')}
                  </Table.Cell>
                </Table.Row>
              )
              : false
            }
            {([].concat(sessions.sessions)
                // .filter((w) => (w.chainId === settings.chainId))
                // .sort((a, b) => {
                //   const k1 = `${a.account}@${a.authorization}`;
                //   const k2 = `${b.account}@${b.authorization}`;
                //   return (k1 > k2) ? 1 : -1;
                // })
                .map((s) => (
                  <Table.Row>
                    <Table.Cell>
                      <GlobalFragmentChainLogo
                        chainId={s.network}
                        noPopup
                        size="avatar"
                        style={{ marginRight: '0.25em' }}
                      />
                      {s.name}
                    </Table.Cell>
                    <Table.Cell>
                      {s.actor}@{s.permission}
                    </Table.Cell>
                    <Table.Cell>
                      <Header
                        size="small"
                      >
                        {t('tools_sessions_used')}: <TimeAgo
                          date={s.lastUsed}
                        />
                        <Header.Subheader>
                          {t('tools_sessions_created')}: <TimeAgo
                            date={s.created}
                          />
                        </Header.Subheader>
                      </Header>
                    </Table.Cell>
                    <Table.Cell collapsing textAlign="right">
                      <Button
                        color="red"
                        content={t('remove')}
                        icon="trash"
                        onClick={() => this.props.actions.removeSession(s)}
                        size="small"
                      />
                    </Table.Cell>
                  </Table.Row>
                )))}
          </Table.Body>
        </Table>
      </Segment>
    );
  }
}

export default withTranslation('tools')(ToolsSessions);
