// @flow
import React, { PureComponent } from 'react';
import { Button, Container, Form, Header, Icon, Image, Modal, Segment } from 'semantic-ui-react';

import DangerLink from '../../../../../shared/containers/Global/DangerLink';
import Logo from '../../../../../renderer/assets/images/anchor-logo.svg';
import packageJson from '../../../../../../package.json';

const { ipcRenderer } = require('electron');

class OverviewSidebarUpdate extends PureComponent<Props> {
  state = { open: false }
  toggle = () => this.setState({ open: !this.state.open })
  checkForUpdates = () => ipcRenderer.send('checkForUpdates')
  render() {
    const {
      constants,
      update,
    } = this.props;
    const {
      open
    } = this.state;
    if (!update) return false;
    const { version } = packageJson;
    let upgradeAvailable = false;
    // Determine if an upgrade is actually available
    if (version && constants && constants.version && constants.version !== version) {
      const [
        nextMajor,
        nextMinor,
        nextPatch
      ] = constants.version.split('.');
      const [
        currentMajor,
        currentMinor,
        currentPatch
      ] = version.split('.');
      // Determine if a higher version number exists
      const matchMajor = (currentMajor === nextMajor);
      const matchMinor = (currentMinor === nextMinor);
      upgradeAvailable = (
        nextMajor > currentMajor
        || (matchMajor && nextMinor > currentMinor)
        || (matchMajor && matchMinor && nextPatch > currentPatch)
      );
      // If the user has explicitly skipped this update
      // if (settings.upgradeSkip === constants.version) {
      //   upgradeAvailable = false;
      // }
    }
    if (!upgradeAvailable) return false;
    return (
      <React.Fragment>
        <Segment attached="top" color="green" textAlign="center">
          <Image centered src={Logo} size="tiny" />
          <Header>
            v{update.version}
            <Header.Subheader>
              Now available!
            </Header.Subheader>
          </Header>
        </Segment>
        <Segment attached="bottom" secondary stacked>
          <Modal
            closeIcon
            onOpen={this.toggle}
            onClose={this.toggle}
            open={open}
            size="tiny"
            trigger={(
              <Button
                content="View Details"
                icon="chevron circle up"
                fluid
                primary
              />
            )}
          >
            <Header
              size="small"
            >
              <Image centered src={Logo} size="tiny" />
              <Header.Content>
                Anchor v{update.version}
                <Header.Subheader>
                  {update.header}
                </Header.Subheader>
              </Header.Content>
            </Header>
            <Modal.Content>
              <p>An update for Anchor is now available and information about this recent release is included below.</p>
              <Form style={{ marginBottom: '1em' }}>
                <Header size="tiny">
                  {update.version} Release Notes
                </Header>
                <Form.TextArea rows={6}>
                  {update.description}
                </Form.TextArea>
              </Form>
              <p>For further information about this release, please visit our GitHub releases page.</p>
              <Container textAlign="center">
                <DangerLink
                  content={(
                    <Form.Button
                      content="View Update on GitHub"
                      icon="github"
                      primary
                    />
                  )}
                  link={`https://github.com/greymass/eos-voter/releases/tag/v${update.version}`}
                />
              </Container>
            </Modal.Content>
            <Modal.Actions>
              <Header size="small">
                Would you like to automatically update?
              </Header>
              <Button basic color='red' onClick={this.toggle}>
                <Icon name='remove' /> No
              </Button>
              <Button color='green' onClick={this.checkForUpdates}>
                <Icon name='checkmark' /> Yes
              </Button>
            </Modal.Actions>
          </Modal>
        </Segment>
      </React.Fragment>
    );
  }
}

export default OverviewSidebarUpdate;
