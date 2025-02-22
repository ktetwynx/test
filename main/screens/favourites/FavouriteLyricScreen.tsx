import React, {useState, useEffect, useCallback, useContext} from 'react';
import {
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import {RootStackScreenProps} from '../../route/StackParamsTypes';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BackButton} from '../../components/BackButton';
import {ConnectedProps, connect} from 'react-redux';
import {ApiFetchService} from '../../service/ApiFetchService';
import {API_URL, ROW_COUNT} from '../../config/Constant';
import {ThemeContext} from '../../utility/ThemeProvider';
import i18n from '../../language/i18n';
import {TextView} from '../../components/TextView';
import {useFocusEffect} from '@react-navigation/native';
import {LoadingScreen} from '../../components/LoadingScreen';
import {GeneralColor} from '../../utility/Themes';
import * as Animatable from 'react-native-animatable';

const mapstateToProps = (state: {profile: any; token: any}) => {
  return {
    profile: state.profile,
    token: state.token,
  };
};

const mapDispatchToProps = (dispatch: (arg0: any) => void) => {
  return {};
};

const connector = connect(mapstateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector> &
  RootStackScreenProps<'FavouriteLyricScreen'>;

function FavouriteLyricScreen(props: Props) {
  const context = useContext(ThemeContext);
  const {theme} = context;
  const [lyricsImages, setLyricsImages] = useState<any>();
  const [favList, setFavList] = useState<any>([]);
  const [screenRefresh, setScreenRefresh] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pageAt, setPageAt] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const animationForScreen = 'fadeInUp';
  const [label, setLabel] = React.useState({
    fav_lyric_list: i18n.t('fav_lyric_list'),
  });

  useEffect(() => {
    const unsubscribe = i18n.onChange(() => {
      setLabel({
        fav_lyric_list: i18n.t('fav_lyric_list'),
      });
    });
    return unsubscribe;
  }, []);

  // useFocusEffect(
  //   useCallback(() => {
  //     fetchFavouriteList(pageAt);
  //   }, [props.profile.id, pageAt]),
  // );

  useEffect(() => {
    fetchFavouriteList(0);
  }, [props.profile.id]);

  useEffect(() => {
    if (screenRefresh) {
      setPageAt(0);
      fetchFavouriteList(0);
    }
  }, [screenRefresh]);

  useEffect(() => {
    let images = [];
    for (let data of favList) {
      images.push({
        url: API_URL + data.imgPath,
        isSaved: data.saved,
        lyricsId: data.id,
        lyricText: data.lyricText,
        lyricTitle: data.name,
        lyricAuthor: data.authors,
      });
    }
    setLyricsImages(images);
  }, [favList]);

  const onRefreshScreen = useCallback(() => {
    setScreenRefresh(true);
  }, []);

  const onEndListReached = () => {
    if (totalPage != pageAt) {
      const currentPage = pageAt + 1;
      setPageAt(currentPage);
      setIsLoading(true);
      fetchFavouriteList(currentPage);
    }
  };
  const goBack = useCallback(() => {
    props.navigation.goBack();
  }, []);

  const fetchFavouriteList = useCallback(
    async (pageAt: number) => {
      let formData = new FormData();
      formData.append('userId', props.profile.id);
      formData.append('page', pageAt);
      formData.append('size', ROW_COUNT);
      formData.append('category', 'lyric');
      await ApiFetchService(API_URL + 'user/saved-list', formData, {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + props.token,
      }).then((response: any) => {
        setTimeout(() => {
          setIsLoading(false);
          setScreenRefresh(false);
        }, 1000);
        if (response.code == 200) {
          setFavList((prev: any) =>
            pageAt === 0
              ? response.data.content
              : [...prev, ...response.data.content],
          );
          setTotalPage(response.data.totalPages);
        }
      });
    },
    [props.profile.id],
  );

  const clickedLyric = useCallback(
    (item: any) => {
      props.navigation.navigate('ImageView', {
        currentImageIndex: item.index,
        lyricsImages: lyricsImages,
        isComeFromLyricText: false,
      });
    },
    [lyricsImages],
  );

  const renderFavItem = useCallback(
    (item: any) => {
      return (
        <Animatable.View
          style={{
            marginBottom: 12,
            flex: 0.5,
            marginRight: 12,
            justifyContent: 'space-between',
            flexDirection: 'column',
          }}
          useNativeDriver={true}
          animation={animationForScreen}>
          <TouchableOpacity onPress={() => clickedLyric(item)}>
            <Image
              style={{
                backgroundColor: GeneralColor.light_grey,
                borderRadius: 20,
                height: 200,
              }}
              source={{uri: API_URL + item.item.imgPath}}
            />
            <TextView
              numberOfLines={2}
              text={item.item.name}
              textStyle={{
                alignSelf: 'center',
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
                marginTop: 6,
              }}
            />
            <TextView
              text={item.item.authors[0].name}
              numberOfLines={1}
              textStyle={{alignSelf: 'center', marginTop: 2, opacity: 0.5}}
            />
          </TouchableOpacity>
        </Animatable.View>
      );
    },
    [favList, props.token, lyricsImages],
  );
  return (
    <View>
      <SafeAreaView
        style={{
          width: '100%',
          height: '100%',
          flexDirection: 'column',
          backgroundColor: theme.backgroundColor,
        }}
        edges={['top']}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
          <BackButton style={{marginLeft: 12}} clickedGoBack={goBack} />
          <Animatable.View
            useNativeDriver={true}
            animation={animationForScreen}>
            <TextView
              text={label.fav_lyric_list}
              textStyle={{fontSize: 18, fontWeight: 'bold', marginLeft: 12}}
            />
          </Animatable.View>
        </View>
        <FlatList
          data={favList}
          style={{
            paddingTop: 12,
            paddingLeft: 12,
          }}
          contentContainerStyle={{paddingBottom: 100}}
          onEndReachedThreshold={0}
          onEndReached={onEndListReached}
          refreshControl={
            <RefreshControl
              refreshing={screenRefresh}
              onRefresh={onRefreshScreen}
              tintColor={theme.backgroundColor2}
              // titleColor={theme.backgroundColor2}
              // title="Pull to refresh"
            />
          }
          numColumns={2}
          renderItem={renderFavItem}
          keyExtractor={(item: any, index: number) => index.toString()}
        />
      </SafeAreaView>
      {isLoading ? <LoadingScreen /> : <></>}
    </View>
  );
}

export default connector(FavouriteLyricScreen);
