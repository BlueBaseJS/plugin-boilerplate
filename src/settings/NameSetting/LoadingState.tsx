import React from 'react';
import { getComponent } from '@bluebase/core';

const SkeletonListItem = getComponent('SkeletonListItem');

export const LoadingState = () => <SkeletonListItem avatar description />;
