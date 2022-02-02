import { RouteOptions, isMobile } from '@bluebase/core';
import {
	ThingAppAddButton,
	ThingAppBackButton,
	ThingSettingsBackButton,
} from '../components/exports';

import { Platform } from 'react-native';
import React from 'react';
import { RouteConfig } from '@bluebase/components';
import { createSettingsRoutes } from '@bluebase/plugin-settings-app';
import { desktopRoutes } from './desktop';
import { mobileRoutes } from './mobile';

export const routes = async (options: RouteOptions): Promise<RouteConfig[]> => {
	const { BB, intl } = options;
	const profilePageRoutes = isMobile() ? await mobileRoutes(options) : await desktopRoutes(options);

	const defaultRoutes = [
		{
			exact: true,
			name: 'ThingsApp',
			path: '',
			screen: 'ThingsAppScreen',

			options: () => {
				const headerLeft = Platform.OS === 'web' ? () => <ThingAppBackButton /> : undefined;
				const headerRight = () => <ThingAppAddButton />;

				return {
					headerLeft,
					headerRight,
					title: intl.__('Things'),
				};
			},
		},

		// settings page
		...createSettingsRoutes({
			filter: 'mevris.app.things.settings',

			mainRoute: {
				name: 'ThingSettings',
				path: ':thingId/settings',

				// We do this to check for 404, etc
				screen: 'ThingSettingsScreen',

				options: () => {
					const headerLeft = Platform.OS === 'web' ? <ThingSettingsBackButton /> : undefined;

					return {
						headerLeft,
						title: intl.__('Thing Settings'),
					};
				},
			},

			pages: [
				{
					name: 'ThingSettingsGeneral',
					path: 'general',

					options: {
						drawerIcon: { type: 'icon', name: 'cog' },
						drawerLabel: 'General',
						title: 'General Settings',
					} as any,

					items: [
						{
							component: 'ThingGeneralSettings',
							description: 'Give your device a name and assign a site.',
							name: 'ThingGeneralSettings',
							title: 'General Information',
						},
						{
							component: 'ThingDisplayPictureSettings',
							description: 'Give your device a display picture.',
							name: 'ThingDisplayPictureSettings',
							title: 'Display Picture',
						},
						{
							component: 'ThingDangerSettings',
							description: 'All data related to your asset will be lost.',
							name: 'ThingDangerSettings',
							title: 'Danger Zone',
						},
					],
				},
				{
					name: 'ThingSettingsWifi',
					path: 'wifi',

					options: {
						drawerIcon: { type: 'icon', name: 'wifi' },
						drawerLabel: 'Wi-Fi',
						title: 'Wi-Fi Settings',
					} as any,

					items: [
						{
							component: 'ThingWifiSettings',
							description: 'View your asset network configurations.',
							name: 'ThingWifiSettings',
							title: 'Configurations',
						},
					],
				},
				{
					name: 'ThingSettingsInformation',
					path: 'information',

					options: {
						drawerIcon: { type: 'icon', name: 'information' },
						drawerLabel: 'About',
						title: 'About',
					} as any,

					items: [
						{
							component: 'ThingProductDetailSettings',
							description: 'You can check all the detail of your thing here',
							name: 'ThingProductDetailSettings',
							title: 'Thing Info',
						},
						{
							component: 'ThingProductSettings',
							description: 'See the information about your product.',
							name: 'ThingProductSettings',
							title: 'Product',
						},
					],
				},
			],
		}),

		// overview page
		...profilePageRoutes,
	];

	const finalRoutes = await BB.Filters.run('mevris.app.things.routes', defaultRoutes, options);

	return finalRoutes;
};
