import { StyleSheet } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GoogleGiminiScreen from '../generateHome';
import QuizPageScreen from '../quizPage';
import {
  getFocusedRouteNameFromRoute,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { BottomTabNavigationType, GenerateNavigationType } from '../../navigation/types';


const GenerateScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<BottomTabNavigationType, 'Generate'>>();

  const tabHiddenRoutes = ['QuizPage'];

  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'QuizPage'

    if (tabHiddenRoutes.includes(routeName)) {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    }  
  }, [navigation, route]);

  const Stack = createNativeStackNavigator<GenerateNavigationType>();

  return (
    <Stack.Navigator
      initialRouteName="GenerateHome"
      screenOptions={{ headerShown: false, animation: 'ios_from_right' }}
    >
      <Stack.Screen name="GenerateHome" component={GoogleGiminiScreen} />
      <Stack.Screen name="QuizPage" component={QuizPageScreen} />
    </Stack.Navigator>
  );
};

export default GenerateScreen;

const styles = StyleSheet.create({});