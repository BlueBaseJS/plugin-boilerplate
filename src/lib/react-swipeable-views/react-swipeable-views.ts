import SwipeableViewsLib from 'react-swipeable-views';
// import { autoPlay } from 'react-swipeable-views-utils';
// const autoPlay = require('react-swipeable-views-utils').autoPlay;
import { autoPlay } from './autoPlay';

// import SwipeableViews from 'react-swipeable-views-native/lib/SwipeableViews.scroll';

// export const SwipeableViews = SwipeableViewsLib;
export const SwipeableViews = autoPlay(SwipeableViewsLib);
