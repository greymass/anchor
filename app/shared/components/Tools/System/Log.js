// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Button, Checkbox, Form, Header, Icon, Segment, Table, TextArea } from 'semantic-ui-react';
import ReactJson from 'react-json-view';
import TimeAgo from 'react-timeago';

const { clipboard, ipcRenderer } = require('electron');

class ToolsSystemLog extends Component<Props> {
  state = {
    errorsOnly: false
  }
  toggleErrors = () => this.setState({ errorsOnly: !this.state.errorsOnly })
  promptSave = () => {
    const { settings, systemlog } = this.props;
    const data = JSON.stringify(systemlog, null, 2);
    ipcRenderer.send('saveFile', settings.lastFilePath, data, 'log');
  }
  render() {
    const {
      systemlog,
      t
    } = this.props;
    const {
      log
    } = systemlog;
    const {
      errorsOnly
    } = this.state;
    return (
      <Segment basic>
        <Header>
          {t('tools_system_log_header')}
          <Header.Subheader>
            {t('tools_system_log_subheader')}
          </Header.Subheader>
        </Header>
        <p>
          <Checkbox
            defaultChecked={errorsOnly}
            label={t('tools_system_log_display_errors')}
            onChange={this.toggleErrors}
          />
        </p>

        <Button
          color="blue"
          content={t('tools_system_log_save_file')}
          icon="download"
          onClick={this.promptSave}
          style={{ marginBottom: '1em' }}
        />
        <Table>
          <Table.Body>
            {(log
              .slice(0, 50)
              .filter((e) => (!errorsOnly || (e.payload && e.payload.err)))
              .map((entry, idx) => {
                const isError = !!(entry.payload && entry.payload.err);
                return (
                  <Table.Row
                    key={`${idx}+${entry.when}`}
                    negative={isError}
                    positive={!isError}
                  >
                    <Table.Cell collapsing>
                      <Header
                        size="small"
                      >
                        <Icon
                          color={(isError) ? 'red' : 'grey'}
                          name={(isError) ? 'warning sign' : 'info circle'}
                        />
                        <Header.Content>
                          {entry.type}
                          <Header.Subheader>
                            {entry.when}
                          </Header.Subheader>
                        </Header.Content>
                      </Header>

                    </Table.Cell>
                    <Table.Cell
                      style={{
                        whiteSpace: "normal",
                        wordWrap: "break-word"
                      }}
                    >
                      <Form>
                        <TextArea
                          value={JSON.stringify(entry.payload)}
                        />
                      </Form>
                    </Table.Cell>
                  </Table.Row>
                )
            }))}
          </Table.Body>
        </Table>
      </Segment>
    );
  }
}

export default translate('tools')(ToolsSystemLog);
