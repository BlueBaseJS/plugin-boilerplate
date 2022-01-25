import { getComponent } from '@bluebase/core';
import storiesOf from '@bluebase/storybook-addon';
import React from 'react';

import { AvatarMarkerProps } from '../AvatarMarker';

const AvatarMarker = getComponent<AvatarMarkerProps>('AvatarMarker');

const stories = storiesOf('AvatarMarker', module);

stories.add('AvatarMarker', () => (
	<AvatarMarker type="image" image={{ uri: 'https://placeimg.com/200/200/people' }} />
));
