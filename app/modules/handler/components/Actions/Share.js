// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Button, Header, Icon, Label } from 'semantic-ui-react';

class PromptActionShare extends Component<Props> {
  render() {
    const {
      onClick,
      t,
    } = this.props;
    return (
      <Button
        animated="fade"
        as="div"
        floated="left"
        labelPosition="left"
        onClick={onClick}
        style={{ minHeight: '58px' }}
      >
        <Label
          as="a"
          basic
          pointing="right"
        >
          <Header textAlign="left">
            <Header.Content>
              <Header.Subheader style={{ fontWeight: 'bold' }}>
                {t('handler_action_share_subheader')}
              </Header.Subheader>
              {t('handler_action_share_header')}
            </Header.Content>
          </Header>
        </Label>
        <Button
          color="grey"
          icon
          style={{ position: 'relative' }}
        >
          <Button.Content hidden style={{ marginTop: '-0.75em' }}>
            <Icon
              name="circle help"
              size="large"
              style={{ marginRight: 0 }}
            />
          </Button.Content>
          <Button.Content visible style={{ margin: '0 1em' }}>
            <Icon
              name="help"
              size="large"
              style={{ marginRight: 0 }}
            />
          </Button.Content>
        </Button>
      </Button>
    );
  }
}

export default withTranslation('global')(PromptActionShare);
