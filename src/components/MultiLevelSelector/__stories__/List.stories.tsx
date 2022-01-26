import { BlueBase, BlueBaseApp } from '@bluebase/core';

import BootOptions from '../../../../boot';
import { MultiLevelSelectorList } from '../List';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';

const Noop = () => {
	return;
};

const NavigationActions = ({ children }: any) => children({ navigation: Noop });

const BBWrapper = ({ children }: any) => (
	<BlueBaseApp
		{...BootOptions}
		filters={{
			'bluebase.boot.end': async (_b: any, _c: any, BB: BlueBase) => {
				await BB.Components.register('NavigationActions', NavigationActions);
			},
		}}
	>
		{children}
	</BlueBaseApp>
);

storiesOf('MultiLevelSelector/Parts/MultiLevelSelectorList', module)
	.add('Basic Example', () => {
		const Component = () => {
			// const [value, setValue] = useState(['burger']);

			return (
				<BBWrapper>
					<MultiLevelSelectorList
						// onChangeValue={setValue as any}
						showCount
						items={[
							{ id: 'pizza', title: 'Pizza', count: 1356, hasChildren: true },
							{ id: 'burger', title: 'Burger', hasChildren: true },
							{ id: 'pasta', title: 'Pasta', count: 16 },
						]}
					/>
				</BBWrapper>
			);
		};

		return <Component />;
	})
	.add('Without Multi Select', () => {
		const Component = () => {
			// const [value, setValue] = useState(['burger']);

			return (
				<BBWrapper>
					<MultiLevelSelectorList
						// onChangeValue={setValue as any}
						showCount
						items={[
							{ id: 'pizza', title: 'Pizza', count: 1356, hasChildren: true },
							{ id: 'burger', title: 'Burger', hasChildren: true },
							{ id: 'pasta', title: 'Pasta', count: 16 },
						]}
					/>
				</BBWrapper>
			);
		};

		return <Component />;
	})
	.add('Searchable', () => {
		const Component = () => {
			// const [value, setValue] = useState(['burger']);

			return (
				<BBWrapper>
					<MultiLevelSelectorList
						// onChangeValue={setValue as any}
						showCount
						searchable
						items={[
							{ id: 'pizza', title: 'Pizza', count: 1356, hasChildren: true },
							{ id: 'burger', title: 'Burger', hasChildren: true },
							{ id: 'pasta', title: 'Pasta', count: 16 },
						]}
					/>
				</BBWrapper>
			);
		};

		return <Component />;
	});
