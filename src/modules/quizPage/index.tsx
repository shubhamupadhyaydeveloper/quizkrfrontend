import { RouteProp, useRoute } from "@react-navigation/native";
import { GenerateNavigationType } from "../../utils/types";
import { useEffect, useState } from "react";
import { jsonrepair } from "jsonrepair";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import GoBack from "../../components/GoBack";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, LinearTransition } from "react-native-reanimated";
import { horizontalScale } from "../../utils/responsive";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const optionHeadingColor = '#787D86'
const optionHeadingbg = '#F2F3F5'
const optionTitleColor = '#28323E'

type DataType = {
    answer: string,
    options: string[],
    question: string
}

const QuizPageScreen = () => {
    const route = useRoute<RouteProp<GenerateNavigationType, 'QuizPage'>>();
    const { data } = route.params;
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
    const [quiz, setQuiz] = useState<DataType[]>([]);
    const insets = useSafeAreaInsets()

    const QuizProgressBar = ({ currentQuizIndex, totalQuiz }: { currentQuizIndex: number, totalQuiz: number }) => {
        return (
            <Animated.View layout={LinearTransition.springify().damping(80).stiffness(200)} style={styles.progressBarContainer}>
                <Animated.View layout={LinearTransition.springify().damping(80).stiffness(200)} style={[styles.progressBar, { width: `${100 * (currentQuizIndex / totalQuiz)}%` }]} />
            </Animated.View>
        );
    };

    useEffect(() => {
        try {
            if (Array.isArray(data)) {
                setQuiz(data);
            } else {
                console.error("Data is not an array:", data);
            }
        } catch (error) {
            console.error("Error parsing quiz data:", error);
        }
    }, [data]);

    console.log('type of quiz', typeof quiz)

    const handleNext = () => {
        if (currentQuizIndex < quiz.length - 1) {
            setCurrentQuizIndex(prev => prev + 1);
        }
    };

    const handleBack = () => {
        if (currentQuizIndex > 0) {
            setCurrentQuizIndex(prev => prev - 1);
        }
    };

    const RenderOptionContainer = () => {
        const [activeIndex, setActiveIndex] = useState<number | null>(null)
        return (
            <View style={{ marginTop: 20, gap: 20,flex : 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <GoBack />
                    <View style={{ flex: 1 }}>
                        <QuizProgressBar currentQuizIndex={currentQuizIndex} totalQuiz={quiz.length} />
                    </View>
                    <Text style={{ color: 'white', fontFamily: 'Nunito-Bold', fontSize: 16 }}>{currentQuizIndex + 1}/{quiz.length}</Text>
                </View>
                <Text style={styles.headingText}>{quiz[currentQuizIndex]?.question}</Text>
                <View style={{ gap: 25 }}>
                    {quiz[currentQuizIndex].options.map((item: string, index: number) => (
                        <TouchableOpacity key={`${item}-${index}`} activeOpacity={.7} onPress={() => setActiveIndex(index)}>
                            <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center', borderWidth: 1, borderColor: "#d2d2d2", padding: 10, borderRadius: 20, backgroundColor: activeIndex === index ? '#8EA3A6' : 'transparent' }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center', padding: 5, borderRadius: 15, width: 40, height: 40, backgroundColor: optionHeadingbg }}>
                                    <Text style={{ color: optionHeadingColor, fontFamily: 'Nunito-Bold', fontSize: 16 }}>{index + 1}</Text>
                                </View>
                                <View style={{ width: horizontalScale(250) }}>
                                    <Text style={{ color: activeIndex === index ? 'black' : 'white', fontFamily: 'Nunito-Bold', fontSize: 16, }}>{item}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        )
    }

    return (
        <View style={{ paddingHorizontal: 20, flex: 1 , paddingTop: insets.top + 20, gap: 20 }}>

            {quiz.length > 0 ? (
                <RenderOptionContainer />
            ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Loading quiz...</Text>
                </View>
            )}

            <View style={{ flex: 1, justifyContent: 'flex-end', paddingVertical: 20 }}>
                <TouchableOpacity activeOpacity={.8} onPress={() => setCurrentQuizIndex(prev => prev + 1)} style={{ padding: 15, backgroundColor: '#16C47F', borderRadius: 15, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: 'white', textAlign: 'center', fontSize: 12, fontFamily: 'Bungee-Regular', lineHeight: 15 }}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headingText: {
        fontFamily: 'Nunito-Bold',
        fontSize: 22,
        color: 'white'
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    progressBarContainer: {
        width: "100%",
        height: 10,
        backgroundColor: "#ddd",
        borderRadius: 5,
        overflow: "hidden",
    },
    progressBar: {
        height: "100%",
        backgroundColor: "#8EA3A6",
        borderRadius: 5,
    },
    counter: {
        fontSize: 16,
        marginBottom: 10,
    },
    button: {
        backgroundColor: "black",
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 5,
        borderRadius: 5,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
    },
})

export default QuizPageScreen;