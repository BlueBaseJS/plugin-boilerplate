import { MetaListItemProps } from '..';
import React from 'react';
import { getComponent } from '@bluebase/core';
import storiesOf from '@bluebase/storybook-addon';

const MetaListItem = getComponent<MetaListItemProps>('MetaListItem');

storiesOf('MetaListItem', module)
	.add('MetaListItem with title and description prop', () => (
		<MetaListItem title="Foo" description="Bar" />
	))

	.add('loading state', () => <MetaListItem title="Foo" description="Bar" loading divider />)
	.add('MetaListItem with divider prop', () => (
		<MetaListItem title="Foo" description="Bar" divider={true} />
	))
	.add('MetaListItem with style prop', () => (
		<MetaListItem title="Foo" description="Bar" style={{ backgroundColor: 'yellow' }} />
	))
	.add('MetaListItem with styles prop of title', () => (
		<MetaListItem
			title="Foo"
			description="Bar"
			styles={{
				title: {
					backgroundColor: 'red',
				},
			}}
		/>
	))
	.add('MetaListItem with styles prop of description', () => (
		<MetaListItem
			title="Foo"
			description="Bar"
			styles={{
				description: {
					fontWeight: 'bold',
				},
			}}
		/>
	))
	.add('MetaListItem with styles prop of root', () => (
		<MetaListItem
			title="Foo"
			description="Bar"
			styles={{
				root: {
					padding: 24,
				},
			}}
		/>
	))
	.add('MetaListItem with styles prop of divider', () => (
		<MetaListItem
			title="Foo"
			description="Bar"
			divider={true}
			styles={{
				divider: {
					borderBottomColor: 'black',
				},
			}}
		/>
	))
	.add('MetaListItem with All the  prop', () => (
		<MetaListItem
			title="Foo"
			description="Bar"
			divider
			style={{ backgroundColor: 'yellow' }}
			styles={{
				title: {
					fontWeight: 'bold',
				},
				description: {
					fontWeight: 'bold',
				},
				root: {
					padding: 24,
				},
				divider: {
					borderBottomColor: 'black',
				},
			}}
		/>
	));
