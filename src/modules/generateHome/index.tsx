import { Alert, Button, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import HorizontalSlider from '../../components/HorizontalSlider';
import QuizWithText from '../quizWithText';
import QuizWithImage from '../quizWithImage';
import QuizWithPdf from '../quizWithPdf';
import GoBack from '../../components/GoBack';
import Filters from '../../components/Filters';

export type FilterValuesTypes = {
    noOfQuestions: string;
    difficulty: string;
    type: "Text" | "Image" | "Pdf";
}

const GoogleGiminiScreen = () => {
    const [values, setValues] = useState<FilterValuesTypes>({
        difficulty: 'Hard 🔥',
        noOfQuestions: 'Only 5',
        type: 'Text'
    })
    const insets = useSafeAreaInsets()

    const RenderActiveComponent = () => {
        switch (values.type) {
            case 'Text':
                return <QuizWithText />
            case 'Image':
                return <QuizWithImage />
            case 'Pdf':
                return <QuizWithPdf />
        }
    }

    const handleValuesChange = (item: FilterValuesTypes) => {

    }

    return (
        <SafeAreaView style={{ paddingHorizontal: 10, gap: 10, flex: 1, paddingTop: 20 }}>

            <Filters defaultValues={values} onValueChange={setValues} />
            <RenderActiveComponent />

        </SafeAreaView>
    )
}

export default GoogleGiminiScreen;

const styles = StyleSheet.create({})