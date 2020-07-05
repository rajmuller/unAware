import gql from "graphql-tag";
import * as ApolloReactCommon from "@apollo/react-common";
import * as ApolloReactHooks from "@apollo/react-hooks";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: "Query";
  isLoggedIn: Scalars["String"];
  hello: Scalars["String"];
  users: Array<User>;
  me?: Maybe<User>;
  items: Array<Item>;
  numberOfItems: Scalars["Int"];
  item: Item;
};

export type QueryItemsArgs = {
  skip?: Maybe<Scalars["Int"]>;
  take?: Maybe<Scalars["Int"]>;
};

export type QueryItemArgs = {
  id: Scalars["String"];
};

export type User = {
  __typename?: "User";
  id: Scalars["String"];
  email: Scalars["String"];
  items?: Maybe<Array<Item>>;
};

export type Item = {
  __typename?: "Item";
  id: Scalars["String"];
  title: Scalars["String"];
  description: Scalars["String"];
  image: Scalars["String"];
  largeImage: Scalars["String"];
  price: Scalars["Float"];
  createdDate: Scalars["DateTime"];
  updatedDate: Scalars["DateTime"];
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: "Mutation";
  registerUser: Scalars["Boolean"];
  loginUser: LoginResponse;
  logoutUser: Scalars["Boolean"];
  createItem: Item;
  updateItem?: Maybe<Item>;
  deleteItem: Scalars["Boolean"];
};

export type MutationRegisterUserArgs = {
  password: Scalars["String"];
  email: Scalars["String"];
};

export type MutationLoginUserArgs = {
  password: Scalars["String"];
  email: Scalars["String"];
};

export type MutationCreateItemArgs = {
  data: CreateItemInput;
};

export type MutationUpdateItemArgs = {
  data: UpdateItemInput;
};

export type MutationDeleteItemArgs = {
  id: Scalars["String"];
};

export type LoginResponse = {
  __typename?: "LoginResponse";
  accessToken: Scalars["String"];
  user: User;
};

export type CreateItemInput = {
  title: Scalars["String"];
  description: Scalars["String"];
  price: Scalars["Float"];
  image?: Maybe<Scalars["String"]>;
  largeImage?: Maybe<Scalars["String"]>;
};

export type UpdateItemInput = {
  id: Scalars["String"];
  title?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  price?: Maybe<Scalars["Float"]>;
};

export type ItemsQueryVariables = Exact<{
  skip?: Maybe<Scalars["Int"]>;
  take?: Maybe<Scalars["Int"]>;
}>;

export type ItemsQuery = { __typename?: "Query" } & {
  items: Array<
    { __typename?: "Item" } & Pick<
      Item,
      | "id"
      | "title"
      | "description"
      | "price"
      | "createdDate"
      | "updatedDate"
      | "image"
      | "largeImage"
    > & { user?: Maybe<{ __typename?: "User" } & Pick<User, "id" | "email">> }
  >;
};

export type ItemQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type ItemQuery = { __typename?: "Query" } & {
  item: { __typename?: "Item" } & Pick<
    Item,
    | "id"
    | "title"
    | "description"
    | "price"
    | "createdDate"
    | "updatedDate"
    | "image"
    | "largeImage"
  > & { user?: Maybe<{ __typename?: "User" } & Pick<User, "id" | "email">> };
};

export type NumberOfItemsQueryVariables = Exact<{ [key: string]: never }>;

export type NumberOfItemsQuery = { __typename?: "Query" } & Pick<
  Query,
  "numberOfItems"
>;

export type CreateItemMutationVariables = Exact<{
  title: Scalars["String"];
  price: Scalars["Float"];
  description: Scalars["String"];
  image?: Maybe<Scalars["String"]>;
  largeImage?: Maybe<Scalars["String"]>;
}>;

export type CreateItemMutation = { __typename?: "Mutation" } & {
  createItem: { __typename?: "Item" } & Pick<
    Item,
    | "id"
    | "title"
    | "description"
    | "price"
    | "createdDate"
    | "updatedDate"
    | "image"
    | "largeImage"
  > & { user?: Maybe<{ __typename?: "User" } & Pick<User, "id" | "email">> };
};

export type UpdateItemMutationVariables = Exact<{
  id: Scalars["String"];
  title?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  price?: Maybe<Scalars["Float"]>;
}>;

export type UpdateItemMutation = { __typename?: "Mutation" } & {
  updateItem?: Maybe<
    { __typename?: "Item" } & Pick<Item, "title" | "description" | "price">
  >;
};

export type DeleteItemMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type DeleteItemMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "deleteItem"
>;

export type RegisterUserMutationVariables = Exact<{
  email: Scalars["String"];
  password: Scalars["String"];
}>;

export type RegisterUserMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "registerUser"
>;

export type LoginUserMutationVariables = Exact<{
  email: Scalars["String"];
  password: Scalars["String"];
}>;

export type LoginUserMutation = { __typename?: "Mutation" } & {
  loginUser: { __typename?: "LoginResponse" } & Pick<
    LoginResponse,
    "accessToken"
  > & { user: { __typename?: "User" } & Pick<User, "id" | "email"> };
};

export type LogoutUserMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutUserMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "logoutUser"
>;

export type UsersQueryVariables = Exact<{ [key: string]: never }>;

export type UsersQuery = { __typename?: "Query" } & {
  users: Array<{ __typename?: "User" } & Pick<User, "id" | "email">>;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: "Query" } & {
  me?: Maybe<{ __typename?: "User" } & Pick<User, "id" | "email">>;
};

export type IsLoggedInQueryVariables = Exact<{ [key: string]: never }>;

export type IsLoggedInQuery = { __typename?: "Query" } & Pick<
  Query,
  "isLoggedIn"
>;

export type HelloQueryVariables = Exact<{ [key: string]: never }>;

export type HelloQuery = { __typename?: "Query" } & Pick<Query, "hello">;

export const ItemsDocument = gql`
  query items($skip: Int, $take: Int) {
    items(skip: $skip, take: $take) {
      id
      title
      description
      price
      createdDate
      updatedDate
      image
      largeImage
      user {
        id
        email
      }
    }
  }
`;

/**
 * __useItemsQuery__
 *
 * To run a query within a React component, call `useItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useItemsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useItemsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    ItemsQuery,
    ItemsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<ItemsQuery, ItemsQueryVariables>(
    ItemsDocument,
    baseOptions
  );
}
export function useItemsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    ItemsQuery,
    ItemsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<ItemsQuery, ItemsQueryVariables>(
    ItemsDocument,
    baseOptions
  );
}
export type ItemsQueryHookResult = ReturnType<typeof useItemsQuery>;
export type ItemsLazyQueryHookResult = ReturnType<typeof useItemsLazyQuery>;
export type ItemsQueryResult = ApolloReactCommon.QueryResult<
  ItemsQuery,
  ItemsQueryVariables
>;
export const ItemDocument = gql`
  query item($id: String!) {
    item(id: $id) {
      id
      title
      description
      price
      createdDate
      updatedDate
      image
      largeImage
      user {
        id
        email
      }
    }
  }
`;

/**
 * __useItemQuery__
 *
 * To run a query within a React component, call `useItemQuery` and pass it any options that fit your needs.
 * When your component renders, `useItemQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useItemQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useItemQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<ItemQuery, ItemQueryVariables>
) {
  return ApolloReactHooks.useQuery<ItemQuery, ItemQueryVariables>(
    ItemDocument,
    baseOptions
  );
}
export function useItemLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    ItemQuery,
    ItemQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<ItemQuery, ItemQueryVariables>(
    ItemDocument,
    baseOptions
  );
}
export type ItemQueryHookResult = ReturnType<typeof useItemQuery>;
export type ItemLazyQueryHookResult = ReturnType<typeof useItemLazyQuery>;
export type ItemQueryResult = ApolloReactCommon.QueryResult<
  ItemQuery,
  ItemQueryVariables
>;
export const NumberOfItemsDocument = gql`
  query numberOfItems {
    numberOfItems
  }
`;

/**
 * __useNumberOfItemsQuery__
 *
 * To run a query within a React component, call `useNumberOfItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useNumberOfItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNumberOfItemsQuery({
 *   variables: {
 *   },
 * });
 */
export function useNumberOfItemsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    NumberOfItemsQuery,
    NumberOfItemsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    NumberOfItemsQuery,
    NumberOfItemsQueryVariables
  >(NumberOfItemsDocument, baseOptions);
}
export function useNumberOfItemsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    NumberOfItemsQuery,
    NumberOfItemsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    NumberOfItemsQuery,
    NumberOfItemsQueryVariables
  >(NumberOfItemsDocument, baseOptions);
}
export type NumberOfItemsQueryHookResult = ReturnType<
  typeof useNumberOfItemsQuery
>;
export type NumberOfItemsLazyQueryHookResult = ReturnType<
  typeof useNumberOfItemsLazyQuery
>;
export type NumberOfItemsQueryResult = ApolloReactCommon.QueryResult<
  NumberOfItemsQuery,
  NumberOfItemsQueryVariables
>;
export const CreateItemDocument = gql`
  mutation createItem(
    $title: String!
    $price: Float!
    $description: String!
    $image: String
    $largeImage: String
  ) {
    createItem(
      data: {
        title: $title
        price: $price
        description: $description
        image: $image
        largeImage: $largeImage
      }
    ) {
      id
      title
      description
      price
      createdDate
      updatedDate
      image
      largeImage
      user {
        id
        email
      }
    }
  }
`;
export type CreateItemMutationFn = ApolloReactCommon.MutationFunction<
  CreateItemMutation,
  CreateItemMutationVariables
>;

/**
 * __useCreateItemMutation__
 *
 * To run a mutation, you first call `useCreateItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createItemMutation, { data, loading, error }] = useCreateItemMutation({
 *   variables: {
 *      title: // value for 'title'
 *      price: // value for 'price'
 *      description: // value for 'description'
 *      image: // value for 'image'
 *      largeImage: // value for 'largeImage'
 *   },
 * });
 */
export function useCreateItemMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateItemMutation,
    CreateItemMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    CreateItemMutation,
    CreateItemMutationVariables
  >(CreateItemDocument, baseOptions);
}
export type CreateItemMutationHookResult = ReturnType<
  typeof useCreateItemMutation
>;
export type CreateItemMutationResult = ApolloReactCommon.MutationResult<
  CreateItemMutation
>;
export type CreateItemMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateItemMutation,
  CreateItemMutationVariables
>;
export const UpdateItemDocument = gql`
  mutation updateItem(
    $id: String!
    $title: String
    $description: String
    $price: Float
  ) {
    updateItem(
      data: { id: $id, title: $title, description: $description, price: $price }
    ) {
      title
      description
      price
    }
  }
`;
export type UpdateItemMutationFn = ApolloReactCommon.MutationFunction<
  UpdateItemMutation,
  UpdateItemMutationVariables
>;

/**
 * __useUpdateItemMutation__
 *
 * To run a mutation, you first call `useUpdateItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateItemMutation, { data, loading, error }] = useUpdateItemMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      price: // value for 'price'
 *   },
 * });
 */
export function useUpdateItemMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateItemMutation,
    UpdateItemMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    UpdateItemMutation,
    UpdateItemMutationVariables
  >(UpdateItemDocument, baseOptions);
}
export type UpdateItemMutationHookResult = ReturnType<
  typeof useUpdateItemMutation
>;
export type UpdateItemMutationResult = ApolloReactCommon.MutationResult<
  UpdateItemMutation
>;
export type UpdateItemMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateItemMutation,
  UpdateItemMutationVariables
>;
export const DeleteItemDocument = gql`
  mutation deleteItem($id: String!) {
    deleteItem(id: $id)
  }
`;
export type DeleteItemMutationFn = ApolloReactCommon.MutationFunction<
  DeleteItemMutation,
  DeleteItemMutationVariables
>;

/**
 * __useDeleteItemMutation__
 *
 * To run a mutation, you first call `useDeleteItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteItemMutation, { data, loading, error }] = useDeleteItemMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteItemMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DeleteItemMutation,
    DeleteItemMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    DeleteItemMutation,
    DeleteItemMutationVariables
  >(DeleteItemDocument, baseOptions);
}
export type DeleteItemMutationHookResult = ReturnType<
  typeof useDeleteItemMutation
>;
export type DeleteItemMutationResult = ApolloReactCommon.MutationResult<
  DeleteItemMutation
>;
export type DeleteItemMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteItemMutation,
  DeleteItemMutationVariables
>;
export const RegisterUserDocument = gql`
  mutation registerUser($email: String!, $password: String!) {
    registerUser(email: $email, password: $password)
  }
`;
export type RegisterUserMutationFn = ApolloReactCommon.MutationFunction<
  RegisterUserMutation,
  RegisterUserMutationVariables
>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterUserMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RegisterUserMutation,
    RegisterUserMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    RegisterUserMutation,
    RegisterUserMutationVariables
  >(RegisterUserDocument, baseOptions);
}
export type RegisterUserMutationHookResult = ReturnType<
  typeof useRegisterUserMutation
>;
export type RegisterUserMutationResult = ApolloReactCommon.MutationResult<
  RegisterUserMutation
>;
export type RegisterUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RegisterUserMutation,
  RegisterUserMutationVariables
>;
export const LoginUserDocument = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
      user {
        id
        email
      }
    }
  }
`;
export type LoginUserMutationFn = ApolloReactCommon.MutationFunction<
  LoginUserMutation,
  LoginUserMutationVariables
>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginUserMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    LoginUserMutation,
    LoginUserMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    LoginUserMutation,
    LoginUserMutationVariables
  >(LoginUserDocument, baseOptions);
}
export type LoginUserMutationHookResult = ReturnType<
  typeof useLoginUserMutation
>;
export type LoginUserMutationResult = ApolloReactCommon.MutationResult<
  LoginUserMutation
>;
export type LoginUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LoginUserMutation,
  LoginUserMutationVariables
>;
export const LogoutUserDocument = gql`
  mutation logoutUser {
    logoutUser
  }
`;
export type LogoutUserMutationFn = ApolloReactCommon.MutationFunction<
  LogoutUserMutation,
  LogoutUserMutationVariables
>;

/**
 * __useLogoutUserMutation__
 *
 * To run a mutation, you first call `useLogoutUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutUserMutation, { data, loading, error }] = useLogoutUserMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutUserMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    LogoutUserMutation,
    LogoutUserMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    LogoutUserMutation,
    LogoutUserMutationVariables
  >(LogoutUserDocument, baseOptions);
}
export type LogoutUserMutationHookResult = ReturnType<
  typeof useLogoutUserMutation
>;
export type LogoutUserMutationResult = ApolloReactCommon.MutationResult<
  LogoutUserMutation
>;
export type LogoutUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LogoutUserMutation,
  LogoutUserMutationVariables
>;
export const UsersDocument = gql`
  query users {
    users {
      id
      email
    }
  }
`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    UsersQuery,
    UsersQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    baseOptions
  );
}
export function useUsersLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    UsersQuery,
    UsersQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    baseOptions
  );
}
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = ApolloReactCommon.QueryResult<
  UsersQuery,
  UsersQueryVariables
>;
export const MeDocument = gql`
  query me {
    me {
      id
      email
    }
  }
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>
) {
  return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(
    MeDocument,
    baseOptions
  );
}
export function useMeLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(
    MeDocument,
    baseOptions
  );
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<
  MeQuery,
  MeQueryVariables
>;
export const IsLoggedInDocument = gql`
  query isLoggedIn {
    isLoggedIn
  }
`;

/**
 * __useIsLoggedInQuery__
 *
 * To run a query within a React component, call `useIsLoggedInQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsLoggedInQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsLoggedInQuery({
 *   variables: {
 *   },
 * });
 */
export function useIsLoggedInQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    IsLoggedInQuery,
    IsLoggedInQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<IsLoggedInQuery, IsLoggedInQueryVariables>(
    IsLoggedInDocument,
    baseOptions
  );
}
export function useIsLoggedInLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    IsLoggedInQuery,
    IsLoggedInQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    IsLoggedInQuery,
    IsLoggedInQueryVariables
  >(IsLoggedInDocument, baseOptions);
}
export type IsLoggedInQueryHookResult = ReturnType<typeof useIsLoggedInQuery>;
export type IsLoggedInLazyQueryHookResult = ReturnType<
  typeof useIsLoggedInLazyQuery
>;
export type IsLoggedInQueryResult = ApolloReactCommon.QueryResult<
  IsLoggedInQuery,
  IsLoggedInQueryVariables
>;
export const HelloDocument = gql`
  query hello {
    hello
  }
`;

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    HelloQuery,
    HelloQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<HelloQuery, HelloQueryVariables>(
    HelloDocument,
    baseOptions
  );
}
export function useHelloLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    HelloQuery,
    HelloQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<HelloQuery, HelloQueryVariables>(
    HelloDocument,
    baseOptions
  );
}
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloQueryResult = ApolloReactCommon.QueryResult<
  HelloQuery,
  HelloQueryVariables
>;
