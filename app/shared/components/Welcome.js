// @flow
import React, { Component } from 'react';
import { Grid, Image, Header, Message, Segment } from 'semantic-ui-react';
import { I18n } from 'react-i18next';
import FormConnectionContainer from '../containers/Form/Connection';
import eos from '../../renderer/assets/images/eos.png';

const { shell } = require('electron');

export default class About extends Component<Props> {
  openLink = (url) => shell.openExternal(url);

  render() {
    return (
      <I18n ns="welcome">
        {
          (t) => (
            <div className="login-form">
              {/*
                Heads up! The styles below are necessary for the correct render of this example.
                You can do same with CSS, the main idea is that all the elements up to the `Grid`
                below must have a height of 100%.
              */}
              <style>
                {`
                  body > div,
                  body > div > div,
                  body > div > div > div.login-form {
                    height: 100%;
                  }
                `}
              </style>
              <Grid
                textAlign="center"
                style={{ height: '100%' }}
                verticalAlign="middle"
              >
                <Grid.Column style={{ maxWidth: 450 }}>
                  <Header
                    color="teal"
                    textAlign="center"
                  >
                    <Image src={eos} />
                    <Header.Content>
                      {t('application_name')}
                      <Header.Subheader>
                        {t('application_version')}
                      </Header.Subheader>
                    </Header.Content>
                  </Header>
                  <Segment
                    size="small"
                    stacked
                  >
                    <p>{t('welcome_instructions_1')}</p>
                    <FormConnectionContainer />
                    <p>{t('welcome_instructions_2')}</p>
                  </Segment>
                  <Message info>
                    {t('welcome_more_servers_1')}
                    <p>
                      <a
                        onClick={() => this.openLink('https://github.com/greymass/eos-voter/blob/master/nodes.md')}
                        role="link"
                      >
                        {t('welcome_more_servers_2')}
                      </a>
                    </p>
                  </Message>
                </Grid.Column>
              </Grid>
            </div>
          )
        }
      </I18n>
    );
  }
}
