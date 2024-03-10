type UserLevel = {
  level_id: number; // REST API
  // level_id: string; // GraphQL
  level_name: 'Admin' | 'User' | 'Guest';
};

type User = {
  user_id: number; // REST API
  // user_id: string; // GraphQL
  username: string;
  password: string;
  email: string;
  user_level_id: number;
  created_at: Date | string;
};

type MediaItem = {
  media_id: number; // REST API
  user_id: number; // REST API
  // media_id: string; // GraphQL
  // user_id: string; // GraphQL
  filename: string;
  thumbnail: string;
  filesize: number;
  media_type: string;
  title: string;
  description: string | null;
  created_at: Date | string;
  serving: number;
  cook_time: string;
  ingredients: string;
  instruction: string;

};

type Comment = {
  comment_id: number; // REST API
  media_id: number; // REST API
  // comment_id: string; // GraphQL
  // media_id: string; // GraphQL
  user_id: number;
  comment_text: string;
  created_at: Date;
};

type Like = {
  like_id: number; // REST API
  media_id: number; // REST API
  user_id: number; // REST API
  // like_id: string; // GraphQL
  // media_id: string; // GraphQL
  // user_id: string; // GraphQL
  created_at: Date;
};

type Rating = {
  rating_id: number; // REST API
  media_id: number; // REST API
  user_id: number; // REST API
  // rating_id: string; // GraphQL
  // media_id: string; // GraphQL
  // user_id: string; // GraphQL
  rating_value: number;
  created_at: Date;
};

type Tag = {
  tag_id: number; // REST API
  // tag_id: string; // GraphQL
  tag_name: string;
};

type MediaItemTag = {
  media_id: number; // REST API
  tag_id: number; // REST API
  // media_id: string; // GraphQL
  // tag_id: string; // GraphQL
};

type TagResult = MediaItemTag & Tag;

type UploadResult = {
  message: string;
  data?: {
    image: string;
  };
};

type MostLikedMedia = Pick<
  MediaItem,
  | 'media_id'
  | 'filename'
  | 'filesize'
  | 'media_type'
  | 'title'
  | 'description'
  | 'created_at'
> &
  Pick<User, 'user_id' | 'username' | 'email' | 'created_at'> & {
    likes_count: bigint;
  };

// type gymnastics to get rid of user_level_id from User type and replace it with level_name from UserLevel type
type UserWithLevel = Omit<User, 'user_level_id'> &
  Pick<UserLevel, 'level_name'>;

type UserWithNoPassword = Omit<UserWithLevel, 'password'>;

type TokenContent = Pick<User, 'user_id'> & Pick<UserLevel, 'level_name'>;

// for REST API
type MediaItemWithOwner = MediaItem & Pick<User, 'username'>;

// FOR GRAPHQL
// type MediaItemWithOwner = MediaItem & {
//   owner: User;
//   tags?: Tag[];
//   likes?: Like[];
//   ratings?: Rating[];
//   likes_count: number;
//   average_rating?: number;
//   comments_count: number;
// };

// for upload server
type FileInfo = {
  filename: string;
  user_id: number;
};

export type {
  UserLevel,
  User,
  MediaItem,
  Comment,
  Like,
  Rating,
  Tag,
  MediaItemTag,
  TagResult,
  UploadResult,
  MostLikedMedia,
  UserWithLevel,
  UserWithNoPassword,
  TokenContent,
  MediaItemWithOwner,
  FileInfo,
};
