import gql from "graphql-tag";
import * as Urql from "urql";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
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
  permission?: Maybe<Array<Permission>>;
  items?: Maybe<Array<Item>>;
};

export enum Permission {
  Admin = "ADMIN",
  User = "USER",
  Itemcreate = "ITEMCREATE",
  Itemdelete = "ITEMDELETE",
  Permissionupdate = "PERMISSIONUPDATE",
}

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
  registerUser: User;
  loginUser: LoginResponse;
  logoutUser: Scalars["Boolean"];
  createItem: Item;
  updateItem?: Maybe<Item>;
  deleteItem: Scalars["Boolean"];
};

export type MutationRegisterUserArgs = {
  permission?: Maybe<Array<Permission>>;
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

export type RegisterUserMutation = { __typename?: "Mutation" } & {
  registerUser: { __typename?: "User" } & Pick<User, "id" | "email">;
};

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

export function useItemsQuery(
  options: Omit<Urql.UseQueryArgs<ItemsQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<ItemsQuery>({ query: ItemsDocument, ...options });
}
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

export function useItemQuery(
  options: Omit<Urql.UseQueryArgs<ItemQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<ItemQuery>({ query: ItemDocument, ...options });
}
export const NumberOfItemsDocument = gql`
  query numberOfItems {
    numberOfItems
  }
`;

export function useNumberOfItemsQuery(
  options: Omit<Urql.UseQueryArgs<NumberOfItemsQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<NumberOfItemsQuery>({
    query: NumberOfItemsDocument,
    ...options,
  });
}
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

export function useCreateItemMutation() {
  return Urql.useMutation<CreateItemMutation, CreateItemMutationVariables>(
    CreateItemDocument
  );
}
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

export function useUpdateItemMutation() {
  return Urql.useMutation<UpdateItemMutation, UpdateItemMutationVariables>(
    UpdateItemDocument
  );
}
export const DeleteItemDocument = gql`
  mutation deleteItem($id: String!) {
    deleteItem(id: $id)
  }
`;

export function useDeleteItemMutation() {
  return Urql.useMutation<DeleteItemMutation, DeleteItemMutationVariables>(
    DeleteItemDocument
  );
}
export const RegisterUserDocument = gql`
  mutation registerUser($email: String!, $password: String!) {
    registerUser(email: $email, password: $password) {
      id
      email
    }
  }
`;

export function useRegisterUserMutation() {
  return Urql.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(
    RegisterUserDocument
  );
}
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

export function useLoginUserMutation() {
  return Urql.useMutation<LoginUserMutation, LoginUserMutationVariables>(
    LoginUserDocument
  );
}
export const LogoutUserDocument = gql`
  mutation logoutUser {
    logoutUser
  }
`;

export function useLogoutUserMutation() {
  return Urql.useMutation<LogoutUserMutation, LogoutUserMutationVariables>(
    LogoutUserDocument
  );
}
export const UsersDocument = gql`
  query users {
    users {
      id
      email
    }
  }
`;

export function useUsersQuery(
  options: Omit<Urql.UseQueryArgs<UsersQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<UsersQuery>({ query: UsersDocument, ...options });
}
export const MeDocument = gql`
  query me {
    me {
      id
      email
    }
  }
`;

export function useMeQuery(
  options: Omit<Urql.UseQueryArgs<MeQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
}
export const IsLoggedInDocument = gql`
  query isLoggedIn {
    isLoggedIn
  }
`;

export function useIsLoggedInQuery(
  options: Omit<Urql.UseQueryArgs<IsLoggedInQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<IsLoggedInQuery>({
    query: IsLoggedInDocument,
    ...options,
  });
}
export const HelloDocument = gql`
  query hello {
    hello
  }
`;

export function useHelloQuery(
  options: Omit<Urql.UseQueryArgs<HelloQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<HelloQuery>({ query: HelloDocument, ...options });
}
