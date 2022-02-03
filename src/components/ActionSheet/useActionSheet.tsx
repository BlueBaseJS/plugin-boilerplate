import { ActionSheetDesktopContext } from './withActionSheetProvider';
import { Platform } from 'react-native';
import { useActionSheet as useActionSheetExpo } from '@expo/react-native-action-sheet';
import { useContext } from 'react';
export function useActionSheet() {
	const { showActionSheetWithOptions } = useActionSheetExpo();
	const { showActionSheetOrDialogWithOptions: _showActionSheetOrDialogWithOptions } = useContext(
		ActionSheetDesktopContext
	);
	const showActionSheetOrDialogWithOptions = Platform.OS !== 'web'
		? showActionSheetWithOptions
		: _showActionSheetOrDialogWithOptions;

	return { showActionSheetOrDialogWithOptions, showActionSheetWithOptions };
}