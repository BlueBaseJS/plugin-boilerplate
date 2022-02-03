import BlueBasePluginJsonSchemaComponents from '@bluebase/plugin-json-schema-components';
import BlueBasePluginGraphqlSchemaComponents from '@bluebase/plugin-json-graphql-components';

import BlueBasePluginLauncher from '@bluebase/plugin-launcher';
import BlueBasePluginMaterialUI from '@bluebase/plugin-material-ui';
import BlueBasePluginReactRouter from '@bluebase/plugin-react-router';
import BlueBasePluginResponsiveGrid from '@bluebase/plugin-responsive-grid';
import BlueBasePluginSettingsApp from '@bluebase/plugin-settings-app';
import BlueBasePluginApollo from '@bluebase/plugin-apollo';
import { MaterialCommunityIcons } from '@bluebase/plugin-vector-icons';
import BluebasePluginRnPlaceholder from '@bluebase/plugin-rn-placeholder';
import Plugin from './src';

export const plugins = [
	BlueBasePluginApollo,
	BlueBasePluginJsonSchemaComponents,
	BlueBasePluginLauncher,
	BlueBasePluginMaterialUI,
	BlueBasePluginReactRouter,
	BlueBasePluginResponsiveGrid,
	MaterialCommunityIcons,
	Plugin,
	BlueBasePluginSettingsApp,
	BluebasePluginRnPlaceholder,
	BlueBasePluginGraphqlSchemaComponents
];
