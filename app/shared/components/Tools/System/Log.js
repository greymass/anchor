// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Button, Checkbox, Form, Header, Icon, Segment, Table, TextArea } from 'semantic-ui-react';

const { ipcRenderer } = require('electron');

class ToolsSystemLog extends Component<Props> {
  state = {
    errorsOnly: true
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
      <Segment color="violet" piled style={{ margin: 0 }}>
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
              .filter((e) => (!errorsOnly || (e.payload && e.payload.err) || (e.type && e.type.endsWith('_FAILURE'))))
              .map((entry, idx) => {
                const isError = !!((entry.payload && entry.payload.err) || (entry.type && entry.type.endsWith('_FAILURE')));
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
