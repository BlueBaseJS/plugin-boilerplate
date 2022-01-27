/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { VariantSelectorProps } from '../VariantSelector';
import { getComponent } from '@bluebase/core';
import storiesOf from '@bluebase/storybook-addon';

const VariantSelector = getComponent<VariantSelectorProps>('VariantSelector');

const items = [
	{
		style: { backgroundColor: 'red' },
		text: 'A',
		type: 'text',
	},
	{
		style: { backgroundColor: 'blue' },
		text: 'B',
		type: 'text',
	},
	{
		style: { backgroundColor: 'green' },
		text: 'C',
		type: 'text',
	},
];

storiesOf('Variants/Main/VariantSelector', module)
	.add('Small Size', () => (
		<VariantSelector
			ItemComponent="avatar"
			index={1}
			items={items}
			size="small"
			onChangeIndex={(i: number) => console.log(`Index ${i} pressed`)}
			onChangeHover={(i: number, hovering: boolean) => console.log(i, hovering)}
		/>
	))
	.add('Medium Size', () => (
		<VariantSelector
			ItemComponent="avatar"
			items={items}
			index={1}
			size="medium"
			onChangeIndex={(i: number) => console.log(`Index ${i} pressed`)}
			onChangeHover={(i: number, hovering: boolean) => console.log(i, hovering)}
		/>
	))
	.add('Large Size', () => (
		<VariantSelector
			ItemComponent="avatar"
			items={items}
			index={1}
			size="large"
			onChangeIndex={(i: number) => console.log(`Index ${i} pressed`)}
			onChangeHover={(i: number, hovering: boolean) => console.log(i, hovering)}
		/>
	))
	.add('Text Items', () => (
		<VariantSelector
			ItemComponent="text"
			items={[
				{
					title: 'Option 1',
					description: 'A detailed description',
				},
				{
					title: 'Option 2',
					description: 'A detailed description',
				},
			]}
			index={1}
			onChangeIndex={(i: number) => console.log(`Index ${i} pressed`)}
			onChangeHover={(i: number, hovering: boolean) => console.log(i, hovering)}
		/>
	));
