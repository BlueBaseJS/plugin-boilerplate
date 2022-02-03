// import { SkeletonListItemProps } from '../SkeletonListItem';
import { BlueBaseApp, getComponent } from '@bluebase/core';

import { BlueBaseImage } from '@bluebase/core/dist/components';
import { List } from '@bluebase/components';
import MUIplugin from '@bluebase/plugin-material-ui';
import Plugin from '../../../index';
import React from 'react';
import { SkeletonListItemProps } from '../SkeletonListItem';
// import { SkeletonListItem } from '../SkeletonListItem';
import storiesOf from '@bluebase/storybook-addon';

const SkeletonListItem = getComponent<SkeletonListItemProps>('SkeletonListItem');
const stories = storiesOf('SkeletonListItem', module);

stories
	.add('ListItem Skeleton with default props', () => (
		<BlueBaseApp plugins={[Plugin]}>
			<SkeletonListItem />
		</BlueBaseApp>
	))
	.add('ListItem Skeleton with avatar prop', () => (
		<BlueBaseApp plugins={[Plugin, MUIplugin]}>
			<SkeletonListItem avatar={true} />
		</BlueBaseApp>
	))
	.add('ListItem Skeleton with description prop', () => (
		<BlueBaseApp plugins={[Plugin, MUIplugin]}>
			<SkeletonListItem description={true} />
		</BlueBaseApp>
	))
	.add('ListItem Skeleton with description and avatar', () => (
		<>
			<BlueBaseApp plugins={[Plugin, MUIplugin]}>
				<SkeletonListItem avatar={true} description={true} />
			</BlueBaseApp>
			<List.Item
				left={<List.Avatar type="text" text="B" />}
				title="Sample"
				description="Reference"
			/>
		</>
	))

	.add('ListItem Skeleton with all props avatar circle', () => (
		<>
			<BlueBaseApp plugins={[Plugin, MUIplugin]}>
				<SkeletonListItem avatar={true} description={true} variant="circle" />
			</BlueBaseApp>
			<List.Item
				left={<List.Avatar type="text" text="B" />}
				title="Sample"
				description="Reference"
			/>
		</>
	))
	.add('ListItem Skeleton with all props avatar rounded', () => (
		<>
			<BlueBaseApp plugins={[Plugin, MUIplugin]}>
				<SkeletonListItem avatar={true} description={true} variant="rounded" />
			</BlueBaseApp>
			<List.Item
				left={<List.Avatar type="text" text="B" variant="rounded" style={{ borderRadius: 4 }} />}
				title="Sample"
				description="Reference"
			/>
		</>
	))
	.add('ListItem Skeleton with all props avatar square', () => (
		<>
			<BlueBaseApp plugins={[Plugin, MUIplugin]}>
				<SkeletonListItem avatar={true} description={true} variant="square" />
			</BlueBaseApp>
			<List.Item
				left={<List.Avatar type="text" text="B" variant="square" style={{ borderRadius: 0 }} />}
				title="Sample"
				description="Reference"
			/>
		</>
	))
	.add('ListItem Skeleton with all props avatar icon', () => (
		<>
			<BlueBaseApp plugins={[Plugin, MUIplugin]}>
				<SkeletonListItem
					avatar={true}
					description={true}
					variant="icon"
					styles={{
						media: {
							height: 26,
							width: 24,
						},
					}}
				/>
			</BlueBaseApp>
			<List.Item left={<List.Icon name="delete" />} title="Sample" description="Reference" />
		</>
	))
	.add('ListItem Skeleton with all props avatar image', () => (
		<>
			<BlueBaseApp plugins={[Plugin, MUIplugin]}>
				<SkeletonListItem
					avatar={true}
					description={true}
					variant="rounded"
					styles={{
						media: {
							height: 32,
							width: 32,
						},
					}}
				/>
			</BlueBaseApp>
			<List.Item
				left={
					<BlueBaseImage
						source={{ uri: 'https://placeimg.com/50/50/any' }}
						style={{ borderRadius: 4, height: 32, width: 32 }}
					/>
				}
				title="Sample"
				description="Reference"
			/>
		</>
	));
