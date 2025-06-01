import { NavigatorScreenParams } from "@react-navigation/native"

export type GenerateNavigationType = {
  GenerateHome: undefined;
  QuizPage: {data :any};
};

export type BottomTabNavigationType = {
  Home: undefined,
  Generate: NavigatorScreenParams<GenerateNavigationType>,
  Saved: undefined,
  Premium: undefined,
  Profile: undefined
}

export type RootStackNavigationType = {
  App: NavigatorScreenParams<BottomTabNavigationType>,
  Auth: NavigatorScreenParams<AuthStackNavigationType>,
  Splash: undefined
}

export type AuthStackNavigationType = {
  Login: undefined,
  Register: undefined,
}