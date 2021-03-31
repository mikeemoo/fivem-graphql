import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Container = {
  __typename?: 'Container';
  id: Scalars['String'];
  size: Scalars['Int'];
  items: Array<Item>;
};

export type Entity = {
  __typename?: 'Entity';
  entityId: Scalars['Int'];
  isPlayer: Scalars['Boolean'];
  armour: Scalars['Float'];
  maxHealth: Scalars['Float'];
  health: Scalars['Float'];
  rotation: Vector3;
  heading: Scalars['Float'];
  coords: Vector3;
  modelHash: Scalars['String'];
  type: Scalars['String'];
  populationType: Scalars['String'];
  causeOfDeath?: Maybe<Scalars['String']>;
  currentVehicle?: Maybe<Entity>;
  lastVehicle?: Maybe<Entity>;
  numberPlate: Scalars['String'];
  session?: Maybe<Session>;
};

export type Item = {
  __typename?: 'Item';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Player = {
  __typename?: 'Player';
  id: Scalars['Int'];
  identifiers: Array<Scalars['String']>;
  fullName: Scalars['String'];
  session?: Maybe<Session>;
  inventory: Container;
};

export type Query = {
  __typename?: 'Query';
  container?: Maybe<Container>;
  sessions: Array<Session>;
  session?: Maybe<Session>;
  peds: Array<Entity>;
  vehicles: Array<Entity>;
  entities: Array<Entity>;
  entity?: Maybe<Entity>;
  players: Array<Player>;
};


export type QueryContainerArgs = {
  id: Scalars['String'];
};


export type QuerySessionArgs = {
  sessionId: Scalars['String'];
};


export type QueryEntityArgs = {
  entityId: Scalars['Int'];
};

export type Session = {
  __typename?: 'Session';
  sessionId: Scalars['String'];
  name: Scalars['String'];
  ping: Scalars['Int'];
  invincible: Scalars['Boolean'];
  identifiers: Array<Maybe<Scalars['String']>>;
  maxArmour: Scalars['Float'];
  maxHealth: Scalars['Float'];
  endpoint: Scalars['String'];
  ped: Entity;
  tokens: Array<Scalars['String']>;
  cameraRotation: Vector3;
  player: Player;
};

export type Vector3 = {
  __typename?: 'Vector3';
  x: Scalars['Float'];
  y: Scalars['Float'];
  z: Scalars['Float'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
    ResolverFn<TResult, TParent, TContext, TArgs>

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

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

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
  Container: ResolverTypeWrapper<Container>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Entity: ResolverTypeWrapper<Entity>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Item: ResolverTypeWrapper<Item>;
  Player: ResolverTypeWrapper<Player>;
  Query: ResolverTypeWrapper<{}>;
  Session: ResolverTypeWrapper<Session>;
  Vector3: ResolverTypeWrapper<Vector3>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Container: Container;
  String: Scalars['String'];
  Int: Scalars['Int'];
  Entity: Entity;
  Boolean: Scalars['Boolean'];
  Float: Scalars['Float'];
  Item: Item;
  Player: Player;
  Query: {};
  Session: Session;
  Vector3: Vector3;
};

export type ContainerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Container'] = ResolversParentTypes['Container']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  size?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['Item']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EntityResolvers<ContextType = any, ParentType extends ResolversParentTypes['Entity'] = ResolversParentTypes['Entity']> = {
  entityId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  isPlayer?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  armour?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  maxHealth?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  health?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  rotation?: Resolver<ResolversTypes['Vector3'], ParentType, ContextType>;
  heading?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  coords?: Resolver<ResolversTypes['Vector3'], ParentType, ContextType>;
  modelHash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  populationType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  causeOfDeath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  currentVehicle?: Resolver<Maybe<ResolversTypes['Entity']>, ParentType, ContextType>;
  lastVehicle?: Resolver<Maybe<ResolversTypes['Entity']>, ParentType, ContextType>;
  numberPlate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  session?: Resolver<Maybe<ResolversTypes['Session']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['Item'] = ResolversParentTypes['Item']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlayerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Player'] = ResolversParentTypes['Player']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  identifiers?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  fullName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  session?: Resolver<Maybe<ResolversTypes['Session']>, ParentType, ContextType>;
  inventory?: Resolver<ResolversTypes['Container'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  container?: Resolver<Maybe<ResolversTypes['Container']>, ParentType, ContextType, RequireFields<QueryContainerArgs, 'id'>>;
  sessions?: Resolver<Array<ResolversTypes['Session']>, ParentType, ContextType>;
  session?: Resolver<Maybe<ResolversTypes['Session']>, ParentType, ContextType, RequireFields<QuerySessionArgs, 'sessionId'>>;
  peds?: Resolver<Array<ResolversTypes['Entity']>, ParentType, ContextType>;
  vehicles?: Resolver<Array<ResolversTypes['Entity']>, ParentType, ContextType>;
  entities?: Resolver<Array<ResolversTypes['Entity']>, ParentType, ContextType>;
  entity?: Resolver<Maybe<ResolversTypes['Entity']>, ParentType, ContextType, RequireFields<QueryEntityArgs, 'entityId'>>;
  players?: Resolver<Array<ResolversTypes['Player']>, ParentType, ContextType>;
};

export type SessionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Session'] = ResolversParentTypes['Session']> = {
  sessionId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ping?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  invincible?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  identifiers?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  maxArmour?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  maxHealth?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  endpoint?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ped?: Resolver<ResolversTypes['Entity'], ParentType, ContextType>;
  tokens?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  cameraRotation?: Resolver<ResolversTypes['Vector3'], ParentType, ContextType>;
  player?: Resolver<ResolversTypes['Player'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Vector3Resolvers<ContextType = any, ParentType extends ResolversParentTypes['Vector3'] = ResolversParentTypes['Vector3']> = {
  x?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  y?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  z?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Container?: ContainerResolvers<ContextType>;
  Entity?: EntityResolvers<ContextType>;
  Item?: ItemResolvers<ContextType>;
  Player?: PlayerResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Session?: SessionResolvers<ContextType>;
  Vector3?: Vector3Resolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
