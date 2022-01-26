export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
	/** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
	DateTime: any;
	/** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
	JSON: any;
};

export type Query = {
	__typename?: 'Query';
	viewer?: Maybe<Viewer>;
	orderDetail?: Maybe<OrderById>;
	node?: Maybe<Node>;
	getCarts?: Maybe<CartConnection>;
	cartsByStore?: Maybe<CartsByStoreConnection>;
	getAddress?: Maybe<Address>;
	getProducts?: Maybe<ProductConnection>;
	getProduct?: Maybe<ProductType>;
	groupByAttributes?: Maybe<AttributesByGroup>;
	areas?: Maybe<Array<Maybe<AreaType>>>;
	Cart?: Maybe<CartQueries>;
	Role?: Maybe<RoleQueries>;
	Permission?: Maybe<PermissionQueries>;
	Account?: Maybe<AccountQueries>;
	RolePermissions?: Maybe<RolePermissionsQueries>;
	Address?: Maybe<AddressQueries>;
	Status?: Maybe<StatusQueries>;
	Store?: Maybe<StoreQueries>;
	PaymentMethod?: Maybe<PaymentMethodQueries>;
	Category?: Maybe<CategoryQueries>;
	Area?: Maybe<AreaQueries>;
	AttributeSet?: Maybe<AttributeSetQueries>;
	AttributeGroup?: Maybe<AttributeGroupQueries>;
	Attribute?: Maybe<AttributeQueries>;
	AttributesRelation?: Maybe<AttributesRelationQueries>;
	Product?: Maybe<ProductQueries>;
	Variant?: Maybe<VariantQueries>;
	CategoryProduct?: Maybe<CategoryProductQueries>;
	StoreProduct?: Maybe<StoreProductQueries>;
	Brand?: Maybe<BrandQueries>;
	CategoryAttribute?: Maybe<CategoryAttributeQueries>;
};

export type QueryOrderDetailArgs = {
	input?: Maybe<OrderByIdInput>;
};

export type QueryNodeArgs = {
	id?: Maybe<Scalars['ID']>;
};

export type QueryGetCartsArgs = {
	filter?: Maybe<FilterInput>;
};

export type QueryCartsByStoreArgs = {
	input?: Maybe<FilterInput>;
};

export type QueryGetAddressArgs = {
	input?: Maybe<GetAddressInput>;
};

export type QueryGetProductsArgs = {
	input?: Maybe<FilterInput>;
};

export type QueryGetProductArgs = {
	id: Scalars['ID'];
};

export type QueryGroupByAttributesArgs = {
	input?: Maybe<FilterInput>;
};

export type QueryAreasArgs = {
	input?: Maybe<FilterInput>;
};

export type Viewer = {
	__typename?: 'Viewer';
	me?: Maybe<Account>;
};

export type Account = Node & {
	__typename?: 'Account';
	id?: Maybe<Scalars['ID']>;
	firstName?: Maybe<Scalars['String']>;
	lastName?: Maybe<Scalars['String']>;
	email?: Maybe<Scalars['String']>;
	dob?: Maybe<Scalars['DateTime']>;
	type?: Maybe<Scalars['String']>;
	gender?: Maybe<Scalars['String']>;
	password?: Maybe<Scalars['String']>;
	isSocial?: Maybe<Scalars['Boolean']>;
	socialProvider?: Maybe<Scalars['String']>;
	phone?: Maybe<Scalars['String']>;
	accessToken?: Maybe<Scalars['String']>;
	verifiedEmail?: Maybe<Scalars['Boolean']>;
	verifiedAt?: Maybe<Scalars['DateTime']>;
	token?: Maybe<Scalars['String']>;
	resetToken?: Maybe<Scalars['String']>;
	rtCreatedAt?: Maybe<Scalars['DateTime']>;
	avatar?: Maybe<Scalars['String']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	cnic?: Maybe<Scalars['String']>;
	updatedBy?: Maybe<Account>;
	role?: Maybe<RoleType>;
	useShippingAddressForBilling?: Maybe<Scalars['Boolean']>;
	lastBillingAddress?: Maybe<Address>;
	lastShippingAddress?: Maybe<Address>;
	currency?: Maybe<Scalars['String']>;
	status?: Maybe<Scalars['String']>;
	defaultAddress?: Maybe<Address>;
	lastPaymentMethod?: Maybe<PaymentMethodType>;
	cartsById?: Maybe<CartConnection>;
	storeShippingMethods?: Maybe<ShippingMethodConnection>;
	getAddresses?: Maybe<AddressConnection>;
	paymentMethods?: Maybe<PaymentMethodConnection>;
	orders?: Maybe<CartConnection>;
};

export type AccountCartsByIdArgs = {
	input?: Maybe<CartsByIdInputType>;
};

export type AccountStoreShippingMethodsArgs = {
	filter?: Maybe<FilterInput>;
};

export type AccountPaymentMethodsArgs = {
	filter?: Maybe<FilterInput>;
};

export type AccountOrdersArgs = {
	filter?: Maybe<FilterInput>;
};

export type Node = {
	id?: Maybe<Scalars['ID']>;
};

export type RoleType = {
	__typename?: 'RoleType';
	id?: Maybe<Scalars['String']>;
	title?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
};

export type Address = Node & {
	__typename?: 'Address';
	id?: Maybe<Scalars['ID']>;
	name?: Maybe<Scalars['String']>;
	phone?: Maybe<Scalars['String']>;
	address1?: Maybe<Scalars['String']>;
	address2?: Maybe<Scalars['String']>;
	city?: Maybe<Scalars['String']>;
	area?: Maybe<Scalars['String']>;
	block?: Maybe<Scalars['String']>;
	zip?: Maybe<Scalars['String']>;
	province?: Maybe<Scalars['String']>;
	country?: Maybe<Scalars['String']>;
	coordinates?: Maybe<Coordinates>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	updatedBy?: Maybe<Account>;
	accountId?: Maybe<Account>;
};

export type Coordinates = {
	__typename?: 'Coordinates';
	loongitude?: Maybe<Scalars['String']>;
	lattitude?: Maybe<Scalars['String']>;
};

export type PaymentMethodType = {
	__typename?: 'PaymentMethodType';
	active?: Maybe<Scalars['Boolean']>;
	adjustmentAmount?: Maybe<Scalars['String']>;
	avatar?: Maybe<Scalars['String']>;
	code?: Maybe<Scalars['String']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	id?: Maybe<Scalars['String']>;
	instructions?: Maybe<Scalars['String']>;
	minOrderTotal?: Maybe<Scalars['Int']>;
	maxOrderTotal?: Maybe<Scalars['Int']>;
	orderStatus?: Maybe<Scalars['String']>;
	title?: Maybe<Scalars['String']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	urlEndPoint?: Maybe<Array<Maybe<UrlEndpoint>>>;
	additionalDetails?: Maybe<Scalars['String']>;
	type?: Maybe<Scalars['String']>;
	processType?: Maybe<Scalars['String']>;
	isDeleted?: Maybe<Scalars['Boolean']>;
	onCheckout?: Maybe<OnCheckout>;
};

export type PaymentMethodTypeAvatarArgs = {
	input?: Maybe<AvatarDimensionInput>;
};

export type AvatarDimensionInput = {
	height?: Maybe<Scalars['Int']>;
	width?: Maybe<Scalars['Int']>;
};

export type UrlEndpoint = {
	__typename?: 'UrlEndpoint';
	name?: Maybe<Scalars['String']>;
	url?: Maybe<Scalars['String']>;
};

export type OnCheckout = {
	__typename?: 'OnCheckout';
	type?: Maybe<Scalars['String']>;
	key?: Maybe<Scalars['String']>;
	fields?: Maybe<Array<Maybe<RequirData>>>;
};

export type RequirData = {
	__typename?: 'requirData';
	name?: Maybe<Scalars['String']>;
	placeholder?: Maybe<Scalars['String']>;
	required?: Maybe<Scalars['Boolean']>;
	type?: Maybe<Scalars['String']>;
};

export type CartsByIdInputType = {
	cartId: Array<Maybe<Scalars['String']>>;
};

export type CartConnection = {
	__typename?: 'CartConnection';
	edges?: Maybe<Array<Maybe<CartEdge>>>;
	pageInfo?: Maybe<PageInfo>;
	totalCount?: Maybe<Scalars['Int']>;
};

export type CartEdge = {
	__typename?: 'CartEdge';
	node?: Maybe<Cart>;
	cursor?: Maybe<Scalars['String']>;
};

export type Cart = {
	__typename?: 'Cart';
	id?: Maybe<Scalars['String']>;
	storeId?: Maybe<Scalars['ID']>;
	billingAddress?: Maybe<Address>;
	shippingAddress?: Maybe<Address>;
	browserIp?: Maybe<Scalars['String']>;
	cancelReason?: Maybe<Scalars['String']>;
	closedAt?: Maybe<Scalars['DateTime']>;
	currency?: Maybe<Scalars['String']>;
	customer?: Maybe<Account>;
	email?: Maybe<Scalars['String']>;
	financialStatus?: Maybe<Scalars['String']>;
	orderName?: Maybe<Scalars['String']>;
	note?: Maybe<Scalars['String']>;
	noteAttributes?: Maybe<DataItem>;
	orderNumber?: Maybe<Scalars['String']>;
	paymentDetails?: Maybe<Scalars['JSON']>;
	paymentGateway?: Maybe<PaymentMethodType>;
	phone?: Maybe<Scalars['String']>;
	processedAt?: Maybe<Scalars['DateTime']>;
	processingMethod?: Maybe<Scalars['String']>;
	shippingLine?: Maybe<ShippingLine>;
	sourceName?: Maybe<Scalars['String']>;
	subtotalPrice?: Maybe<Scalars['Int']>;
	tags?: Maybe<Scalars['String']>;
	taxLines?: Maybe<Taxlines>;
	taxesIncluded?: Maybe<Scalars['Boolean']>;
	test?: Maybe<Scalars['Boolean']>;
	totalPrice?: Maybe<Scalars['Int']>;
	totalTax?: Maybe<Scalars['Int']>;
	grams?: Maybe<Scalars['Int']>;
	totalWeight?: Maybe<Scalars['Int']>;
	fulfillableQuantity?: Maybe<Scalars['Int']>;
	fulfillableService?: Maybe<Scalars['String']>;
	fulfillableStatus?: Maybe<Scalars['String']>;
	price?: Maybe<Scalars['Int']>;
	quantity?: Maybe<Scalars['Int']>;
	requiresShipping?: Maybe<Scalars['Boolean']>;
	sku?: Maybe<Scalars['String']>;
	title?: Maybe<Scalars['String']>;
	productId?: Maybe<Scalars['String']>;
	variantId?: Maybe<Scalars['String']>;
	variantTitle?: Maybe<Scalars['String']>;
	vendor?: Maybe<Scalars['String']>;
	giftCard?: Maybe<Scalars['Boolean']>;
	properties?: Maybe<Scalars['JSON']>;
	taxable?: Maybe<Scalars['Boolean']>;
	totalDiscount?: Maybe<Scalars['Int']>;
	discountAllocations?: Maybe<DiscountAllocations>;
	status?: Maybe<StatusType>;
	images?: Maybe<Images>;
	avatar?: Maybe<Scalars['String']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	originLocation?: Maybe<Address>;
	isDeleted?: Maybe<Scalars['Boolean']>;
	variantOptions?: Maybe<Array<Maybe<VariantOptions>>>;
	url?: Maybe<Scalars['String']>;
	compareAtPrice?: Maybe<Scalars['Int']>;
	discountPercentage?: Maybe<Scalars['Int']>;
	useShippingAddressForBilling?: Maybe<Scalars['Boolean']>;
};

export type CartAvatarArgs = {
	input?: Maybe<AvatarDimensionInput>;
};

export type DataItem = {
	__typename?: 'DataItem';
	key?: Maybe<Scalars['String']>;
	value?: Maybe<Scalars['String']>;
};

export type ShippingLine = {
	__typename?: 'ShippingLine';
	id?: Maybe<Scalars['String']>;
	estimatedTimeOfDelivery?: Maybe<Scalars['String']>;
	title?: Maybe<Scalars['String']>;
	price?: Maybe<Scalars['Int']>;
	avatar?: Maybe<Scalars['String']>;
};

export type ShippingLineAvatarArgs = {
	input?: Maybe<AvatarDimensionInput>;
};

export type Taxlines = {
	__typename?: 'Taxlines';
	title?: Maybe<Scalars['String']>;
	price?: Maybe<Scalars['String']>;
	priceSet?: Maybe<MoneyDetails>;
	rate?: Maybe<Scalars['Int']>;
	total_discount?: Maybe<Scalars['String']>;
	totalDiscountSet?: Maybe<MoneyDetails>;
	discountAllocations?: Maybe<Array<Maybe<DiscountAllocations>>>;
};

export type MoneyDetails = {
	__typename?: 'MoneyDetails';
	shopMoney?: Maybe<Money>;
	presentmentMoney?: Maybe<Money>;
};

export type Money = {
	__typename?: 'Money';
	amount?: Maybe<Scalars['Int']>;
	currencyCode?: Maybe<Scalars['String']>;
};

export type DiscountAllocations = {
	__typename?: 'DiscountAllocations';
	amount?: Maybe<Scalars['String']>;
	discountApplication_index?: Maybe<Scalars['Int']>;
	amountSet?: Maybe<MoneyDetails>;
};

export type StatusType = {
	__typename?: 'StatusType';
	id?: Maybe<Scalars['String']>;
	title?: Maybe<Scalars['String']>;
	type?: Maybe<Scalars['String']>;
	color?: Maybe<Scalars['String']>;
	backgroundColor?: Maybe<Scalars['String']>;
};

export type Images = {
	__typename?: 'Images';
	src?: Maybe<Scalars['String']>;
	width?: Maybe<Scalars['Int']>;
	height?: Maybe<Scalars['Int']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
};

export type VariantOptions = {
	__typename?: 'VariantOptions';
	name?: Maybe<Scalars['String']>;
	value?: Maybe<Scalars['String']>;
};

export type PageInfo = {
	__typename?: 'PageInfo';
	hasNextPage?: Maybe<Scalars['Boolean']>;
	hasPreviousPage?: Maybe<Scalars['Boolean']>;
	startCursor?: Maybe<Scalars['String']>;
	endCursor?: Maybe<Scalars['String']>;
};

export type FilterInput = {
	where?: Maybe<Scalars['JSON']>;
	limit?: Maybe<Scalars['Int']>;
	order?: Maybe<Scalars['JSON']>;
	after?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	before?: Maybe<Scalars['String']>;
	last?: Maybe<Scalars['Int']>;
};

export type ShippingMethodConnection = {
	__typename?: 'ShippingMethodConnection';
	edges?: Maybe<Array<Maybe<ShippingMethodEdge>>>;
	pageInfo?: Maybe<PageInfo>;
	totalCount?: Maybe<Scalars['Int']>;
};

export type ShippingMethodEdge = {
	__typename?: 'ShippingMethodEdge';
	node?: Maybe<ShippingLine>;
	cursor?: Maybe<Scalars['String']>;
};

export type AddressConnection = {
	__typename?: 'AddressConnection';
	edges?: Maybe<Array<Maybe<AddressEdge>>>;
	pageInfo?: Maybe<PageInfo>;
	totalCount?: Maybe<Scalars['Int']>;
};

export type AddressEdge = {
	__typename?: 'AddressEdge';
	node?: Maybe<Address>;
	cursor?: Maybe<Scalars['String']>;
};

export type PaymentMethodConnection = {
	__typename?: 'PaymentMethodConnection';
	edges?: Maybe<Array<Maybe<PaymentMethodEdge>>>;
	pageInfo?: Maybe<PageInfo>;
	totalCount?: Maybe<Scalars['Int']>;
};

export type PaymentMethodEdge = {
	__typename?: 'PaymentMethodEdge';
	node?: Maybe<PaymentMethodType>;
	cursor?: Maybe<Scalars['String']>;
};

export type OrderByIdInput = {
	id: Scalars['ID'];
};

export type OrderById = {
	__typename?: 'OrderById';
	id?: Maybe<Scalars['ID']>;
	store?: Maybe<Store>;
	lineitem?: Maybe<Cart>;
};

export type Store = {
	__typename?: 'Store';
	id?: Maybe<Scalars['String']>;
	accessToken?: Maybe<Scalars['String']>;
	accountId?: Maybe<Account>;
	avatar?: Maybe<Scalars['String']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	createdBy?: Maybe<Account>;
	currency?: Maybe<Scalars['String']>;
	customerEmail?: Maybe<Scalars['String']>;
	domain?: Maybe<Scalars['String']>;
	email?: Maybe<Scalars['String']>;
	geoMetaTags?: Maybe<Scalars['JSON']>;
	hasDiscounts?: Maybe<Scalars['Boolean']>;
	hasGiftCards?: Maybe<Scalars['Boolean']>;
	lastOrderNumber?: Maybe<Scalars['Int']>;
	metaDescription?: Maybe<Scalars['String']>;
	metaKeywords?: Maybe<Scalars['String']>;
	metaRobots?: Maybe<Scalars['String']>;
	metaTitle?: Maybe<Scalars['String']>;
	name?: Maybe<Scalars['String']>;
	passwordEnabled?: Maybe<Scalars['Boolean']>;
	phone?: Maybe<Scalars['String']>;
	planDisplayName?: Maybe<Scalars['String']>;
	planName?: Maybe<Scalars['String']>;
	sellerName?: Maybe<Scalars['String']>;
	siteStoreId?: Maybe<Scalars['String']>;
	slug?: Maybe<Scalars['String']>;
	state?: Maybe<Scalars['String']>;
	storeAddress?: Maybe<Address>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	updatedBy?: Maybe<Account>;
	verifiedAt?: Maybe<Scalars['DateTime']>;
	weightUnit?: Maybe<Scalars['String']>;
	url: Scalars['String'];
	totalOrders?: Maybe<Scalars['Int']>;
	facebookPixelId?: Maybe<Scalars['String']>;
	googleAnalyticsId?: Maybe<Scalars['String']>;
};

export type StoreAvatarArgs = {
	input?: Maybe<AvatarDimensionInput>;
};

export type CartsByStoreConnection = {
	__typename?: 'CartsByStoreConnection';
	edges?: Maybe<Array<Maybe<CartsByStoreEdge>>>;
	pageInfo?: Maybe<PageInfo>;
	totalCount?: Maybe<Scalars['Int']>;
};

export type CartsByStoreEdge = {
	__typename?: 'CartsByStoreEdge';
	node?: Maybe<CartsByStore>;
	cursor?: Maybe<Scalars['String']>;
};

export type CartsByStore = {
	__typename?: 'CartsByStore';
	store?: Maybe<Store>;
	lineitem?: Maybe<Array<Maybe<Cart>>>;
};

export type GetAddressInput = {
	addressId?: Maybe<Scalars['ID']>;
};

export type ProductConnection = {
	__typename?: 'ProductConnection';
	edges?: Maybe<Array<Maybe<ProductEdge>>>;
	pageInfo?: Maybe<PageInfo>;
	totalCount?: Maybe<Scalars['Int']>;
};

export type ProductEdge = {
	__typename?: 'ProductEdge';
	node?: Maybe<ProductType>;
	cursor?: Maybe<Scalars['String']>;
};

export type ProductType = {
	__typename?: 'ProductType';
	id?: Maybe<Scalars['String']>;
	title?: Maybe<Scalars['String']>;
	vendor?: Maybe<Scalars['String']>;
	brand?: Maybe<Brand>;
	description?: Maybe<Scalars['String']>;
	shortDescription?: Maybe<Scalars['String']>;
	handle?: Maybe<Scalars['String']>;
	avatar?: Maybe<Scalars['String']>;
	images?: Maybe<Array<Maybe<Scalars['String']>>>;
	options?: Maybe<Array<Maybe<ProductOptions>>>;
	publishedScope?: Maybe<PublishedScopeEnum>;
	tags?: Maybe<Scalars['String']>;
	metaTags?: Maybe<MetaTags>;
	specificationList?: Maybe<Array<Maybe<SpecificationList>>>;
	universal?: Maybe<Scalars['Boolean']>;
	hasMultipleOptions?: Maybe<Scalars['Boolean']>;
	variants?: Maybe<Array<Maybe<Variant>>>;
	store?: Maybe<Store>;
	category?: Maybe<CategoryType>;
};

export type ProductTypeVariantsArgs = {
	input?: Maybe<FilterInput>;
};

export type Brand = {
	__typename?: 'Brand';
	id?: Maybe<Scalars['String']>;
	name?: Maybe<Scalars['String']>;
	avatar?: Maybe<Scalars['String']>;
	thumbnail?: Maybe<Scalars['String']>;
};

export type BrandAvatarArgs = {
	input?: Maybe<AvatarDimensionInput>;
};

export type BrandThumbnailArgs = {
	input?: Maybe<AvatarDimensionInput>;
};

export type ProductOptions = {
	__typename?: 'ProductOptions';
	name?: Maybe<Scalars['String']>;
	position?: Maybe<Scalars['Int']>;
	values?: Maybe<Array<Maybe<Scalars['JSON']>>>;
};

export enum PublishedScopeEnum {
	Global = 'GLOBAL',
	Web = 'WEB',
}

export type MetaTags = {
	__typename?: 'MetaTags';
	metaTitle?: Maybe<Scalars['String']>;
	metaDescription?: Maybe<Scalars['String']>;
	metaKeywords?: Maybe<Scalars['String']>;
};

export type SpecificationList = {
	__typename?: 'SpecificationList';
	key?: Maybe<Scalars['String']>;
	values?: Maybe<Array<Maybe<SpecificationValues>>>;
};

export type SpecificationValues = {
	__typename?: 'SpecificationValues';
	key?: Maybe<Scalars['String']>;
	value?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Variant = {
	__typename?: 'Variant';
	id?: Maybe<Scalars['String']>;
	productId?: Maybe<Scalars['ID']>;
	title?: Maybe<Scalars['String']>;
	compareAtPrice?: Maybe<Scalars['Int']>;
	price?: Maybe<Scalars['Int']>;
	weight?: Maybe<Scalars['Int']>;
	weightUnit?: Maybe<WeightUnitEnum>;
	sku?: Maybe<Scalars['String']>;
	avatar?: Maybe<Scalars['String']>;
	option1?: Maybe<Scalars['String']>;
	option2?: Maybe<Scalars['String']>;
	option3?: Maybe<Scalars['String']>;
	taxable?: Maybe<Scalars['Boolean']>;
	requiresShipping?: Maybe<Scalars['Boolean']>;
	barcode?: Maybe<Scalars['String']>;
	quantity?: Maybe<Scalars['Int']>;
};

export enum WeightUnitEnum {
	Kg = 'KG',
	Grams = 'GRAMS',
}

export type CategoryType = {
	__typename?: 'CategoryType';
	id?: Maybe<Scalars['String']>;
	title: Scalars['String'];
	slug?: Maybe<Scalars['String']>;
	parentId?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	icon?: Maybe<Scalars['String']>;
	hasChildren?: Maybe<Scalars['Boolean']>;
	count?: Maybe<Scalars['Int']>;
	level?: Maybe<Scalars['Int']>;
	disabled?: Maybe<Scalars['Boolean']>;
	type?: Maybe<Scalars['String']>;
	attribute?: Maybe<Array<Maybe<Attribute>>>;
};

export type Attribute = {
	__typename?: 'Attribute';
	id?: Maybe<Scalars['String']>;
	slug?: Maybe<Scalars['String']>;
	name?: Maybe<Scalars['String']>;
	required?: Maybe<Scalars['Boolean']>;
	inputType?: Maybe<InputTypeEnum>;
	visible?: Maybe<Scalars['Boolean']>;
	options?: Maybe<Array<Maybe<DropDown>>>;
	isDeleted?: Maybe<Scalars['Boolean']>;
	attributeType?: Maybe<Scalars['String']>;
	group?: Maybe<Scalars['String']>;
	useInNavigation?: Maybe<Scalars['Boolean']>;
	category?: Maybe<Array<Maybe<CategoryType>>>;
};

export enum InputTypeEnum {
	Text = 'TEXT',
	Picker = 'PICKER',
	Tel = 'TEL',
	Time = 'TIME',
	Url = 'URL',
	Number = 'NUMBER',
	Date = 'DATE',
	Email = 'EMAIL',
	Singleselect = 'SINGLESELECT',
}

export type DropDown = {
	__typename?: 'DropDown';
	id?: Maybe<Scalars['String']>;
	name?: Maybe<Scalars['String']>;
};

export type AttributesByGroup = {
	__typename?: 'AttributesByGroup';
	attribute?: Maybe<Scalars['JSON']>;
};

export type AreaType = {
	__typename?: 'AreaType';
	id?: Maybe<Scalars['String']>;
	title: Scalars['String'];
	slug?: Maybe<Scalars['String']>;
	parentId?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	icon?: Maybe<Scalars['String']>;
	hasChildren?: Maybe<Scalars['Boolean']>;
	count?: Maybe<Scalars['Int']>;
	disabled?: Maybe<Scalars['Boolean']>;
	type?: Maybe<Scalars['String']>;
};

/** LineItem Model */
export type CartQueries = {
	__typename?: 'CartQueries';
	cart?: Maybe<Cart>;
	carts?: Maybe<CartConnection>;
};

/** LineItem Model */
export type CartQueriesCartArgs = {
	id?: Maybe<Scalars['ID']>;
};

/** LineItem Model */
export type CartQueriesCartsArgs = {
	input?: Maybe<FilterInput>;
};

/** Role Model */
export type RoleQueries = {
	__typename?: 'RoleQueries';
	role?: Maybe<RoleType>;
	roles?: Maybe<RoleConnection>;
};

/** Role Model */
export type RoleQueriesRoleArgs = {
	id?: Maybe<Scalars['ID']>;
};

/** Role Model */
export type RoleQueriesRolesArgs = {
	input?: Maybe<FilterInput>;
};

export type RoleConnection = {
	__typename?: 'RoleConnection';
	edges?: Maybe<Array<Maybe<RoleEdge>>>;
	pageInfo?: Maybe<PageInfo>;
	totalCount?: Maybe<Scalars['Int']>;
};

export type RoleEdge = {
	__typename?: 'RoleEdge';
	node?: Maybe<RoleType>;
	cursor?: Maybe<Scalars['String']>;
};

/** Permission Model */
export type PermissionQueries = {
	__typename?: 'PermissionQueries';
	permission?: Maybe<PermissionType>;
	permissions?: Maybe<PermissionConnection>;
};

/** Permission Model */
export type PermissionQueriesPermissionArgs = {
	id?: Maybe<Scalars['ID']>;
};

/** Permission Model */
export type PermissionQueriesPermissionsArgs = {
	input?: Maybe<FilterInput>;
};

export type PermissionType = {
	__typename?: 'PermissionType';
	id?: Maybe<Scalars['String']>;
	title?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	slug?: Maybe<Scalars['String']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
};

export type PermissionConnection = {
	__typename?: 'PermissionConnection';
	edges?: Maybe<Array<Maybe<PermissionEdge>>>;
	pageInfo?: Maybe<PageInfo>;
	totalCount?: Maybe<Scalars['Int']>;
};

export type PermissionEdge = {
	__typename?: 'PermissionEdge';
	node?: Maybe<PermissionType>;
	cursor?: Maybe<Scalars['String']>;
};

/** Account Model */
export type AccountQueries = {
	__typename?: 'AccountQueries';
	account?: Maybe<Account>;
	accounts?: Maybe<AccountConnection>;
};

/** Account Model */
export type AccountQueriesAccountArgs = {
	id?: Maybe<Scalars['ID']>;
};

/** Account Model */
export type AccountQueriesAccountsArgs = {
	input?: Maybe<FilterInput>;
};

export type AccountConnection = {
	__typename?: 'AccountConnection';
	edges?: Maybe<Array<Maybe<AccountEdge>>>;
	pageInfo?: Maybe<PageInfo>;
	totalCount?: Maybe<Scalars['Int']>;
};

export type AccountEdge = {
	__typename?: 'AccountEdge';
	node?: Maybe<Account>;
	cursor?: Maybe<Scalars['String']>;
};

/** rolePermissions Model */
export type RolePermissionsQueries = {
	__typename?: 'RolePermissionsQueries';
	rolepermissions?: Maybe<RolePermissionsType>;
	rolespermissions?: Maybe<PermissionRoleConnection>;
};

/** rolePermissions Model */
export type RolePermissionsQueriesRolepermissionsArgs = {
	id?: Maybe<Scalars['ID']>;
};

/** rolePermissions Model */
export type RolePermissionsQueriesRolespermissionsArgs = {
	input?: Maybe<FilterInput>;
};

export type RolePermissionsType = {
	__typename?: 'RolePermissionsType';
	id?: Maybe<Scalars['String']>;
	role?: Maybe<RoleType>;
	permission?: Maybe<PermissionType>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
};

export type PermissionRoleConnection = {
	__typename?: 'PermissionRoleConnection';
	edges?: Maybe<Array<Maybe<PermissionRoleEdge>>>;
	pageInfo?: Maybe<PageInfo>;
	totalCount?: Maybe<Scalars['Int']>;
};

export type PermissionRoleEdge = {
	__typename?: 'PermissionRoleEdge';
	node?: Maybe<RolePermissionsType>;
	cursor?: Maybe<Scalars['String']>;
};

/** Address Model */
export type AddressQueries = {
	__typename?: 'AddressQueries';
	address?: Maybe<Address>;
	addresses?: Maybe<AddressConnection>;
};

/** Address Model */
export type AddressQueriesAddressArgs = {
	id?: Maybe<Scalars['ID']>;
};

/** Address Model */
export type AddressQueriesAddressesArgs = {
	input?: Maybe<FilterInput>;
};

/** Status Model */
export type StatusQueries = {
	__typename?: 'StatusQueries';
	status?: Maybe<StatusType>;
	statuses?: Maybe<StatusConnection>;
};

/** Status Model */
export type StatusQueriesStatusArgs = {
	id?: Maybe<Scalars['ID']>;
};

/** Status Model */
export type StatusQueriesStatusesArgs = {
	input?: Maybe<FilterInput>;
};

export type StatusConnection = {
	__typename?: 'StatusConnection';
	edges?: Maybe<Array<Maybe<StatusEdge>>>;
	pageInfo?: Maybe<PageInfo>;
	totalCount?: Maybe<Scalars['Int']>;
};

export type StatusEdge = {
	__typename?: 'StatusEdge';
	node?: Maybe<StatusType>;
	cursor?: Maybe<Scalars['String']>;
};

/** Store Model */
export type StoreQueries = {
	__typename?: 'StoreQueries';
	store?: Maybe<Store>;
	stores?: Maybe<StoreConnection>;
};

/** Store Model */
export type StoreQueriesStoreArgs = {
	id?: Maybe<Scalars['ID']>;
};

/** Store Model */
export type StoreQueriesStoresArgs = {
	input?: Maybe<FilterInput>;
};

export type StoreConnection = {
	__typename?: 'StoreConnection';
	edges?: Maybe<Array<Maybe<StoreEdge>>>;
	pageInfo?: Maybe<PageInfo>;
	totalCount?: Maybe<Scalars['Int']>;
};

export type StoreEdge = {
	__typename?: 'StoreEdge';
	node?: Maybe<Store>;
	cursor?: Maybe<Scalars['String']>;
};

/** PaymentMethod Model */
export type PaymentMethodQueries = {
	__typename?: 'PaymentMethodQueries';
	paymentmethod?: Maybe<PaymentMethodType>;
	paymentmethods?: Maybe<PaymentMethodConnection>;
};

/** PaymentMethod Model */
export type PaymentMethodQueriesPaymentmethodArgs = {
	id?: Maybe<Scalars['ID']>;
};

/** PaymentMethod Model */
export type PaymentMethodQueriesPaymentmethodsArgs = {
	input?: Maybe<FilterInput>;
};

/** Category Model */
export type CategoryQueries = {
	__typename?: 'CategoryQueries';
	category?: Maybe<CategoryType>;
	categories?: Maybe<CategoryConnection>;
};

/** Category Model */
export type CategoryQueriesCategoryArgs = {
	id?: Maybe<Scalars['ID']>;
};

/** Category Model */
export type CategoryQueriesCategoriesArgs = {
	input?: Maybe<FilterInput>;
};

export type CategoryConnection = {
	__typename?: 'CategoryConnection';
	edges?: Maybe<Array<Maybe<CategoryEdge>>>;
	pageInfo?: Maybe<PageInfo>;
	totalCount?: Maybe<Scalars['Int']>;
};

export type CategoryEdge = {
	__typename?: 'CategoryEdge';
	node?: Maybe<CategoryType>;
	cursor?: Maybe<Scalars['String']>;
};

/** Areas Model */
export type AreaQueries = {
	__typename?: 'AreaQueries';
	area?: Maybe<AreaType>;
	areas?: Maybe<AreaConnection>;
};

/** Areas Model */
export type AreaQueriesAreaArgs = {
	id?: Maybe<Scalars['ID']>;
};

/** Areas Model */
export type AreaQueriesAreasArgs = {
	input?: Maybe<FilterInput>;
};

export type AreaConnection = {
	__typename?: 'AreaConnection';
	edges?: Maybe<Array<Maybe<AreaEdge>>>;
	pageInfo?: Maybe<PageInfo>;
	totalCount?: Maybe<Scalars['Int']>;
};

export type AreaEdge = {
	__typename?: 'AreaEdge';
	node?: Maybe<AreaType>;
	cursor?: Maybe<Scalars['String']>;
};

/** AttributeSet Model */
export type AttributeSetQueries = {
	__typename?: 'AttributeSetQueries';
	attributeset?: Maybe<AttributeSetType>;
	attributesets?: Maybe<AttributeSetConnection>;
};

/** AttributeSet Model */
export type AttributeSetQueriesAttributesetArgs = {
	id?: Maybe<Scalars['ID']>;
};

/** AttributeSet Model */
export type AttributeSetQueriesAttributesetsArgs = {
	input?: Maybe<FilterInput>;
};

export type AttributeSetType = {
	__typename?: 'AttributeSetType';
	id?: Maybe<Scalars['String']>;
	name: Scalars['String'];
	attributeGroup?: Maybe<Array<Maybe<AttributeGroupType>>>;
};

export type AttributeSetTypeAttributeGroupArgs = {
	input?: Maybe<FilterInput>;
};

export type AttributeGroupType = {
	__typename?: 'AttributeGroupType';
	id?: Maybe<Scalars['String']>;
	name: Scalars['String'];
	sortOrder?: Maybe<Scalars['Int']>;
	attribute?: Maybe<Array<Maybe<Attribute>>>;
};

export type AttributeSetConnection = {
	__typename?: 'AttributeSetConnection';
	edges?: Maybe<Array<Maybe<AttributeSetEdge>>>;
	pageInfo?: Maybe<PageInfo>;
	totalCount?: Maybe<Scalars['Int']>;
};

export type AttributeSetEdge = {
	__typename?: 'AttributeSetEdge';
	node?: Maybe<AttributeSetType>;
	cursor?: Maybe<Scalars['String']>;
};

/** AttributeGroup Model */
export type AttributeGroupQueries = {
	__typename?: 'AttributeGroupQueries';
	attributegroup?: Maybe<AttributeGroupType>;
	attributegroups?: Maybe<AttributeGroupConnection>;
};

/** AttributeGroup Model */
export type AttributeGroupQueriesAttributegroupArgs = {
	id?: Maybe<Scalars['ID']>;
};

/** AttributeGroup Model */
export type AttributeGroupQueriesAttributegroupsArgs = {
	input?: Maybe<FilterInput>;
};

export type AttributeGroupConnection = {
	__typename?: 'AttributeGroupConnection';
	edges?: Maybe<Array<Maybe<AttributeGroupEdge>>>;
	pageInfo?: Maybe<PageInfo>;
	totalCount?: Maybe<Scalars['Int']>;
};

export type AttributeGroupEdge = {
	__typename?: 'AttributeGroupEdge';
	node?: Maybe<AttributeGroupType>;
	cursor?: Maybe<Scalars['String']>;
};

/** Attribute Model */
export type AttributeQueries = {
	__typename?: 'AttributeQueries';
	attribute?: Maybe<Attribute>;
	attributes?: Maybe<AttributeConnection>;
};

/** Attribute Model */
export type AttributeQueriesAttributeArgs = {
	id?: Maybe<Scalars['ID']>;
};

/** Attribute Model */
export type AttributeQueriesAttributesArgs = {
	input?: Maybe<FilterInput>;
};

export type AttributeConnection = {
	__typename?: 'AttributeConnection';
	edges?: Maybe<Array<Maybe<AttributeEdge>>>;
	pageInfo?: Maybe<PageInfo>;
	totalCount?: Maybe<Scalars['Int']>;
};

export type AttributeEdge = {
	__typename?: 'AttributeEdge';
	node?: Maybe<Attribute>;
	cursor?: Maybe<Scalars['String']>;
};

/** AttributesRelation Model */
export type AttributesRelationQueries = {
	__typename?: 'AttributesRelationQueries';
	attributesrelation?: Maybe<AttributesRelation>;
	attributesrelations?: Maybe<AttributesRelationConnection>;
};

/** AttributesRelation Model */
export type AttributesRelationQueriesAttributesrelationArgs = {
	id?: Maybe<Scalars['ID']>;
};

/** AttributesRelation Model */
export type AttributesRelationQueriesAttributesrelationsArgs = {
	input?: Maybe<FilterInput>;
};

export type AttributesRelation = {
	__typename?: 'AttributesRelation';
	id?: Maybe<Scalars['String']>;
	attributeSet?: Maybe<AttributeSetType>;
	attributeGroup?: Maybe<AttributeGroupType>;
	attribute?: Maybe<Attribute>;
};

export type AttributesRelationConnection = {
	__typename?: 'AttributesRelationConnection';
	edges?: Maybe<Array<Maybe<AtrributesRelationEdge>>>;
	pageInfo?: Maybe<PageInfo>;
	totalCount?: Maybe<Scalars['Int']>;
};

export type AtrributesRelationEdge = {
	__typename?: 'AtrributesRelationEdge';
	node?: Maybe<AttributesRelation>;
	cursor?: Maybe<Scalars['String']>;
};

/** Product Model */
export type ProductQueries = {
	__typename?: 'ProductQueries';
	product?: Maybe<ProductType>;
	products?: Maybe<ProductConnection>;
};

/** Product Model */
export type ProductQueriesProductArgs = {
	id?: Maybe<Scalars['ID']>;
};

/** Product Model */
export type ProductQueriesProductsArgs = {
	input?: Maybe<FilterInput>;
};

/** Variant Model */
export type VariantQueries = {
	__typename?: 'VariantQueries';
	variant?: Maybe<Variant>;
	variants?: Maybe<VariantConnection>;
};

/** Variant Model */
export type VariantQueriesVariantArgs = {
	id?: Maybe<Scalars['ID']>;
};

/** Variant Model */
export type VariantQueriesVariantsArgs = {
	input?: Maybe<FilterInput>;
};

export type VariantConnection = {
	__typename?: 'VariantConnection';
	edges?: Maybe<Array<Maybe<VariantEdge>>>;
	pageInfo?: Maybe<PageInfo>;
	totalCount?: Maybe<Scalars['Int']>;
};

export type VariantEdge = {
	__typename?: 'VariantEdge';
	node?: Maybe<Variant>;
	cursor?: Maybe<Scalars['String']>;
};

/** CategoryProduct Model */
export type CategoryProductQueries = {
	__typename?: 'CategoryProductQueries';
	categoryproduct?: Maybe<CategoryProduct>;
	categoryproducts?: Maybe<CategoryProductConnection>;
};

/** CategoryProduct Model */
export type CategoryProductQueriesCategoryproductArgs = {
	id?: Maybe<Scalars['ID']>;
};

/** CategoryProduct Model */
export type CategoryProductQueriesCategoryproductsArgs = {
	input?: Maybe<FilterInput>;
};

export type CategoryProduct = {
	__typename?: 'CategoryProduct';
	id?: Maybe<Scalars['String']>;
	storeId?: Maybe<Store>;
	categoryId?: Maybe<CategoryType>;
	productId?: Maybe<ProductType>;
};

export type CategoryProductConnection = {
	__typename?: 'CategoryProductConnection';
	edges?: Maybe<Array<Maybe<CategoryProductEdge>>>;
	pageInfo?: Maybe<PageInfo>;
	totalCount?: Maybe<Scalars['String']>;
};

export type CategoryProductEdge = {
	__typename?: 'CategoryProductEdge';
	node?: Maybe<CategoryProduct>;
	cursor?: Maybe<Scalars['String']>;
};

/** StoreProduct Model */
export type StoreProductQueries = {
	__typename?: 'StoreProductQueries';
	storeproduct?: Maybe<StoreProduct>;
	storeproducts?: Maybe<StoreProductConnection>;
};

/** StoreProduct Model */
export type StoreProductQueriesStoreproductArgs = {
	id?: Maybe<Scalars['ID']>;
};

/** StoreProduct Model */
export type StoreProductQueriesStoreproductsArgs = {
	input?: Maybe<FilterInput>;
};

export type StoreProduct = {
	__typename?: 'StoreProduct';
	id?: Maybe<Scalars['String']>;
	storeId?: Maybe<Store>;
	productId?: Maybe<ProductType>;
	variantId?: Maybe<Variant>;
	price?: Maybe<Scalars['Int']>;
	compareAtPrice?: Maybe<Scalars['Int']>;
	sku?: Maybe<Scalars['String']>;
	quantity?: Maybe<Scalars['Int']>;
};

export type StoreProductConnection = {
	__typename?: 'StoreProductConnection';
	edges?: Maybe<Array<Maybe<StoreProductEdge>>>;
	pageInfo?: Maybe<PageInfo>;
	totalCount?: Maybe<Scalars['Int']>;
};

export type StoreProductEdge = {
	__typename?: 'StoreProductEdge';
	node?: Maybe<StoreProduct>;
	cursor?: Maybe<Scalars['String']>;
};

/** Brand Model */
export type BrandQueries = {
	__typename?: 'BrandQueries';
	brand?: Maybe<Brand>;
	brands?: Maybe<BrandConnection>;
};

/** Brand Model */
export type BrandQueriesBrandArgs = {
	id?: Maybe<Scalars['ID']>;
};

/** Brand Model */
export type BrandQueriesBrandsArgs = {
	input?: Maybe<FilterInput>;
};

export type BrandConnection = {
	__typename?: 'BrandConnection';
	edges?: Maybe<Array<Maybe<BrandEdge>>>;
	pageInfo?: Maybe<PageInfo>;
	totalCount?: Maybe<Scalars['Int']>;
};

export type BrandEdge = {
	__typename?: 'BrandEdge';
	node?: Maybe<Brand>;
	cursor?: Maybe<Scalars['String']>;
};

/** CategoryAttribute Model */
export type CategoryAttributeQueries = {
	__typename?: 'CategoryAttributeQueries';
	categoryattribute?: Maybe<CategoryAttribute>;
	categoryattributes?: Maybe<CategoryAttributeConnection>;
};

/** CategoryAttribute Model */
export type CategoryAttributeQueriesCategoryattributeArgs = {
	id?: Maybe<Scalars['ID']>;
};

/** CategoryAttribute Model */
export type CategoryAttributeQueriesCategoryattributesArgs = {
	input?: Maybe<FilterInput>;
};

export type CategoryAttribute = {
	__typename?: 'CategoryAttribute';
	id?: Maybe<Scalars['String']>;
	category?: Maybe<CategoryType>;
	attribute?: Maybe<Attribute>;
};

export type CategoryAttributeConnection = {
	__typename?: 'CategoryAttributeConnection';
	edges?: Maybe<Array<Maybe<CategoryAttributeEdge>>>;
	pageInfo?: Maybe<PageInfo>;
	totalCount?: Maybe<Scalars['Int']>;
};

export type CategoryAttributeEdge = {
	__typename?: 'CategoryAttributeEdge';
	node?: Maybe<CategoryAttribute>;
	cursor?: Maybe<Scalars['String']>;
};

export type Mutation = {
	__typename?: 'Mutation';
	updateAccountPaymentMethod?: Maybe<UpdateAccountPaymentMethodType>;
	signup?: Maybe<Account>;
	login?: Maybe<Account>;
	logout?: Maybe<DefaultResponseMsg>;
	resendVerificationEmail?: Maybe<DefaultResponseMsg>;
	verifyEmail?: Maybe<Account>;
	updatePassword?: Maybe<DefaultResponseMsg>;
	forgotPassword?: Maybe<DefaultResponseMsg>;
	verifyPasswordResetToken?: Maybe<DefaultResponseMsg>;
	changePassword?: Maybe<DefaultResponseMsg>;
	createCart?: Maybe<Cart>;
	updateShippingLine?: Maybe<UpdateCartType>;
	deleteCart?: Maybe<CartDeleteMutation>;
	updateAccountShippingAddress?: Maybe<UpdateAccountShippingAddress>;
	updateAccountBillingAddress?: Maybe<UpdateAccountBillingAddress>;
	useShippingAddressAsBillingAddress?: Maybe<UseShippingAddressAsBillingAddress>;
	updateCart?: Maybe<UpdateCartType>;
	createOrder?: Maybe<Array<Maybe<Cart>>>;
	createAttribute?: Maybe<Attribute>;
	createProduct?: Maybe<ProductType>;
	createCategoryProduct?: Maybe<Array<Maybe<CategoryProduct>>>;
	deleteCategoryProduct?: Maybe<DeleteMutation>;
	createStoreProduct?: Maybe<StoreProduct>;
	updateStoreProduct?: Maybe<StoreProduct>;
	Cart?: Maybe<CartMutation>;
	Role?: Maybe<RoleMutation>;
	Permission?: Maybe<PermissionMutation>;
	Account?: Maybe<AccountMutation>;
	RolePermissions?: Maybe<RolePermissionsMutation>;
	Address?: Maybe<AddressMutation>;
	Status?: Maybe<StatusMutation>;
	Store?: Maybe<StoreMutation>;
	PaymentMethod?: Maybe<PaymentMethodMutation>;
	Category?: Maybe<CategoryMutation>;
	Area?: Maybe<AreaMutation>;
	AttributeSet?: Maybe<AttributeSetMutation>;
	AttributeGroup?: Maybe<AttributeGroupMutation>;
	Attribute?: Maybe<AttributeMutation>;
	AttributesRelation?: Maybe<AttributesRelationMutation>;
	Product?: Maybe<ProductMutation>;
	Variant?: Maybe<VariantMutation>;
	CategoryProduct?: Maybe<CategoryProductMutation>;
	StoreProduct?: Maybe<StoreProductMutation>;
	Brand?: Maybe<BrandMutation>;
	CategoryAttribute?: Maybe<CategoryAttributeMutation>;
};

export type MutationUpdateAccountPaymentMethodArgs = {
	input?: Maybe<UpdateAccountPaymentMethodInput>;
	clientMutationId: Scalars['String'];
};

export type MutationSignupArgs = {
	input: SignupInput;
};

export type MutationLoginArgs = {
	input: LoginInput;
};

export type MutationResendVerificationEmailArgs = {
	input: SendVerificationTokenInput;
	clientMutationId?: Maybe<Scalars['String']>;
};

export type MutationVerifyEmailArgs = {
	input: VerifyEmailInput;
	clientMutationId?: Maybe<Scalars['String']>;
};

export type MutationUpdatePasswordArgs = {
	input: UpdatePasswordInput;
	clientMutationId: Scalars['String'];
};

export type MutationForgotPasswordArgs = {
	input: ForgotPasswordInput;
	clientMutationId?: Maybe<Scalars['String']>;
};

export type MutationVerifyPasswordResetTokenArgs = {
	input?: Maybe<VerifyPasswordResetTokenInput>;
};

export type MutationChangePasswordArgs = {
	input: ChangePasswordInput;
};

export type MutationCreateCartArgs = {
	input?: Maybe<CreateCartInputType>;
};

export type MutationUpdateShippingLineArgs = {
	input?: Maybe<UpdateCartInputType>;
	clientMutationId: Scalars['String'];
};

export type MutationDeleteCartArgs = {
	input?: Maybe<CartDeleteMutationInput>;
};

export type MutationUpdateAccountShippingAddressArgs = {
	input?: Maybe<UpdateAccountShippingAddressInput>;
	clientMutationId: Scalars['String'];
};

export type MutationUpdateAccountBillingAddressArgs = {
	input?: Maybe<UpdateAccountBillingAddressInput>;
	clientMutationId: Scalars['String'];
};

export type MutationUseShippingAddressAsBillingAddressArgs = {
	input?: Maybe<UseShippingAddressAsBillingAddressInput>;
	clientMutationId: Scalars['String'];
};

export type MutationUpdateCartArgs = {
	input?: Maybe<UpdateCartInputType>;
	clientMutationId: Scalars['String'];
};

export type MutationCreateOrderArgs = {
	input?: Maybe<CreateOrderInput>;
};

export type MutationCreateAttributeArgs = {
	input?: Maybe<CreateAttributeInput>;
};

export type MutationCreateProductArgs = {
	input?: Maybe<CreateProductInput>;
};

export type MutationCreateCategoryProductArgs = {
	input?: Maybe<CreateCategoryProductInput>;
};

export type MutationDeleteCategoryProductArgs = {
	input?: Maybe<DeleteMutationInput>;
};

export type MutationCreateStoreProductArgs = {
	input?: Maybe<CreateStoreProductInput>;
};

export type MutationUpdateStoreProductArgs = {
	input?: Maybe<UpdateStoreProductInput>;
};

export type UpdateAccountPaymentMethodInput = {
	id: Scalars['String'];
};

export type UpdateAccountPaymentMethodType = {
	__typename?: 'UpdateAccountPaymentMethodType';
	account?: Maybe<Account>;
	clientMutationId?: Maybe<Scalars['String']>;
};

export type SignupInput = {
	avatar?: Maybe<Scalars['String']>;
	email: Scalars['String'];
	firstName: Scalars['String'];
	lastName: Scalars['String'];
	password: Scalars['String'];
	phone?: Maybe<Scalars['String']>;
	cnic?: Maybe<Scalars['String']>;
};

export type LoginInput = {
	email: Scalars['String'];
	password: Scalars['String'];
};

export type DefaultResponseMsg = {
	__typename?: 'DefaultResponseMsg';
	message?: Maybe<Scalars['String']>;
};

export type SendVerificationTokenInput = {
	email: Scalars['String'];
};

export type VerifyEmailInput = {
	email: Scalars['String'];
	token: Scalars['Int'];
};

export type UpdatePasswordInput = {
	currentPassword: Scalars['String'];
	password: Scalars['String'];
};

export type ForgotPasswordInput = {
	email: Scalars['String'];
};

export type VerifyPasswordResetTokenInput = {
	email: Scalars['String'];
	token: Scalars['String'];
};

export type ChangePasswordInput = {
	email: Scalars['String'];
	password: Scalars['String'];
	token: Scalars['Int'];
};

export type CreateCartInputType = {
	storeId: Scalars['ID'];
	billingAddress?: Maybe<CreateAddressInput>;
	shippingAddress?: Maybe<CreateAddressInput>;
	browserIp: Scalars['String'];
	cancelReason?: Maybe<CancelReasonEnum>;
	cancelledAt?: Maybe<Scalars['String']>;
	clientDetails: ClientDetailsInput;
	closedAt?: Maybe<Scalars['DateTime']>;
	currency?: Maybe<Scalars['String']>;
	customer?: Maybe<CreateAccountInputType>;
	email?: Maybe<Scalars['String']>;
	financialStatus?: Maybe<Scalars['String']>;
	orderName?: Maybe<Scalars['String']>;
	note?: Maybe<Scalars['String']>;
	noteAttributes?: Maybe<DataItemsInput>;
	orderNumber?: Maybe<Scalars['String']>;
	paymentDetails?: Maybe<Scalars['JSON']>;
	paymentGateway?: Maybe<CreatePaymentMethodInputType>;
	phone?: Maybe<Scalars['String']>;
	processedAt?: Maybe<Scalars['DateTime']>;
	processingMethod?: Maybe<Scalars['String']>;
	shippingLine?: Maybe<ShippingLineInput>;
	sourceName?: Maybe<Scalars['String']>;
	subtotalPrice?: Maybe<Scalars['Int']>;
	tags?: Maybe<Scalars['String']>;
	taxLines?: Maybe<Array<Maybe<TaxlinesInput>>>;
	taxesIncluded?: Maybe<Scalars['Boolean']>;
	test?: Maybe<Scalars['Boolean']>;
	totalPrice?: Maybe<Scalars['Int']>;
	totalTax?: Maybe<Scalars['Int']>;
	grams?: Maybe<Scalars['Int']>;
	totalWeight?: Maybe<Scalars['Int']>;
	fulfillableQuantity?: Maybe<Scalars['Int']>;
	fulfillableService?: Maybe<Scalars['String']>;
	fulfillableStatus?: Maybe<Scalars['String']>;
	price?: Maybe<Scalars['Int']>;
	quantity: Scalars['Int'];
	requiresShipping?: Maybe<Scalars['Boolean']>;
	sku?: Maybe<Scalars['String']>;
	title?: Maybe<Scalars['String']>;
	productId?: Maybe<Scalars['String']>;
	variantId?: Maybe<Scalars['String']>;
	variantTitle?: Maybe<Scalars['String']>;
	vendor?: Maybe<Scalars['String']>;
	giftCard?: Maybe<Scalars['Boolean']>;
	properties?: Maybe<Scalars['JSON']>;
	taxable?: Maybe<Scalars['Boolean']>;
	totalDiscount?: Maybe<Scalars['Int']>;
	discountAllocations?: Maybe<Array<Maybe<DiscountAllocationsInput>>>;
	status?: Maybe<CreateStatusInputType>;
	images?: Maybe<Array<Maybe<ImagesInput>>>;
	avatar?: Maybe<ImagesInput>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	originLocation?: Maybe<CreateAddressInput>;
	variantOptions?: Maybe<Array<Maybe<VariantOptionsInput>>>;
	url?: Maybe<Scalars['String']>;
	compareAtPrice?: Maybe<Scalars['Int']>;
	discountPercentage?: Maybe<Scalars['Int']>;
};

export type CreateAddressInput = {
	name?: Maybe<Scalars['String']>;
	phone?: Maybe<Scalars['String']>;
	address1?: Maybe<Scalars['String']>;
	address2?: Maybe<Scalars['String']>;
	city?: Maybe<Scalars['String']>;
	area?: Maybe<Scalars['String']>;
	block?: Maybe<Scalars['String']>;
	zip?: Maybe<Scalars['String']>;
	province?: Maybe<Scalars['String']>;
	country?: Maybe<Scalars['String']>;
	accountId?: Maybe<Scalars['ID']>;
	coordinates?: Maybe<CoordinatesInput>;
};

export type CoordinatesInput = {
	loongitude?: Maybe<Scalars['String']>;
	lattitude?: Maybe<Scalars['String']>;
};

export enum CancelReasonEnum {
	Customer = 'CUSTOMER',
	Declined = 'DECLINED',
	Fraud = 'FRAUD',
	Inventory = 'INVENTORY',
	Other = 'OTHER',
}

export type ClientDetailsInput = {
	acceptLanguage?: Maybe<Scalars['String']>;
	browserHeight?: Maybe<Scalars['Int']>;
	browserIp?: Maybe<Scalars['String']>;
	browserWidth?: Maybe<Scalars['Int']>;
	sessionHash?: Maybe<Scalars['String']>;
	userAgent?: Maybe<Scalars['String']>;
	geoip?: Maybe<GeoIpInput>;
};

export type GeoIpInput = {
	range?: Maybe<Array<Maybe<Scalars['String']>>>;
	country?: Maybe<Scalars['String']>;
	region?: Maybe<Scalars['String']>;
	eu?: Maybe<Scalars['String']>;
	timezone?: Maybe<Scalars['String']>;
	city?: Maybe<Scalars['String']>;
	ll?: Maybe<Array<Maybe<Scalars['String']>>>;
	metro?: Maybe<Scalars['String']>;
	area?: Maybe<Scalars['String']>;
};

export type CreateAccountInputType = {
	firstName: Scalars['String'];
	lastName: Scalars['String'];
	email: Scalars['String'];
	dob?: Maybe<Scalars['DateTime']>;
	type?: Maybe<Scalars['String']>;
	gender?: Maybe<Scalars['String']>;
	password: Scalars['String'];
	isSocial?: Maybe<Scalars['Boolean']>;
	socialProvider?: Maybe<Scalars['String']>;
	phone: Scalars['String'];
	accessToken?: Maybe<Scalars['String']>;
	verifiedEmail?: Maybe<Scalars['Boolean']>;
	verifiedAt?: Maybe<Scalars['DateTime']>;
	token?: Maybe<Scalars['String']>;
	resetToken?: Maybe<Scalars['String']>;
	rtCreatedAt?: Maybe<Scalars['DateTime']>;
	avatar?: Maybe<Scalars['String']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	updatedBy?: Maybe<Scalars['ID']>;
	isDeleted?: Maybe<Scalars['Boolean']>;
	deletedAt?: Maybe<Scalars['DateTime']>;
	deletedBy?: Maybe<Scalars['ID']>;
	role?: Maybe<Scalars['ID']>;
	useShippingAddressForBilling?: Maybe<Scalars['Boolean']>;
	lastBillingAddress?: Maybe<Scalars['ID']>;
	lastShippingAddress?: Maybe<Scalars['ID']>;
	currency?: Maybe<Scalars['String']>;
	status?: Maybe<Scalars['String']>;
	defaultAddress?: Maybe<Scalars['ID']>;
	lastPaymentmethod?: Maybe<Scalars['ID']>;
};

export type DataItemsInput = {
	key?: Maybe<Scalars['String']>;
	value?: Maybe<Scalars['String']>;
};

export type CreatePaymentMethodInputType = {
	active?: Maybe<Scalars['Boolean']>;
	adjustmentAmount?: Maybe<Scalars['String']>;
	avatar?: Maybe<ImagesInput>;
	code: Scalars['String'];
	createdAt?: Maybe<Scalars['DateTime']>;
	instructions?: Maybe<Scalars['String']>;
	minOrderTotal?: Maybe<Scalars['Int']>;
	maxOrderTotal?: Maybe<Scalars['Int']>;
	orderStatus?: Maybe<Scalars['String']>;
	title: Scalars['String'];
	updatedAt?: Maybe<Scalars['DateTime']>;
	additionalDetails?: Maybe<Scalars['String']>;
	type?: Maybe<Scalars['String']>;
	processType?: Maybe<Scalars['String']>;
	isDeleted?: Maybe<Scalars['Boolean']>;
	urlEndPoint?: Maybe<Array<Maybe<UrlEndpointInput>>>;
	onCheckout?: Maybe<OnCheckoutInput>;
};

export type ImagesInput = {
	src?: Maybe<Scalars['String']>;
	width?: Maybe<Scalars['Int']>;
	height?: Maybe<Scalars['Int']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UrlEndpointInput = {
	name?: Maybe<Scalars['String']>;
	url?: Maybe<Scalars['String']>;
};

export type OnCheckoutInput = {
	type?: Maybe<Scalars['String']>;
	key?: Maybe<Scalars['String']>;
	fields?: Maybe<Array<Maybe<RequirDataInput>>>;
};

export type RequirDataInput = {
	name?: Maybe<Scalars['String']>;
	placeholder?: Maybe<Scalars['String']>;
	required?: Maybe<Scalars['Boolean']>;
	type?: Maybe<Scalars['String']>;
};

export type ShippingLineInput = {
	id?: Maybe<Scalars['String']>;
	estimatedTimeOfDelivery?: Maybe<Scalars['String']>;
	title?: Maybe<Scalars['String']>;
	price?: Maybe<Scalars['Int']>;
	avatar?: Maybe<Scalars['String']>;
};

export type TaxlinesInput = {
	title?: Maybe<Scalars['String']>;
	price?: Maybe<Scalars['String']>;
	priceSet?: Maybe<MoneyDetailsInput>;
	rate?: Maybe<Scalars['Int']>;
	total_discount?: Maybe<Scalars['String']>;
	totalDiscountSet?: Maybe<MoneyDetailsInput>;
	discountAllocations?: Maybe<Array<Maybe<DiscountAllocationsInput>>>;
};

export type MoneyDetailsInput = {
	shopMoney?: Maybe<MoneyInput>;
	presentmentMoney?: Maybe<MoneyInput>;
};

export type MoneyInput = {
	amount?: Maybe<Scalars['Int']>;
	currencyCode?: Maybe<Scalars['String']>;
};

export type DiscountAllocationsInput = {
	amount?: Maybe<Scalars['String']>;
	discountApplication_index?: Maybe<Scalars['Int']>;
	amountSet?: Maybe<MoneyDetailsInput>;
};

export type CreateStatusInputType = {
	title: Scalars['String'];
	type: Scalars['String'];
	color: Scalars['String'];
	backgroundColor: Scalars['String'];
};

export type VariantOptionsInput = {
	name?: Maybe<Scalars['String']>;
	value?: Maybe<Scalars['String']>;
};

export type UpdateCartInputType = {
	id: Scalars['ID'];
	name?: Maybe<Scalars['String']>;
	quantity?: Maybe<Scalars['Int']>;
	price?: Maybe<Scalars['Int']>;
	weight?: Maybe<Scalars['Int']>;
	totalTax?: Maybe<Scalars['Int']>;
	shippingLine?: Maybe<ShippingLineInput>;
};

export type UpdateCartType = {
	__typename?: 'UpdateCartType';
	lineitem?: Maybe<Cart>;
	clientMutationId?: Maybe<Scalars['String']>;
};

export type CartDeleteMutationInput = {
	id: Scalars['ID'];
	clientMutationId: Scalars['String'];
};

export type CartDeleteMutation = {
	__typename?: 'CartDeleteMutation';
	id?: Maybe<Scalars['String']>;
	message?: Maybe<Scalars['String']>;
	clientMutationId?: Maybe<Scalars['String']>;
};

export type UpdateAccountShippingAddressInput = {
	id: Scalars['String'];
};

export type UpdateAccountShippingAddress = {
	__typename?: 'UpdateAccountShippingAddress';
	account?: Maybe<Account>;
	clientMutationId?: Maybe<Scalars['String']>;
};

export type UpdateAccountBillingAddressInput = {
	id: Scalars['String'];
};

export type UpdateAccountBillingAddress = {
	__typename?: 'UpdateAccountBillingAddress';
	account?: Maybe<Account>;
	clientMutationId?: Maybe<Scalars['String']>;
};

export type UseShippingAddressAsBillingAddressInput = {
	useShippingAddressAsBillingAddress?: Maybe<Scalars['Boolean']>;
};

export type UseShippingAddressAsBillingAddress = {
	__typename?: 'UseShippingAddressAsBillingAddress';
	account?: Maybe<Account>;
	clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateOrderInput = {
	id: Array<Maybe<Scalars['ID']>>;
	paymentDetails?: Maybe<Scalars['JSON']>;
};

export type CreateAttributeInput = {
	slug?: Maybe<Scalars['String']>;
	name: Scalars['String'];
	required?: Maybe<Scalars['Boolean']>;
	inputType?: Maybe<InputTypeEnum>;
	visible?: Maybe<Scalars['Boolean']>;
	options?: Maybe<Array<Maybe<DropDownInput>>>;
	isDeleted?: Maybe<Scalars['Boolean']>;
	attributeType?: Maybe<Scalars['String']>;
	group?: Maybe<Scalars['String']>;
	useInNavigation: Scalars['Boolean'];
};

export type DropDownInput = {
	id?: Maybe<Scalars['String']>;
	name?: Maybe<Scalars['String']>;
};

export type CreateProductInput = {
	title: Scalars['String'];
	vendor: Scalars['String'];
	brand: Scalars['String'];
	description: Scalars['String'];
	shortDescription?: Maybe<Scalars['String']>;
	handle?: Maybe<Scalars['String']>;
	avatar?: Maybe<Scalars['String']>;
	images?: Maybe<Array<Maybe<Scalars['String']>>>;
	options?: Maybe<Array<Maybe<ProductOptionsInput>>>;
	publishedScope?: Maybe<PublishedScopeEnum>;
	tags: Scalars['String'];
	metaTags?: Maybe<MetaTagsInput>;
	variants: Array<Maybe<CreateVarientInput>>;
	specificationList?: Maybe<Array<Maybe<SpecificationListInput>>>;
	universal?: Maybe<Scalars['Boolean']>;
	hasMultipleOptions?: Maybe<Scalars['Boolean']>;
	store: Scalars['String'];
	category: Scalars['String'];
};

export type ProductOptionsInput = {
	name?: Maybe<Scalars['String']>;
	position?: Maybe<Scalars['Int']>;
	values?: Maybe<Array<Maybe<Scalars['JSON']>>>;
};

export type MetaTagsInput = {
	metaTitle?: Maybe<Scalars['String']>;
	metaDescription?: Maybe<Scalars['String']>;
	metaKeywords?: Maybe<Scalars['String']>;
};

export type CreateVarientInput = {
	productId?: Maybe<Scalars['ID']>;
	title: Scalars['String'];
	compareAtPrice: Scalars['Int'];
	price: Scalars['Int'];
	weight: Scalars['Int'];
	weightUnit?: Maybe<WeightUnitEnum>;
	sku: Scalars['String'];
	avatar: Scalars['String'];
	option1: Scalars['String'];
	option2?: Maybe<Scalars['String']>;
	option3?: Maybe<Scalars['String']>;
	taxable?: Maybe<Scalars['Boolean']>;
	requiresShipping?: Maybe<Scalars['Boolean']>;
	barcode?: Maybe<Scalars['String']>;
	quantity?: Maybe<Scalars['Int']>;
};

export type SpecificationListInput = {
	key?: Maybe<Scalars['String']>;
	values?: Maybe<Array<Maybe<SpecificationValuesInput>>>;
};

export type SpecificationValuesInput = {
	key?: Maybe<Scalars['String']>;
	value?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type CreateCategoryProductInput = {
	categoryId: Array<Maybe<Scalars['String']>>;
	productId: Scalars['String'];
	storeId: Scalars['String'];
};

export type DeleteMutationInput = {
	id: Scalars['ID'];
	clientMutationId: Scalars['String'];
};

export type DeleteMutation = {
	__typename?: 'DeleteMutation';
	id?: Maybe<Scalars['ID']>;
	clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateStoreProductInput = {
	storeId?: Maybe<Scalars['ID']>;
	productId?: Maybe<Scalars['ID']>;
	variantId?: Maybe<Scalars['ID']>;
	price?: Maybe<Scalars['Int']>;
	compareAtPrice?: Maybe<Scalars['Int']>;
	quantity?: Maybe<Scalars['Int']>;
	sku?: Maybe<Scalars['String']>;
};

export type UpdateStoreProductInput = {
	id: Scalars['ID'];
	storeId?: Maybe<Scalars['ID']>;
	productId?: Maybe<Scalars['ID']>;
	variantId?: Maybe<Scalars['ID']>;
	price?: Maybe<Scalars['Int']>;
	compareAtPrice?: Maybe<Scalars['Int']>;
	quantity?: Maybe<Scalars['Int']>;
	sku?: Maybe<Scalars['String']>;
};

/** LineItem Model */
export type CartMutation = {
	__typename?: 'CartMutation';
	createCart?: Maybe<Cart>;
	updateCart?: Maybe<UpdateCartType>;
	deleteCart?: Maybe<CartDeleteMutation>;
};

/** LineItem Model */
export type CartMutationCreateCartArgs = {
	input: CreateCartInputType;
};

/** LineItem Model */
export type CartMutationUpdateCartArgs = {
	input: UpdateCartInputType;
	clientMutationId: Scalars['String'];
};

/** LineItem Model */
export type CartMutationDeleteCartArgs = {
	input?: Maybe<CartDeleteMutationInput>;
};

/** Role Model */
export type RoleMutation = {
	__typename?: 'RoleMutation';
	createRole?: Maybe<RoleType>;
	updateRole?: Maybe<UpdateRoleType>;
	deleteRole?: Maybe<DeleteMutation>;
};

/** Role Model */
export type RoleMutationCreateRoleArgs = {
	input: CreateRoleInputType;
};

/** Role Model */
export type RoleMutationUpdateRoleArgs = {
	input: UpdateRoleInputType;
	clientMutationId: Scalars['String'];
};

/** Role Model */
export type RoleMutationDeleteRoleArgs = {
	input?: Maybe<DeleteMutationInput>;
};

export type CreateRoleInputType = {
	title: Scalars['String'];
	description: Scalars['String'];
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UpdateRoleInputType = {
	id: Scalars['ID'];
	title?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UpdateRoleType = {
	__typename?: 'UpdateRoleType';
	role?: Maybe<RoleType>;
	clientMutationId?: Maybe<Scalars['String']>;
};

/** Permission Model */
export type PermissionMutation = {
	__typename?: 'PermissionMutation';
	createPermission?: Maybe<PermissionType>;
	updatePermission?: Maybe<UpdatePermissionType>;
	deletePermission?: Maybe<DeleteMutation>;
};

/** Permission Model */
export type PermissionMutationCreatePermissionArgs = {
	input: CreatePermissionInputType;
};

/** Permission Model */
export type PermissionMutationUpdatePermissionArgs = {
	input: UpdatePermissionInputType;
	clientMutationId: Scalars['String'];
};

/** Permission Model */
export type PermissionMutationDeletePermissionArgs = {
	input?: Maybe<DeleteMutationInput>;
};

export type CreatePermissionInputType = {
	title: Scalars['String'];
	description: Scalars['String'];
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UpdatePermissionInputType = {
	id: Scalars['ID'];
	title?: Maybe<Scalars['String']>;
	slug?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	isDeleted?: Maybe<Scalars['Boolean']>;
};

export type UpdatePermissionType = {
	__typename?: 'UpdatePermissionType';
	permission?: Maybe<PermissionType>;
	clientMutationId?: Maybe<Scalars['String']>;
};

/** Account Model */
export type AccountMutation = {
	__typename?: 'AccountMutation';
	createAccount?: Maybe<Account>;
	updateAccount?: Maybe<UpdateAccountType>;
	deleteAccount?: Maybe<DeleteMutation>;
};

/** Account Model */
export type AccountMutationCreateAccountArgs = {
	input: CreateAccountInputType;
};

/** Account Model */
export type AccountMutationUpdateAccountArgs = {
	input: UpdateAccountInputType;
	clientMutationId: Scalars['String'];
};

/** Account Model */
export type AccountMutationDeleteAccountArgs = {
	input?: Maybe<DeleteMutationInput>;
};

export type UpdateAccountInputType = {
	id: Scalars['ID'];
	firstName?: Maybe<Scalars['String']>;
	lastName?: Maybe<Scalars['String']>;
	email?: Maybe<Scalars['String']>;
	dob?: Maybe<Scalars['DateTime']>;
	type?: Maybe<Scalars['String']>;
	gender?: Maybe<Scalars['String']>;
	password?: Maybe<Scalars['String']>;
	isSocial?: Maybe<Scalars['Boolean']>;
	socialProvider?: Maybe<Scalars['String']>;
	phone?: Maybe<Scalars['String']>;
	token?: Maybe<Scalars['String']>;
	avatar?: Maybe<Scalars['String']>;
	updatedBy?: Maybe<Scalars['ID']>;
	isDeleted?: Maybe<Scalars['Boolean']>;
	deletedBy?: Maybe<Scalars['ID']>;
	role?: Maybe<Scalars['ID']>;
	useShippingAddressForBilling?: Maybe<Scalars['Boolean']>;
	lastBillingAddress?: Maybe<Scalars['ID']>;
	lastShippingAddress?: Maybe<Scalars['ID']>;
	currency?: Maybe<Scalars['String']>;
	defaultAddress?: Maybe<Scalars['ID']>;
	lastPaymentmethod?: Maybe<Scalars['ID']>;
};

export type UpdateAccountType = {
	__typename?: 'UpdateAccountType';
	account?: Maybe<Account>;
	clientMutationId?: Maybe<Scalars['String']>;
};

/** rolePermissions Model */
export type RolePermissionsMutation = {
	__typename?: 'RolePermissionsMutation';
	createRolePermissions?: Maybe<RolePermissionsType>;
	updateRolePermissions?: Maybe<UpdateRolePermissionsType>;
	deleteRolePermissions?: Maybe<DeleteMutation>;
};

/** rolePermissions Model */
export type RolePermissionsMutationCreateRolePermissionsArgs = {
	input: CreateRolePermissionsInputType;
};

/** rolePermissions Model */
export type RolePermissionsMutationUpdateRolePermissionsArgs = {
	input: UpdateRolePermissionsInputType;
	clientMutationId: Scalars['String'];
};

/** rolePermissions Model */
export type RolePermissionsMutationDeleteRolePermissionsArgs = {
	input?: Maybe<DeleteMutationInput>;
};

export type CreateRolePermissionsInputType = {
	role: Scalars['ID'];
	permission: Scalars['ID'];
};

export type UpdateRolePermissionsInputType = {
	id: Scalars['ID'];
	role: Scalars['ID'];
	permission: Scalars['ID'];
};

export type UpdateRolePermissionsType = {
	__typename?: 'UpdateRolePermissionsType';
	rolePermissions?: Maybe<RolePermissionsType>;
	clientMutationId?: Maybe<Scalars['String']>;
};

/** Address Model */
export type AddressMutation = {
	__typename?: 'AddressMutation';
	createAddress?: Maybe<Address>;
	updateAddress?: Maybe<UpdateAddressType>;
	deleteAddress?: Maybe<DeleteMutation>;
};

/** Address Model */
export type AddressMutationCreateAddressArgs = {
	input: CreateAddressInput;
};

/** Address Model */
export type AddressMutationUpdateAddressArgs = {
	input: UpdateAddressInput;
	clientMutationId: Scalars['String'];
};

/** Address Model */
export type AddressMutationDeleteAddressArgs = {
	input?: Maybe<DeleteMutationInput>;
};

export type UpdateAddressInput = {
	id: Scalars['ID'];
	name?: Maybe<Scalars['String']>;
	phone?: Maybe<Scalars['String']>;
	address1?: Maybe<Scalars['String']>;
	address2?: Maybe<Scalars['String']>;
	city?: Maybe<Scalars['String']>;
	area?: Maybe<Scalars['String']>;
	block?: Maybe<Scalars['String']>;
	zip?: Maybe<Scalars['String']>;
	province?: Maybe<Scalars['String']>;
	country?: Maybe<Scalars['String']>;
	accountId?: Maybe<Scalars['ID']>;
	coordinates?: Maybe<CoordinatesInput>;
};

export type UpdateAddressType = {
	__typename?: 'UpdateAddressType';
	address?: Maybe<Address>;
	clientMutationId?: Maybe<Scalars['String']>;
};

/** Status Model */
export type StatusMutation = {
	__typename?: 'StatusMutation';
	createStatus?: Maybe<StatusType>;
	updateStatus?: Maybe<UpdateStatusType>;
	deleteStatus?: Maybe<DeleteMutation>;
};

/** Status Model */
export type StatusMutationCreateStatusArgs = {
	input: CreateStatusInputType;
};

/** Status Model */
export type StatusMutationUpdateStatusArgs = {
	input: UpdateStatusInputType;
	clientMutationId: Scalars['String'];
};

/** Status Model */
export type StatusMutationDeleteStatusArgs = {
	input?: Maybe<DeleteMutationInput>;
};

export type UpdateStatusInputType = {
	id: Scalars['ID'];
	title?: Maybe<Scalars['String']>;
	type?: Maybe<Scalars['String']>;
	color?: Maybe<Scalars['String']>;
	backgroundColor?: Maybe<Scalars['String']>;
};

export type UpdateStatusType = {
	__typename?: 'UpdateStatusType';
	status?: Maybe<StatusType>;
	clientMutationId: Scalars['String'];
};

/** Store Model */
export type StoreMutation = {
	__typename?: 'StoreMutation';
	createStore?: Maybe<Store>;
	updateStore?: Maybe<UpdateStoreType>;
	deleteStore?: Maybe<DeleteMutation>;
};

/** Store Model */
export type StoreMutationCreateStoreArgs = {
	input: CreateStoreInputType;
};

/** Store Model */
export type StoreMutationUpdateStoreArgs = {
	input: UpdateStoreInputType;
	clientMutationId: Scalars['String'];
};

/** Store Model */
export type StoreMutationDeleteStoreArgs = {
	input?: Maybe<DeleteMutationInput>;
};

export type CreateStoreInputType = {
	accessToken?: Maybe<Scalars['String']>;
	accountId: Scalars['ID'];
	avatar?: Maybe<ImagesInput>;
	createdAt?: Maybe<Scalars['DateTime']>;
	createdBy?: Maybe<Scalars['ID']>;
	currency?: Maybe<Scalars['String']>;
	customerEmail?: Maybe<Scalars['String']>;
	deletedAt?: Maybe<Scalars['DateTime']>;
	deletedBy?: Maybe<Scalars['ID']>;
	domain?: Maybe<Scalars['String']>;
	email?: Maybe<Scalars['String']>;
	geoMetaTags?: Maybe<Scalars['JSON']>;
	hasDiscounts?: Maybe<Scalars['Boolean']>;
	hasGiftCards?: Maybe<Scalars['Boolean']>;
	isDeleted?: Maybe<Scalars['Boolean']>;
	lastOrderNumber?: Maybe<Scalars['Int']>;
	metaDescription?: Maybe<Scalars['String']>;
	metaKeywords?: Maybe<Scalars['String']>;
	metaRobots?: Maybe<Scalars['String']>;
	metaTitle?: Maybe<Scalars['String']>;
	name: Scalars['String'];
	passwordEnabled?: Maybe<Scalars['Boolean']>;
	phone: Scalars['String'];
	planDisplayName?: Maybe<Scalars['String']>;
	planName?: Maybe<Scalars['String']>;
	sellerName?: Maybe<Scalars['String']>;
	siteStoreId?: Maybe<Scalars['String']>;
	slug?: Maybe<Scalars['String']>;
	state?: Maybe<Scalars['String']>;
	storeAddress?: Maybe<Scalars['ID']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	updatedBy?: Maybe<Scalars['ID']>;
	verifiedAt?: Maybe<Scalars['DateTime']>;
	weightUnit?: Maybe<Scalars['String']>;
	url?: Maybe<Scalars['String']>;
	totalOrders?: Maybe<Scalars['Int']>;
	facebookPixelId?: Maybe<Scalars['String']>;
	googleAnalyticsId?: Maybe<Scalars['String']>;
};

export type UpdateStoreInputType = {
	accessToken?: Maybe<Scalars['String']>;
	accountId?: Maybe<Scalars['ID']>;
	avatar?: Maybe<ImagesInput>;
	createdAt?: Maybe<Scalars['DateTime']>;
	createdBy?: Maybe<Scalars['ID']>;
	currency?: Maybe<Scalars['String']>;
	customerEmail?: Maybe<Scalars['String']>;
	deletedAt?: Maybe<Scalars['DateTime']>;
	deletedBy?: Maybe<Scalars['ID']>;
	domain?: Maybe<Scalars['String']>;
	email?: Maybe<Scalars['String']>;
	geoMetaTags?: Maybe<Scalars['JSON']>;
	hasDiscounts?: Maybe<Scalars['Boolean']>;
	hasGiftCards?: Maybe<Scalars['Boolean']>;
	id: Scalars['ID'];
	isDeleted?: Maybe<Scalars['Boolean']>;
	lastOrderNumber?: Maybe<Scalars['Int']>;
	metaDescription?: Maybe<Scalars['String']>;
	metaKeywords?: Maybe<Scalars['String']>;
	metaRobots?: Maybe<Scalars['String']>;
	metaTitle?: Maybe<Scalars['String']>;
	name?: Maybe<Scalars['String']>;
	passwordEnabled?: Maybe<Scalars['Boolean']>;
	phone?: Maybe<Scalars['String']>;
	planDisplayName?: Maybe<Scalars['String']>;
	planName?: Maybe<Scalars['String']>;
	sellerName?: Maybe<Scalars['String']>;
	siteStoreId?: Maybe<Scalars['String']>;
	slug?: Maybe<Scalars['String']>;
	state?: Maybe<Scalars['String']>;
	storeAddress?: Maybe<Scalars['ID']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	updatedBy?: Maybe<Scalars['ID']>;
	verifiedAt?: Maybe<Scalars['DateTime']>;
	weightUnit?: Maybe<Scalars['String']>;
	url?: Maybe<Scalars['String']>;
	totalOrders?: Maybe<Scalars['Int']>;
	facebookPixelId?: Maybe<Scalars['String']>;
	googleAnalyticsId?: Maybe<Scalars['String']>;
};

export type UpdateStoreType = {
	__typename?: 'UpdateStoreType';
	clientMutationId?: Maybe<Scalars['String']>;
	store?: Maybe<Store>;
};

/** PaymentMethod Model */
export type PaymentMethodMutation = {
	__typename?: 'PaymentMethodMutation';
	createPaymentMethod?: Maybe<PaymentMethodType>;
	updatePaymentMethod?: Maybe<UpdatePaymentMethodType>;
	deletePaymentMethod?: Maybe<DeleteMutation>;
};

/** PaymentMethod Model */
export type PaymentMethodMutationCreatePaymentMethodArgs = {
	input: CreatePaymentMethodInputType;
};

/** PaymentMethod Model */
export type PaymentMethodMutationUpdatePaymentMethodArgs = {
	input: UpdatePaymentMethodInputType;
	clientMutationId: Scalars['String'];
};

/** PaymentMethod Model */
export type PaymentMethodMutationDeletePaymentMethodArgs = {
	input?: Maybe<DeleteMutationInput>;
};

export type UpdatePaymentMethodInputType = {
	active?: Maybe<Scalars['Boolean']>;
	adjustmentAmount?: Maybe<Scalars['String']>;
	avatar?: Maybe<ImagesInput>;
	code?: Maybe<Scalars['String']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	id: Scalars['ID'];
	instructions?: Maybe<Scalars['String']>;
	minOrderTotal?: Maybe<Scalars['Int']>;
	maxOrderTotal?: Maybe<Scalars['Int']>;
	orderStatus?: Maybe<Scalars['String']>;
	title?: Maybe<Scalars['String']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	additionalDetails?: Maybe<Scalars['String']>;
	type?: Maybe<Scalars['String']>;
	processType?: Maybe<Scalars['String']>;
	isDeleted?: Maybe<Scalars['Boolean']>;
	urlEndPoint?: Maybe<Array<Maybe<UrlEndpointInput>>>;
	onCheckout?: Maybe<OnCheckoutInput>;
};

export type UpdatePaymentMethodType = {
	__typename?: 'UpdatePaymentMethodType';
	paymentmethod?: Maybe<PaymentMethodType>;
	clientMutationId?: Maybe<Scalars['String']>;
};

/** Category Model */
export type CategoryMutation = {
	__typename?: 'CategoryMutation';
	createCategory?: Maybe<CategoryType>;
	updateCategory?: Maybe<UpdateCategoryType>;
	deleteCategory?: Maybe<DeleteMutation>;
};

/** Category Model */
export type CategoryMutationCreateCategoryArgs = {
	input: CreateCategoryInputType;
};

/** Category Model */
export type CategoryMutationUpdateCategoryArgs = {
	input: UpdateCategoryInputType;
	clientMutationId: Scalars['String'];
};

/** Category Model */
export type CategoryMutationDeleteCategoryArgs = {
	input?: Maybe<DeleteMutationInput>;
};

export type CreateCategoryInputType = {
	title: Scalars['String'];
	slug?: Maybe<Scalars['String']>;
	parentId?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	icon?: Maybe<Scalars['String']>;
	hasChildren?: Maybe<Scalars['Boolean']>;
	count?: Maybe<Scalars['Int']>;
	level?: Maybe<Scalars['Int']>;
	disabled?: Maybe<Scalars['Boolean']>;
	type?: Maybe<Scalars['String']>;
};

export type UpdateCategoryInputType = {
	id: Scalars['ID'];
	title: Scalars['String'];
	slug?: Maybe<Scalars['String']>;
	parentId?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	icon?: Maybe<Scalars['String']>;
	hasChildren?: Maybe<Scalars['Boolean']>;
	count?: Maybe<Scalars['Int']>;
	level?: Maybe<Scalars['Int']>;
	disabled?: Maybe<Scalars['Boolean']>;
	type?: Maybe<Scalars['String']>;
};

export type UpdateCategoryType = {
	__typename?: 'UpdateCategoryType';
	category?: Maybe<CategoryType>;
	clientMutationId: Scalars['String'];
};

/** Areas Model */
export type AreaMutation = {
	__typename?: 'AreaMutation';
	createArea?: Maybe<AreaType>;
	updateArea?: Maybe<UpdateAreaType>;
	deleteArea?: Maybe<DeleteMutation>;
};

/** Areas Model */
export type AreaMutationCreateAreaArgs = {
	input: CreateAreaInputType;
};

/** Areas Model */
export type AreaMutationUpdateAreaArgs = {
	input: UpdateAreaInputType;
	clientMutationId: Scalars['String'];
};

/** Areas Model */
export type AreaMutationDeleteAreaArgs = {
	input?: Maybe<DeleteMutationInput>;
};

export type CreateAreaInputType = {
	title: Scalars['String'];
	slug?: Maybe<Scalars['String']>;
	parentId?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	icon?: Maybe<Scalars['String']>;
	hasChildren?: Maybe<Scalars['Boolean']>;
	count?: Maybe<Scalars['Int']>;
	disabled?: Maybe<Scalars['Boolean']>;
	type?: Maybe<Scalars['String']>;
};

export type UpdateAreaInputType = {
	id: Scalars['ID'];
	title: Scalars['String'];
	slug?: Maybe<Scalars['String']>;
	parentId?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	icon?: Maybe<Scalars['String']>;
	hasChildren?: Maybe<Scalars['Boolean']>;
	count?: Maybe<Scalars['Int']>;
	disabled?: Maybe<Scalars['Boolean']>;
	type?: Maybe<Scalars['String']>;
};

export type UpdateAreaType = {
	__typename?: 'UpdateAreaType';
	area?: Maybe<AreaType>;
	clientMutationId: Scalars['String'];
};

/** AttributeSet Model */
export type AttributeSetMutation = {
	__typename?: 'AttributeSetMutation';
	createAttributeSet?: Maybe<AttributeSetType>;
	updateAttributeSet?: Maybe<UpdateAttributeSet>;
	deleteAttributeSet?: Maybe<DeleteMutation>;
};

/** AttributeSet Model */
export type AttributeSetMutationCreateAttributeSetArgs = {
	input: CreateAttributeSetInput;
};

/** AttributeSet Model */
export type AttributeSetMutationUpdateAttributeSetArgs = {
	input: UpdateAttributeSetInput;
	clientMutationId: Scalars['String'];
};

/** AttributeSet Model */
export type AttributeSetMutationDeleteAttributeSetArgs = {
	input?: Maybe<DeleteMutationInput>;
};

export type CreateAttributeSetInput = {
	name: Scalars['String'];
};

export type UpdateAttributeSetInput = {
	id: Scalars['ID'];
	name: Scalars['String'];
};

export type UpdateAttributeSet = {
	__typename?: 'UpdateAttributeSet';
	attributeSet?: Maybe<AttributeSetType>;
	clientMutationId: Scalars['String'];
};

/** AttributeGroup Model */
export type AttributeGroupMutation = {
	__typename?: 'AttributeGroupMutation';
	createAttributeGroup?: Maybe<AttributeGroupType>;
	updateAttributeGroup?: Maybe<UpdateAttributeGroupType>;
	deleteAttributeGroup?: Maybe<DeleteMutation>;
};

/** AttributeGroup Model */
export type AttributeGroupMutationCreateAttributeGroupArgs = {
	input: CreateAttributeGroupInputType;
};

/** AttributeGroup Model */
export type AttributeGroupMutationUpdateAttributeGroupArgs = {
	input: UpdateAttributeGroupInputType;
	clientMutationId: Scalars['String'];
};

/** AttributeGroup Model */
export type AttributeGroupMutationDeleteAttributeGroupArgs = {
	input?: Maybe<DeleteMutationInput>;
};

export type CreateAttributeGroupInputType = {
	name: Scalars['String'];
	sortOrder?: Maybe<Scalars['Int']>;
	attributeSetId: Scalars['String'];
};

export type UpdateAttributeGroupInputType = {
	id: Scalars['ID'];
	name: Scalars['String'];
	attributeSetId?: Maybe<Scalars['String']>;
};

export type UpdateAttributeGroupType = {
	__typename?: 'UpdateAttributeGroupType';
	attributegroup?: Maybe<AttributeGroupType>;
	clientMutationId: Scalars['String'];
};

/** Attribute Model */
export type AttributeMutation = {
	__typename?: 'AttributeMutation';
	createAttribute?: Maybe<Attribute>;
	updateAttribute?: Maybe<UpdateAttribute>;
	deleteAttribute?: Maybe<DeleteMutation>;
};

/** Attribute Model */
export type AttributeMutationCreateAttributeArgs = {
	input: CreateAttributeInput;
};

/** Attribute Model */
export type AttributeMutationUpdateAttributeArgs = {
	input: UpdateAttributeInput;
	clientMutationId: Scalars['String'];
};

/** Attribute Model */
export type AttributeMutationDeleteAttributeArgs = {
	input?: Maybe<DeleteMutationInput>;
};

export type UpdateAttributeInput = {
	id: Scalars['ID'];
	name?: Maybe<Scalars['String']>;
	slug?: Maybe<Scalars['String']>;
	inputType?: Maybe<InputTypeEnum>;
	options?: Maybe<Array<Maybe<DropDownInput>>>;
	attributeType?: Maybe<Scalars['String']>;
	group?: Maybe<Scalars['String']>;
	useInNavigation?: Maybe<Scalars['Boolean']>;
};

export type UpdateAttribute = {
	__typename?: 'UpdateAttribute';
	attribute?: Maybe<Attribute>;
	clientMutationId?: Maybe<Scalars['String']>;
};

/** AttributesRelation Model */
export type AttributesRelationMutation = {
	__typename?: 'AttributesRelationMutation';
	createAttributesRelation?: Maybe<AttributesRelation>;
	updateAttributesRelation?: Maybe<UpdateAttributesRelation>;
	deleteAttributesRelation?: Maybe<DeleteMutation>;
};

/** AttributesRelation Model */
export type AttributesRelationMutationCreateAttributesRelationArgs = {
	input: CreateAttributesRelationInput;
};

/** AttributesRelation Model */
export type AttributesRelationMutationUpdateAttributesRelationArgs = {
	input: UpdateAttributesRelationInput;
	clientMutationId: Scalars['String'];
};

/** AttributesRelation Model */
export type AttributesRelationMutationDeleteAttributesRelationArgs = {
	input?: Maybe<DeleteMutationInput>;
};

export type CreateAttributesRelationInput = {
	attributeSet: Scalars['ID'];
	attributeGroup: Scalars['ID'];
	attribute: Scalars['ID'];
};

export type UpdateAttributesRelationInput = {
	id: Scalars['ID'];
	attributeSet?: Maybe<Scalars['ID']>;
	attributeGroup?: Maybe<Scalars['ID']>;
	attribute?: Maybe<Scalars['ID']>;
};

export type UpdateAttributesRelation = {
	__typename?: 'UpdateAttributesRelation';
	attributesrelation?: Maybe<AttributesRelation>;
	clientMutationId?: Maybe<Scalars['String']>;
};

/** Product Model */
export type ProductMutation = {
	__typename?: 'ProductMutation';
	createProduct?: Maybe<ProductType>;
	updateProduct?: Maybe<UpdateAttributesRelation>;
	deleteProduct?: Maybe<DeleteMutation>;
};

/** Product Model */
export type ProductMutationCreateProductArgs = {
	input: CreateProductInput;
};

/** Product Model */
export type ProductMutationUpdateProductArgs = {
	input: UpdateAttributesRelationInput;
	clientMutationId: Scalars['String'];
};

/** Product Model */
export type ProductMutationDeleteProductArgs = {
	input?: Maybe<DeleteMutationInput>;
};

/** Variant Model */
export type VariantMutation = {
	__typename?: 'VariantMutation';
	createVariant?: Maybe<Variant>;
	updateVariant?: Maybe<UpdateAttributesRelation>;
	deleteVariant?: Maybe<DeleteMutation>;
};

/** Variant Model */
export type VariantMutationCreateVariantArgs = {
	input: CreateVarientInput;
};

/** Variant Model */
export type VariantMutationUpdateVariantArgs = {
	input: UpdateAttributesRelationInput;
	clientMutationId: Scalars['String'];
};

/** Variant Model */
export type VariantMutationDeleteVariantArgs = {
	input?: Maybe<DeleteMutationInput>;
};

/** CategoryProduct Model */
export type CategoryProductMutation = {
	__typename?: 'CategoryProductMutation';
	createCategoryProduct?: Maybe<CategoryProduct>;
	updateCategoryProduct?: Maybe<UpdateCategoryProduct>;
	deleteCategoryProduct?: Maybe<DeleteMutation>;
};

/** CategoryProduct Model */
export type CategoryProductMutationCreateCategoryProductArgs = {
	input: CreateCategoryProductInput;
};

/** CategoryProduct Model */
export type CategoryProductMutationUpdateCategoryProductArgs = {
	input: UpdateCategoryProductInput;
	clientMutationId: Scalars['String'];
};

/** CategoryProduct Model */
export type CategoryProductMutationDeleteCategoryProductArgs = {
	input?: Maybe<DeleteMutationInput>;
};

export type UpdateCategoryProductInput = {
	id: Scalars['String'];
	categoryId?: Maybe<Array<Maybe<Scalars['String']>>>;
	storeId?: Maybe<Scalars['String']>;
	productId?: Maybe<Scalars['String']>;
};

export type UpdateCategoryProduct = {
	__typename?: 'UpdateCategoryProduct';
	id?: Maybe<Scalars['String']>;
	categoryId?: Maybe<CategoryType>;
	productId?: Maybe<ProductType>;
	storeId?: Maybe<Store>;
};

/** StoreProduct Model */
export type StoreProductMutation = {
	__typename?: 'StoreProductMutation';
	createStoreProduct?: Maybe<StoreProduct>;
	updateStoreProduct?: Maybe<StoreProduct>;
	deleteStoreProduct?: Maybe<DeleteMutation>;
};

/** StoreProduct Model */
export type StoreProductMutationCreateStoreProductArgs = {
	input: CreateStoreProductInput;
};

/** StoreProduct Model */
export type StoreProductMutationUpdateStoreProductArgs = {
	input: UpdateStoreProductInput;
	clientMutationId: Scalars['String'];
};

/** StoreProduct Model */
export type StoreProductMutationDeleteStoreProductArgs = {
	input?: Maybe<DeleteMutationInput>;
};

/** Brand Model */
export type BrandMutation = {
	__typename?: 'BrandMutation';
	createBrand?: Maybe<Brand>;
	updateBrand?: Maybe<Brand>;
	deleteBrand?: Maybe<DeleteMutation>;
};

/** Brand Model */
export type BrandMutationCreateBrandArgs = {
	input: CreateBrandInput;
};

/** Brand Model */
export type BrandMutationUpdateBrandArgs = {
	input: UpdateBrandInput;
	clientMutationId: Scalars['String'];
};

/** Brand Model */
export type BrandMutationDeleteBrandArgs = {
	input?: Maybe<DeleteMutationInput>;
};

export type CreateBrandInput = {
	name?: Maybe<Scalars['String']>;
	avatar?: Maybe<Scalars['String']>;
	thumbnail?: Maybe<Scalars['String']>;
};

export type UpdateBrandInput = {
	id: Scalars['ID'];
	name?: Maybe<Scalars['String']>;
	avatar?: Maybe<Scalars['String']>;
	thumbnail?: Maybe<Scalars['String']>;
};

/** CategoryAttribute Model */
export type CategoryAttributeMutation = {
	__typename?: 'CategoryAttributeMutation';
	createCategoryAttribute?: Maybe<CategoryAttribute>;
	updateCategoryAttribute?: Maybe<CategoryAttribute>;
	deleteCategoryAttribute?: Maybe<DeleteMutation>;
};

/** CategoryAttribute Model */
export type CategoryAttributeMutationCreateCategoryAttributeArgs = {
	input: CreateCategoryAttributeInput;
};

/** CategoryAttribute Model */
export type CategoryAttributeMutationUpdateCategoryAttributeArgs = {
	input: UpdateCategoryAttributeInput;
	clientMutationId: Scalars['String'];
};

/** CategoryAttribute Model */
export type CategoryAttributeMutationDeleteCategoryAttributeArgs = {
	input?: Maybe<DeleteMutationInput>;
};

export type CreateCategoryAttributeInput = {
	category: Scalars['ID'];
	attribute: Scalars['ID'];
};

export type UpdateCategoryAttributeInput = {
	id: Scalars['ID'];
	category?: Maybe<Scalars['ID']>;
	attribute?: Maybe<Scalars['ID']>;
};
