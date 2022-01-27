import { BlueBaseApp, getComponent } from '@bluebase/core';
import { Card, DynamicIcon, Image, Subtitle1, View } from '@bluebase/components';

import MUIplugin from '@bluebase/plugin-material-ui';
// import MevrisClientPluginUi from '@mevris/client-plugin-ui';
import Plugin from '../../../index';
import React from 'react';
// import { SkeletonCard } from '../SkeletonCard';
// import { View } from 'react-native';
import storiesOf from '@bluebase/storybook-addon';

const StatusIcon = getComponent('StatusIcon');

const SkeletonCard = getComponent('SkeletonCard');
const stories = storiesOf('SkeletonCard', module);
export const SampleCard = () => {
	return (
		<Card style={{ width: 170 }}>
			<View>
				<Image
					source={{
						uri:
							// eslint-disable-next-line max-len
							'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYfMPcAxyire9wgMx8r5ePPbLe-U66ky2Rn_6md69I9KgBzRNM&s',
					}}
					style={{ height: 180, width: 170 }}
				/>
			</View>

			<View style={{ padding: 8 }}>
				<View
					style={{
						alignItems: 'center',
						flexDirection: 'row',
					}}
				>
					<Subtitle1
						testID="thingcard-name-text"
						style={{ flex: 1 }}
						ellipsizeMode="tail"
						numberOfLines={1}
					>
						abc
					</Subtitle1>
					<View testID="thingcard-status-icon" style={{ paddingLeft: 8 }}>
						<StatusIcon />
					</View>
				</View>

				<View
					style={{
						alignItems: 'center',
						flex: 1,
						flexDirection: 'row',
					}}
				>
					<DynamicIcon
						testID="thingcard-activity-icon"
						type="icon"
						name="clock-outline"
						// style={styles.lastActivityTimeIcon}
						size={13}
					/>
				</View>
			</View>
		</Card>
	);
};

stories
	.add('PlaceCard Skeleton with default width', () => (
		<BlueBaseApp plugins={[Plugin, MUIplugin]}>
			<SkeletonCard />
		</BlueBaseApp>
	))
	.add('PlaceCard Skeleton with width props', () => (
		// <View style={{ flexDirection: 'row' }}>
		<BlueBaseApp plugins={[Plugin, MUIplugin]}>
			<SkeletonCard width={170} />

			<SampleCard />
		</BlueBaseApp>
		// </View>
	));
