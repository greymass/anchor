// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Button, Header, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

type Props = {
  settings: object
};

export default class Index extends Component<Props> {
  props: Props;

  close = () => {
    window.close();
  }

  render() {
    return (
      <I18n ns="basic">
        {
          (t) => (
            <div style={{ margin: '2px' }}>
              <Segment
                attached="top"
                color="black"
                inverted
                textAlign="left"
                style={{ WebkitAppRegion: 'drag' }}
              >
                <Header>
                  {t('title')}
                </Header>
              </Segment>
              <Segment attached>
                Text!
              </Segment>
            </div>
          )
        }
      </I18n>
    );
  }
}
