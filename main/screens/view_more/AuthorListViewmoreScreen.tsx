import React, {useState, useEffect, useCallback, useContext} from 'react';
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {RootStackScreenProps} from '../../route/StackParamsTypes';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BackButton} from '../../components/BackButton';
import {
  API_KEY_PRODUCION,
  API_URL,
  BOOKS_AUTHOR_TITLE,
  ROW_COUNT,
  SINGER_TITLE,
  generateRandomNumber,
} from '../../config/Constant';
import {ApiFetchService} from '../../service/ApiFetchService';
import {ThemeContext} from '../../utility/ThemeProvider';
import {TextView} from '../../components/TextView';
import i18n from '../../language/i18n';
import {LoadingScreen} from '../../components/LoadingScreen';
import {GeneralColor} from '../../utility/Themes';
import * as Animatable from 'react-native-animatable';

export function AuthorListViewmoreScreen(
  props: RootStackScreenProps<'AuthorListViewmoreScreen'>,
) {
  const context = useContext(ThemeContext);
  const {theme} = context;
  const [viewMoreAuthorData, setViewmoreAuthorData] = useState([]);
  const [screenRefresh, setScreenRefresh] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pageAt, setPageAt] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [randomValue, setRandomValue] = useState<number>(0);
  const animationForScreen = 'fadeInUp';
  const [label, setLabel] = React.useState({
    authors: i18n.t('authors'),
    singers: i18n.t('singers'),
  });

  useEffect(() => {
    const unsubscribe = i18n.onChange(() => {
      setLabel({
        authors: i18n.t('authors'),
        singers: i18n.t('singers'),
      });
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (randomValue != 0) {
      fetchViewmoreSingerList(0);
    }
  }, [randomValue]);

  useEffect(() => {
    if (screenRefresh) {
      setPageAt(0);
      setRandomValue(generateRandomNumber());
    }
  }, [screenRefresh]);

  useEffect(() => {
    if (props.route?.params?.authorType != null) {
      setRandomValue(generateRandomNumber());
    }
  }, [props.route.params.authorType]);

  const goBack = useCallback(() => {
    props.navigation.goBack();
  }, []);

  const fetchViewmoreSingerList = useCallback(
    async (pageAt: number) => {
      let formData = new FormData();
      if (props.route.params.authorType == 1) {
        formData.append('name', 'authorBook');
      } else if (props.route.params.authorType == 2) {
        formData.append('name', 'author');
      }
      formData.append('page', pageAt);
      formData.append('size', 18);
      formData.append('randomValues', randomValue);
      await ApiFetchService(API_URL + `user/lyric/home-navigate`, formData, {
        'Content-Type': 'multipart/form-data',
        Authorization: API_KEY_PRODUCION,
      }).then((response: any) => {
        setTimeout(() => {
          setIsLoading(false);
          setScreenRefresh(false);
        }, 1000);

        if (response.code == 200) {
          setViewmoreAuthorData(prev =>
            pageAt === 0
              ? response.data.content
              : [...prev, ...response.data.content],
          );
          setTotalPage(response.data.totalPages);
        }
      });
    },
    [randomValue],
  );

  const clickedSinger = useCallback((item: any) => {
    props.navigation.navigate('AuthorScreen', {
      authorId: item.item.id,
      authorName: item.item.name,
      authorType: item.item.authorType,
      authorImage: item.item.profile,
    });
  }, []);

  const onRefreshScreen = useCallback(() => {
    setScreenRefresh(true);
  }, []);

  const onEndListReached = () => {
    if (totalPage != pageAt) {
      const currentPage = pageAt + 1;
      setPageAt(currentPage);
      setIsLoading(true);
      fetchViewmoreSingerList(currentPage);
    }
  };

  const renderAuthorItem = useCallback(
    (item: any) => {
      return (
        <Animatable.View
          style={{
            flexDirection: 'column',
            flex: 0.3333,
            marginTop: 22,
          }}
          useNativeDriver={true}
          animation={animationForScreen}>
          <TouchableOpacity
            style={{alignItems: 'center'}}
            onPress={() => clickedSinger(item)}>
            <Image
              source={{uri: API_URL + item.item.profile}}
              style={{
                width: 80,
                height: 80,
                borderRadius: 50,
                backgroundColor: GeneralColor.light_grey,
              }}
            />
            <TextView
              text={item.item?.name}
              numberOfLines={1}
              textStyle={{
                alignSelf: 'center',
                marginTop: 8,
                fontSize: 16,
                fontWeight: 'bold',
              }}
            />
          </TouchableOpacity>
        </Animatable.View>
      );
    },
    [viewMoreAuthorData],
  );

  return (
    <View>
      <SafeAreaView
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: theme.backgroundColor,
        }}
        edges={['top']}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 16,
            marginTop: 10,
          }}>
          <BackButton
            clickedGoBack={() => {
              goBack();
            }}
          />
          <Animatable.View
            useNativeDriver={true}
            animation={animationForScreen}>
            <TextView
              text={
                props.route.params.authorType == 1
                  ? label.authors
                  : label.singers
              }
              textStyle={{fontSize: 20, fontWeight: 'bold', marginLeft: 16}}
            />
          </Animatable.View>
        </View>
        <FlatList
          data={viewMoreAuthorData}
          numColumns={3}
          renderItem={renderAuthorItem}
          style={{paddingHorizontal: 6, marginTop: 12}}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 100}}
          refreshControl={
            <RefreshControl
              refreshing={screenRefresh}
              onRefresh={onRefreshScreen}
              tintColor={theme.backgroundColor2}
              // titleColor={theme.backgroundColor2}
              // title="Pull to refresh"
            />
          }
          onEndReachedThreshold={0}
          onEndReached={onEndListReached}
          keyExtractor={(item: any, index: number) => index.toString()}
        />
      </SafeAreaView>
      {isLoading ? <LoadingScreen /> : <></>}
    </View>
  );
}
