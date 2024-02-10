import { RecipeItem, UserWithNoPassword } from './DBTypes';

type MessageResponse = {
  message: string;
};

type ErrorResponse = MessageResponse & {
  stack?: string;
};

type RecipeResponse = MessageResponse & {
  recipe: RecipeItem | RecipeItem[];
};

// for auth server
type LoginResponse = MessageResponse & {
  token: string;
  message: string;
  user: UserWithNoPassword;
};

type UserResponse = MessageResponse & {
  user: UserWithNoPassword;
};

type UserDeleteResponse = MessageResponse & {
  user: { user_id: number };
};

// for upload server
type UploadResponse = MessageResponse & {
  data: {
    filename: string;
    media_type: string;
    filesize: number;
  };
};

export type {
  MessageResponse,
  ErrorResponse,
  RecipeResponse,
  LoginResponse,
  UploadResponse,
  UserResponse,
  UserDeleteResponse,
};
