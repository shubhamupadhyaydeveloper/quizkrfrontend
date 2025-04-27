import {
  Alert,
  Button,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { verticalScale } from '../../utils/responsive';
import { screenHeight } from '../../utils/Constants';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { GenerateNavigationType } from '../../navigation/types';
import LottieView from 'lottie-react-native';
import { mmkvStorage } from '../../utils/mmkvstore';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Modal from 'react-native-modal'
import { jsonrepair } from "jsonrepair";
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const apiKey = 'AIzaSyBtMByO1hrHxfA6KIZF-RTMkquFCqZhqqA';
const gemini = new GoogleGenerativeAI(apiKey)

async function getGeminiResponse(prompt: string) {
  try {
    const model = gemini.getGenerativeModel({ model: 'gemini-1.5-flash' })
    const result = await model.generateContent(prompt)
    const response = result.response.text()
    return response
  } catch (error: any) {
    console.error('Gemini Api error', error)
    return 'Error fetching response'
  }
}

const QuizWithText = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const navigation = useNavigation<NavigationProp<GenerateNavigationType>>()
  const [isLoading, setIsLoading] = useState(false)
  const insets = useSafeAreaInsets();


  useEffect(() => {
    const getInput = mmkvStorage.getItem('textinput');
    if (getInput) {
      setInput(getInput);
    }

  }, []);

  const handleTextInput = (e: string) => {
    setInput(e);
    mmkvStorage.setItem('textinput', e);
  };

  const handleRemove = () => {
    setInput('')
    mmkvStorage.removeItem('textinput')
  }

  const handleSubmit = async () => {
    try {
      if (input.length > 100) {
        setIsLoading(true);
        const result = await getGeminiResponse(
          input +
          ' Generate a quiz based on the above text. The response should ONLY be a JSON array containing objects with the fields: "question" (string), "options" (array of 4 strings), and "answer" (string). Do NOT include any extra text, explanation, or code block syntax like ```.'
        );

        try {
          const parsedResult = jsonrepair(result);
          const actualData = JSON.parse(parsedResult)

          if (Array.isArray(actualData) && actualData.length > 0) {
            navigation.navigate('QuizPage', { data: actualData });
          } else {
            Alert.alert("Invalid Content", "Unable to generate meaningful quiz questions. Try providing a clearer context.");
          }
        } catch (error) {
          Alert.alert("Invalid Response", "The AI could not generate valid quiz questions. Try again with a better input.");
        }
      } else {
        Alert.alert("Context too short", "Unable to generate questions, please provide a longer context.");
      }
    } catch (error) {
      console.error('Error in handleSubmit', error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <View style={{ flex: 1 }}>

      <TextInput
        value={input}
        onChangeText={e => handleTextInput(e)}
        multiline
        numberOfLines={50}
        style={{
          color: 'white',
          minHeight: verticalScale(screenHeight * .72),
          maxHeight: verticalScale(screenHeight * .72),
          textAlignVertical: 'top',
          padding: 10,
        }}
        placeholder='Write any Context here to generate Questions'
        placeholderTextColor={'white'}
      />
     <View>
       <Text style={{fontSize : 14,color : "white"}}>button</Text>
     </View>

      <Modal
        isVisible={isLoading}
        backdropOpacity={.4}
      >
        <View style={styles.modalContainer}>
          <View style={{ position: 'relative' }}>
            <LottieView speed={1.7} source={require('../../assets/gif/loader.json')} autoPlay loop style={{ width: 300, height: 300 }} />
          </View>
        </View>
      </Modal>
    </View>

  )
}

export default QuizWithText;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  buttonContainerKeyboardVisible: {
    // bottom: 10, // Move up when keyboard is open
  },
  quizButton: {
    paddingVertical: 10,
    backgroundColor: '#0D9276',
    borderRadius: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    gap: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
