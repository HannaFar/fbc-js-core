/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 *
 */

import * as React from 'react';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import {ObjectViewer} from './AlertDetailsPane';
import {useAlarmContext} from '../../AlarmContext';
import type {AlertViewerProps} from '../../rules/RuleInterface';

export default function MetricAlertViewer({alert}: AlertViewerProps) {
  const {filterLabels} = useAlarmContext();
  const {labels, annotations} = alert || {};
  const {alertname: _a, severity: _s, ...extraLabels} = labels || {};
  const {description, ...extraAnnotations} = annotations || {};
  const [showDetails, setShowDetails] = React.useState(false);
  return (
    <Grid container data-testid="metric-alert-viewer" spacing={5}>
      <Grid item>
        <Typography variant="body1">{description}</Typography>
      </Grid>
      <Grid item>
        <ObjectViewer
          object={filterLabels ? filterLabels(extraLabels) : extraLabels}
        />
      </Grid>
      <Grid item xs={12}>
        <Link
          variant="subtitle1"
          component="button"
          onClick={() => setShowDetails(!showDetails)}>
          {'Show More Details'}
        </Link>
      </Grid>
      <Grid item>
        <Collapse in={showDetails}>
          <ObjectViewer object={extraAnnotations} />
        </Collapse>
      </Grid>
    </Grid>
  );
}
