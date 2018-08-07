// @flow
import React, { Component } from 'react';
import { Progress, Responsive } from 'semantic-ui-react';

export default class GlobalDataResourcePercentage extends Component<Props> {
  render() {
    const {
      color,
      displayResourcesUsedSetting,
      percentageUsed,
      size,
      style
    } = this.props;

    const percentageToDisplay =
      (displayResourcesUsedSetting ? percentageUsed : (100 - percentageUsed));

    return (
      <Progress
        color={color}
        label={(
          <div className="label">
            {percentageToDisplay}%
            {' '}
            <Responsive as="span" minWidth={800} />
          </div>
        )}
        percent={percentageToDisplay}
        size={size}
        style={style}
      />
    );
  }
}
