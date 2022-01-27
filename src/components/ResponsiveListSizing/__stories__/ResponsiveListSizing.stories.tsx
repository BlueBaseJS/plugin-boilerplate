import { BlueBase, BlueBaseApp, getComponent } from '@bluebase/core';
import { Card, DynamicIcon, FlatList, Image, Subtitle1 } from '@bluebase/components';
import { Dimensions, View } from 'react-native';

import React from 'react';
import { ResponsiveListSizingData } from '../../../hooks';
import { ResponsiveListSizingProps } from '../ResponsiveListSizing';
import bootOptions from '../../../../boot';
import { plugins } from './plugins';
import storiesOf from '@bluebase/storybook-addon';

const StatusIcon = getComponent('StatusIcon');

export const SampleCard = ({ width }: any) => {
	return (
		<Card>
			<View>
				<Image
					source={{
						uri:
							// eslint-disable-next-line max-len
							'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYfMPcAxyire9wgMx8r5ePPbLe-U66ky2Rn_6md69I9KgBzRNM&s',
					}}
					style={{ height: 180, width }}
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

const ResponsiveListSizing = getComponent<ResponsiveListSizingProps>('ResponsiveListSizing');

const NavigationActions = ({ children }: any) => children({ push: () => {} });

const filters = {
	'bluebase.boot.end': (_bootOpts: any, _ctx: any, BB: BlueBase) =>
		// Adding mocked NavigationActions
		BB.Components.register('NavigationActions', NavigationActions),
};

const data = [
	{
		thingId: '1',
		name: 'My AC name that is very long',
		online: true,
		importantState: '26 °C',
		image: { uri: 'https://placeimg.com/400/400/any' },
	},
	{
		thingId: '2',
		name: 'My AC name that is very long',
		online: true,
		importantState: '26 °C',
		image: { uri: 'https://placeimg.com/400/400/any' },
		lastActivityTime: '2019-04-20T12:10:54.859Z',
	},
	{
		thingId: '3',
		name: 'My AC name that is very long',
		online: true,
		importantState: '26 °C',
		image: { uri: 'https://placeimg.com/400/400/any' },
	},
	{
		thingId: '4',
		name: 'My AC name that is very long',
		online: true,
		importantState: '26 °C',
		image: { uri: 'https://placeimg.com/400/400/any' },
	},
	{
		thingId: '5',
		name: 'My AC name that is very long',
		online: true,
		importantState: '26 °C',
		image: { uri: 'https://placeimg.com/400/400/any' },
		lastActivityTime: '2019-04-20T12:10:54.859Z',
	},
	{
		thingId: '6',
		name: 'My AC name that is very long',
		online: true,
		importantState: '26 °C',
		image: { uri: 'https://placeimg.com/400/400/any' },
	},
	{
		thingId: '7',
		name: 'My AC name that is very long',
		online: true,
		importantState: '26 °C',
		image: { uri: 'https://placeimg.com/400/400/any' },
	},
	{
		thingId: '8',
		name: 'My AC name that is very long',
		online: true,
		importantState: '26 °C',
		image: { uri: 'https://placeimg.com/400/400/any' },
		lastActivityTime: '2019-04-20T12:10:54.859Z',
	},
	{
		thingId: '9',
		name: 'My AC name that is very long',
		online: true,
		importantState: '26 °C',
		image: { uri: 'https://placeimg.com/400/400/any' },
	},
	{
		thingId: '10',
		name: 'My AC name that is very long',
		online: true,
		importantState: '26 °C',
		image: { uri: 'https://placeimg.com/400/400/any' },
	},
	{
		thingId: '11',
		name: 'My AC name that is very long',
		online: true,
		importantState: '26 °C',
		image: { uri: 'https://placeimg.com/400/400/any' },
		lastActivityTime: '2019-04-20T12:10:54.859Z',
	},
	{
		thingId: '12',
		name: 'My AC name that is very long',
		online: true,
		importantState: '26 °C',
		image: { uri: 'https://placeimg.com/400/400/any' },
	},
];

const keyExtractor = (item: any) => item.thingId;

const renderItem =
	(variables: ResponsiveListSizingData) =>
	({ item }: any) =>
		(
			<View style={{ padding: variables.itemPadding }}>
				<SampleCard {...item} width={variables.itemWidth} />
			</View>
		);

storiesOf('ResponsiveListSizing: Grid', module)
	.add('ResponsiveListSizing with screen size xs', () => {
		return (
			<View style={{ width: 300, backgroundColor: 'rgba(0,0,0,.05)' }}>
				<BlueBaseApp {...bootOptions} plugins={plugins} filters={filters}>
					<ResponsiveListSizing>
						{(sizes: ResponsiveListSizingData) => (
							<FlatList
								data={data}
								contentContainerStyle={{
									alignSelf: 'center',
									padding: sizes.containerPadding,
									width: sizes.containerWidth,
								}}
								numColumns={sizes.numColumns}
								keyExtractor={keyExtractor}
								renderItem={renderItem(sizes)}
							/>
						)}
					</ResponsiveListSizing>
				</BlueBaseApp>
			</View>
		);
	})
	.add('Odd avatar size (non Int)', () => {
		return (
			<View style={{ width: 750, backgroundColor: 'rgba(0,0,0,.05)' }}>
				<BlueBaseApp {...bootOptions} plugins={plugins} filters={filters}>
					<ResponsiveListSizing>
						{(sizes: ResponsiveListSizingData) => (
							<FlatList
								data={data}
								contentContainerStyle={{
									alignSelf: 'center',
									padding: sizes.containerPadding,
									width: sizes.containerWidth,
								}}
								numColumns={sizes.numColumns}
								keyExtractor={keyExtractor}
								renderItem={renderItem(sizes)}
							/>
						)}
					</ResponsiveListSizing>
				</BlueBaseApp>
			</View>
		);
	})
	.add('ResponsiveListSizing with screen size md', () => {
		return (
			<View style={{ width: 990, backgroundColor: 'rgba(0,0,0,.05)' }}>
				<BlueBaseApp {...bootOptions} plugins={plugins} filters={filters}>
					<ResponsiveListSizing>
						{(sizes: ResponsiveListSizingData) => (
							<FlatList
								data={data}
								contentContainerStyle={{
									alignSelf: 'center',
									padding: sizes.containerPadding,
									width: sizes.containerWidth,
								}}
								numColumns={sizes.numColumns}
								keyExtractor={keyExtractor}
								renderItem={renderItem(sizes)}
							/>
						)}
					</ResponsiveListSizing>
				</BlueBaseApp>
			</View>
		);
	})
	.add('ResponsiveListSizing with screen size lg', () => {
		return (
			<View style={{ width: 1100, backgroundColor: 'rgba(0,0,0,.05)' }}>
				<BlueBaseApp {...bootOptions} plugins={plugins} filters={filters}>
					<ResponsiveListSizing>
						{(sizes: ResponsiveListSizingData) => (
							<FlatList
								data={data}
								contentContainerStyle={{
									alignSelf: 'center',
									padding: sizes.containerPadding,
									width: sizes.containerWidth,
								}}
								numColumns={sizes.numColumns}
								keyExtractor={keyExtractor}
								renderItem={renderItem(sizes)}
							/>
						)}
					</ResponsiveListSizing>
				</BlueBaseApp>
			</View>
		);
	})
	.add('ResponsiveListSizing with screen size xl', () => {
		return (
			<View style={{ width: 1300, backgroundColor: 'rgba(0,0,0,.05)' }}>
				<BlueBaseApp {...bootOptions} plugins={plugins} filters={filters}>
					<ResponsiveListSizing>
						{(sizes: ResponsiveListSizingData) => (
							<FlatList
								data={data}
								contentContainerStyle={{
									alignSelf: 'center',
									padding: sizes.containerPadding,
									width: sizes.containerWidth,
								}}
								numColumns={sizes.numColumns}
								keyExtractor={keyExtractor}
								renderItem={renderItem(sizes)}
							/>
						)}
					</ResponsiveListSizing>
				</BlueBaseApp>
			</View>
		);
	});

storiesOf('ResponsiveListSizing: Carousel', module)
	.add('ResponsiveListSizing with screen size xs', () => {
		Dimensions.get('window').width = 300;
		return (
			<View style={{ width: 300 }}>
				<BlueBaseApp {...bootOptions} plugins={plugins} filters={filters}>
					<ResponsiveListSizing>
						{(variables: ResponsiveListSizingData) => (
							<FlatList
								data={data}
								contentContainerStyle={{ padding: variables.containerPadding }}
								keyExtractor={keyExtractor}
								horizontal
								renderItem={renderItem({ ...variables, itemWidth: variables.itemWidth - 10 })}
							/>
						)}
					</ResponsiveListSizing>
				</BlueBaseApp>
			</View>
		);
	})
	.add('ResponsiveListSizing with screen size sm', () => {
		Dimensions.get('window').width = 750;
		return (
			<View style={{ width: 750 }}>
				<BlueBaseApp {...bootOptions} plugins={plugins} filters={filters}>
					<ResponsiveListSizing>
						{(variables: ResponsiveListSizingData) => (
							<FlatList
								data={data}
								contentContainerStyle={{ padding: variables.containerPadding }}
								keyExtractor={keyExtractor}
								horizontal
								renderItem={renderItem({ ...variables, itemWidth: variables.itemWidth - 10 })}
							/>
						)}
					</ResponsiveListSizing>
				</BlueBaseApp>
			</View>
		);
	})
	.add('ResponsiveListSizing with screen size md', () => {
		Dimensions.get('window').width = 990;
		return (
			<View style={{ width: 990 }}>
				<BlueBaseApp {...bootOptions} plugins={plugins} filters={filters}>
					<ResponsiveListSizing>
						{(variables: ResponsiveListSizingData) => (
							<FlatList
								data={data}
								contentContainerStyle={{ padding: variables.containerPadding }}
								keyExtractor={keyExtractor}
								horizontal
								renderItem={renderItem({ ...variables, itemWidth: variables.itemWidth - 10 })}
							/>
						)}
					</ResponsiveListSizing>
				</BlueBaseApp>
			</View>
		);
	})
	.add('ResponsiveListSizing with screen size lg', () => {
		Dimensions.get('window').width = 1100;
		return (
			<View style={{ width: 1100 }}>
				<BlueBaseApp {...bootOptions} plugins={plugins} filters={filters}>
					<ResponsiveListSizing>
						{(variables: ResponsiveListSizingData) => (
							<FlatList
								data={data}
								contentContainerStyle={{ padding: variables.containerPadding }}
								keyExtractor={keyExtractor}
								horizontal
								renderItem={renderItem({ ...variables, itemWidth: variables.itemWidth - 10 })}
							/>
						)}
					</ResponsiveListSizing>
				</BlueBaseApp>
			</View>
		);
	})
	.add('ResponsiveListSizing with screen size xl', () => {
		Dimensions.get('window').width = 1300;
		return (
			<View style={{ width: 1300 }}>
				<BlueBaseApp {...bootOptions} plugins={plugins} filters={filters}>
					<ResponsiveListSizing>
						{(variables: ResponsiveListSizingData) => (
							<FlatList
								data={data}
								contentContainerStyle={{ padding: variables.containerPadding }}
								keyExtractor={keyExtractor}
								horizontal
								renderItem={renderItem({ ...variables, itemWidth: variables.itemWidth - 10 })}
							/>
						)}
					</ResponsiveListSizing>
				</BlueBaseApp>
			</View>
		);
	});
