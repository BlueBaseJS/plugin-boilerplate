export type LocationCoordinates = { latitude: number; longitude: number };

export type LocationObject = LocationCoordinates & {
	latitudeDelta?: number;
	longitudeDelta?: number;
};
