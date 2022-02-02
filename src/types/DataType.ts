export type DataType =
	| 'boolean'
	| 'color-map'
	| 'date'
	| 'enum'
	| 'geo-location'
	| 'number'
	| 'string'
	| 'vector3';

export type BooleanType = boolean;

export type ColorMapType = {
	hue: number;
	saturation: number;
};

export type DateType = Date;

export type EnumType = string;

export type GeoLocationType = {
	latitude: number;
	longitude: number;
};

export type NumberType = number;

// export type ObjectType = Object;

export type StringType = string;

export type VectorType = {
	x: number;
	y: number;
	z: number;
};

export type DataTypeValue =
	| BooleanType
	| ColorMapType
	| DateType
	| EnumType
	| GeoLocationType
	| NumberType
	| StringType
	| VectorType;
