import BlueBasePluginApollo from '@bluebase/plugin-apollo';
import BlueBasePluginJsonSchemaComponents from '@bluebase/plugin-json-schema-components';
import BlueBasePluginLauncher from '@bluebase/plugin-launcher';
import BlueBasePluginReactNativePaper from '@bluebase/plugin-react-native-paper';
import BlueBasePluginReactNavigation from '@bluebase/plugin-react-navigation';
import BlueBasePluginResponsiveGrid from '@bluebase/plugin-responsive-grid';
import BlueBasePluginSettingsApp from '@bluebase/plugin-settings-app';
import { MaterialCommunityIcons } from '@bluebase/plugin-vector-icons';
import BluebasePluginRnPlaceholder from '@bluebase/plugin-rn-placeholder';
import BlueBasePluginGraphqlSchemaComponents from '@bluebase/plugin-json-graphql-components';

import Plugin from './src';

export const plugins = [
	BlueBasePluginApollo,
	BlueBasePluginJsonSchemaComponents,
	BlueBasePluginLauncher,
	BlueBasePluginReactNativePaper,
	BlueBasePluginReactNavigation,
	BlueBasePluginResponsiveGrid,
	MaterialCommunityIcons,
	Plugin,
	BlueBasePluginSettingsApp,
	BlueBasePluginGraphqlSchemaComponents,
	BluebasePluginRnPlaceholder
];
