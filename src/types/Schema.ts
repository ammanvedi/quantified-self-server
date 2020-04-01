import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Coordinate = {
   __typename?: 'Coordinate';
  lat: Scalars['Float'];
  lng: Scalars['Float'];
};

export type HeartrateDescription = {
   __typename?: 'HeartrateDescription';
  averageHeartrate: Scalars['Float'];
  maxHeartrate: Scalars['Float'];
};

export type LocationDescription = {
   __typename?: 'LocationDescription';
  startPosition: Coordinate;
  endPosition: Coordinate;
  city?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  mapPolyline?: Maybe<Scalars['String']>;
};

export type Query = {
   __typename?: 'Query';
  runs?: Maybe<Array<StravaRunningActivity>>;
};


export type QueryRunsArgs = {
  limit: Scalars['Int'];
};

export type SpeedDescription = {
   __typename?: 'SpeedDescription';
  averageSpeed: Scalars['Float'];
  maxSpeed: Scalars['Float'];
};

export type StravaRunningActivity = {
   __typename?: 'StravaRunningActivity';
  name: Scalars['String'];
  distance: Scalars['Int'];
  movingTime: Scalars['Int'];
  elapsedTime: Scalars['Int'];
  elevationGain: Scalars['Int'];
  startDateTime: Scalars['String'];
  endDateTime: Scalars['String'];
  location: LocationDescription;
  speed: SpeedDescription;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  StravaRunningActivity: ResolverTypeWrapper<StravaRunningActivity>,
  String: ResolverTypeWrapper<Scalars['String']>,
  LocationDescription: ResolverTypeWrapper<LocationDescription>,
  Coordinate: ResolverTypeWrapper<Coordinate>,
  Float: ResolverTypeWrapper<Scalars['Float']>,
  SpeedDescription: ResolverTypeWrapper<SpeedDescription>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  HeartrateDescription: ResolverTypeWrapper<HeartrateDescription>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  Int: Scalars['Int'],
  StravaRunningActivity: StravaRunningActivity,
  String: Scalars['String'],
  LocationDescription: LocationDescription,
  Coordinate: Coordinate,
  Float: Scalars['Float'],
  SpeedDescription: SpeedDescription,
  Boolean: Scalars['Boolean'],
  HeartrateDescription: HeartrateDescription,
};

export type CoordinateResolvers<ContextType = any, ParentType extends ResolversParentTypes['Coordinate'] = ResolversParentTypes['Coordinate']> = {
  lat?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  lng?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type HeartrateDescriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['HeartrateDescription'] = ResolversParentTypes['HeartrateDescription']> = {
  averageHeartrate?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  maxHeartrate?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type LocationDescriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['LocationDescription'] = ResolversParentTypes['LocationDescription']> = {
  startPosition?: Resolver<ResolversTypes['Coordinate'], ParentType, ContextType>,
  endPosition?: Resolver<ResolversTypes['Coordinate'], ParentType, ContextType>,
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  mapPolyline?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  runs?: Resolver<Maybe<Array<ResolversTypes['StravaRunningActivity']>>, ParentType, ContextType, RequireFields<QueryRunsArgs, 'limit'>>,
};

export type SpeedDescriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['SpeedDescription'] = ResolversParentTypes['SpeedDescription']> = {
  averageSpeed?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  maxSpeed?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type StravaRunningActivityResolvers<ContextType = any, ParentType extends ResolversParentTypes['StravaRunningActivity'] = ResolversParentTypes['StravaRunningActivity']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  distance?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  movingTime?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  elapsedTime?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  elevationGain?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  startDateTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  endDateTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  location?: Resolver<ResolversTypes['LocationDescription'], ParentType, ContextType>,
  speed?: Resolver<ResolversTypes['SpeedDescription'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type Resolvers<ContextType = any> = {
  Coordinate?: CoordinateResolvers<ContextType>,
  HeartrateDescription?: HeartrateDescriptionResolvers<ContextType>,
  LocationDescription?: LocationDescriptionResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  SpeedDescription?: SpeedDescriptionResolvers<ContextType>,
  StravaRunningActivity?: StravaRunningActivityResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
