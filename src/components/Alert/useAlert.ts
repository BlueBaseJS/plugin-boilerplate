import { Alert } from 'react-native';

export function useAlert() {
	return { alert: Alert.alert };
}
