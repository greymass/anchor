// @flow
import React, { Component } from 'react';
import { Progress, Responsive } from 'semantic-ui-react';

export default class GlobalDataResourcePercentage extends Component<Props> {
  render() {
    const {
      color,
      displayResourcesAvailableSetting,
      percentageUsed,
      size,
      style
    } = this.props;

    const percentageToDisplay =
      (displayResourcesAvailableSetting ? (100 - percentageUsed) : percentageUsed);

    return (
      <Progress
        color={color}
        label={(
          <div className="label">
            {(percentageToDisplay || 0).toFixed(3)}%
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
