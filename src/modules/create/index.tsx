import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { CreateStackNavigationType } from '../../utils/types'
import CreateHomeScreen from './CreateHome'
import CreatePasteTextScreen from './CreatePasteText'
import CreateScanScreen from './CreateScan'
import QuizSetupScreen from './QuizSetup'
import GeneratingScreen from './Generating'
import QuizPageScreen from '../quizPage'
import QuizResultsScreen from './QuizResults'
import FlaggedQuestionsScreen from './FlaggedQuestions'

const CreateNavigation = () => {
  const CreateStack = createNativeStackNavigator<CreateStackNavigationType>()

  return (
    <CreateStack.Navigator screenOptions={{ headerShown: false }} initialRouteName='CreateHome'>
      <CreateStack.Screen name='CreateHome' component={CreateHomeScreen} />
      <CreateStack.Screen name='CreatePasteText' component={CreatePasteTextScreen} />
      <CreateStack.Screen name='CreateScan' component={CreateScanScreen} />
      <CreateStack.Screen name='QuizSetup' component={QuizSetupScreen} />
      <CreateStack.Screen name='Generating' component={GeneratingScreen} />
      <CreateStack.Screen name='QuizTaking' component={QuizPageScreen} />
      <CreateStack.Screen name='QuizResults' component={QuizResultsScreen} />
      <CreateStack.Screen name='FlaggedQuestions' component={FlaggedQuestionsScreen} />
    </CreateStack.Navigator>
  )
}

export default CreateNavigation;
