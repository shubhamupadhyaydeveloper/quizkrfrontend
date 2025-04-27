import { NavigatorScreenParams } from "@react-navigation/native"

export type GenerateNavigationType = {
  GenerateHome: undefined;
  QuizPage: {data :any};
};

export type BottomTabNavigationType = {
  Home: undefined,
  Generate: NavigatorScreenParams<GenerateNavigationType>,
  Saved: undefined,
  About: undefined
}

export type RootStackNavigationType = {
  App: NavigatorScreenParams<BottomTabNavigationType>,
  Auth: undefined,
  Splash: undefined
}