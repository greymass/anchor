// @flow
import React, { PureComponent } from 'react';
import { Form, Header, Image, Segment } from 'semantic-ui-react';

import DangerLink from '../../../../../shared/containers/Global/DangerLink';
import Logo from '../../../../../renderer/assets/images/anchor-logo.svg';

class OverviewSidebarUpdate extends PureComponent<Props> {
  render() {
    const {
      update,
    } = this.props;
    if (!update) return false;
    return (
      <React.Fragment>
        <Segment attached="top" color="green" textAlign="center">
          <Image centered src={Logo} size="tiny" />
          <Header>
            New Release!
          </Header>
        </Segment>
        <Segment attached="bottom" secondary stacked>
          <Header
            content={update.header}
            size="small"
            subheader={`v${update.version}`}
          />
          <Form style={{ marginBottom: '1em' }}>
            <Form.TextArea rows={6}>
              {update.description}
            </Form.TextArea>
          </Form>
          <DangerLink
            content={(
              <Form.Button
                content="View on GitHub"
                icon="github"
                fluid
                primary
              />
            )}
            link={`https://github.com/greymass/eos-voter/releases/tag/v${update.version}`}
          />
        </Segment>
      </React.Fragment>
    );
  }
}

export default OverviewSidebarUpdate;
