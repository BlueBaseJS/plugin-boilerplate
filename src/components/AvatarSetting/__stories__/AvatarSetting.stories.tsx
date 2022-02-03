import { List, View } from '@bluebase/components';

import React from 'react';
import { getComponent } from '@bluebase/core';
import storiesOf from '@bluebase/storybook-addon';

const AvatarSetting = getComponent('AvatarSetting');
storiesOf('AvatarSetting', module).add('With default props', () => (
	<View>
		<List.Item
			title="Title"
			description="desc"
			left={<List.Avatar type="image" image={{ uri: 'https://placeimg.com/400/400/people' }} />}
		/>
		<AvatarSetting
			id="UGVyc29uOjVjMjMyYzQzMTk1NTE0MzliZTEyZTc2ZQ=="
			source={{ uri: 'https://placeimg.com/400/400/people' }}
			type={'Person'}
		/>
	</View>
));
