// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import {
  Button,
  Dimmer,
  Loader,
  Progress,
  Segment,
} from 'semantic-ui-react';

class ToolsPingLoader extends Component<Props> {
  render() {
    const {
      nodes,
      onCancel,
      t,
      total,
      value,
    } = this.props;
    return (
      <Segment style={{ minHeight: '400px' }}>
        <Dimmer active>
          <Loader
            indeterminate={(value <= 1)}
            size="huge"
            style={{
              color: 'white'
            }}
          >
            {t('loader_validating')}
            {' '}
            {nodes} APIs
            <p><small>{t('loader_message_1')}</small></p>
            <Progress
              color="blue"
              indicating
              inverted
              label={(
                <p>
                  <small style={{ color: 'white' }}>
                    {(value > 0)
                      ? t('loader_progress_text', {
                          complete: value,
                          total
                        })
                      : t('loader_initializing')
                    }
                  </small>
                </p>
              )}
              precision="0"
              progress
              total={total}
              value={value}
            />
            {(value > 0)
              ? (
                <Button
                  color="red"
                  content={t('cancel')}
                  icon="stop"
                  onClick={onCancel}
                />
              )
              : false
            }
          </Loader>
        </Dimmer>
      </Segment>
    );
  }
}

export default translate('ping')(ToolsPingLoader);
