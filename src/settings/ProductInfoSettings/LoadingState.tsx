import React from 'react';
import { getComponent } from '@bluebase/core';

const SkeletonListItem = getComponent('SkeletonListItem');

export const ProductInfoLoadingState = () => <SkeletonListItem avatar description />;
ProductInfoLoadingState.displayName = 'ProductInfoLoadingState';
