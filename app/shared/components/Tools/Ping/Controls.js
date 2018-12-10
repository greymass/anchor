// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import {
  Button,
  Checkbox,
} from 'semantic-ui-react';

import ToolsPingControlsStart from './Controls/Start';

class ToolsPingControls extends Component<Props> {
  render() {
    const {
      onCancel,
      onResume,
      onStop,
      onStart,
      onToggleUnsupported,
      results,
      run,
      showUnsupported,
      settings,
      t,
    } = this.props;
    if (!settings.acceptedPingInterface) return false;
    return (
      <React.Fragment>
        {(run && results > 0)
          ? (
            <Button
              color="red"
              content={t('button_stop')}
              icon="stop"
              onClick={() => onStop()}
            />
          )
          : false
        }
        {(!run && results > 0)
          ? (
            <Button
              color="green"
              content={t('button_resume')}
              icon="play"
              onClick={onResume}
            />
          )
          : false
        }
        <ToolsPingControlsStart
          onStart={onStart}
          results={results}
          run={run}
        />
        {(!run && results > 0)
          ? (
            <Button
              content={t('button_reset')}
              icon="x"
              onClick={onCancel}
            />
          )
          : false
        }
        {(!run && results > 0)
          ? (
            <Checkbox
              checked={showUnsupported}
              label={t('checkbox_show_unsupported')}
              onChange={onToggleUnsupported}
            />
          )
          : false
        }
      </React.Fragment>
    );
  }
}

export default translate('ping')(ToolsPingControls);
