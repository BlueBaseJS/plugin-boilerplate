import { Story } from '@storybook/react';
import React from 'react';

import MyPluginIcon from '../index';
import { MyPluginIconProps } from '../MyPluginIcon';

export default {
	title: 'MyPluginIcon',
	component: MyPluginIcon,
	parameters: { actions: { argTypesRegex: '^on.*' } },
};

// 👇 We create a “template” of how args map to rendering
const Template: Story<MyPluginIconProps> = (args: any) => <MyPluginIcon {...args} />;

// 👇 Each story then reuses that template
export const DefaultSize = Template.bind({});
DefaultSize.storyName = 'Default Size';
DefaultSize.args = {
};

export const SmallSize = Template.bind({});
SmallSize.storyName = 'Small Size';
SmallSize.args = {
	size: 50,
};

export const BigSize = Template.bind({});
BigSize.storyName = 'Big Size';
BigSize.args = {
	size: 300,
};
