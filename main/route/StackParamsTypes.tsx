import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ConnectedProps} from 'react-redux';

export type RootStackParamList = {
  LandingScreen: undefined;
  BookListViewmoreScreen: {categoryId: number; categoryName: string};
  AuthorScreen: {
    authorId: number;
    authorName: string;
    authorType: number;
    authorImage: string;
  };
  AlbumScreen: {albumId: number; albumName: string; albumImage: string};
  VerifyScreen: {email: string; verifyType: number};
  SignUpScreen: undefined;
  AlbumListViewmoreScreen: undefined;
  LyricListViewmoreScreen: undefined;
  ChangePassword: undefined;
  ForgotPassword: undefined;
  BookDetailScreen: {bookId: number};
  FavouriteBookScreen: undefined;
  FavouriteLyricScreen: undefined;
  SearchScreen: {searchType: number};
  ResetPassword: {email: string; token: string};
  PDFView: {
    bookId: number;
    bookPath: string;
    bookName: string;
    totalPage: number;
    isFavourite: boolean;
    readPageAt: number;
  };
  ImageView: {currentImageIndex: number; lyricsImages: []};
  AuthorListViewmoreScreen: {authorType: number};
};
export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  BooksScreen: undefined;
  LyricsScreen: undefined;
  ProfileScreen: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
