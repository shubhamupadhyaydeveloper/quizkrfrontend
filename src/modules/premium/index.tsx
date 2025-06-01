import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
import { horizontalScale } from '../../utils/responsive';
import GoBack from '../../components/GoBack';
import { Colors } from '../../utils/constants';
import AntDesignIcon from 'react-native-vector-icons/AntDesign'

type MockDataType = {
    title: string;
    price: string;
    description: string;
    features: string[];
}

const mockData: MockDataType[] = [
    {
        title: "Free Plan",
        price: "₹ 0",
        description: "Get started with the basics of learning. Perfect for beginners.",
        features: [
            "Access to basic quizzes",
            "Limited question bank",
            "Limited to pdf uploads per day",
            "Community support"
        ]
    },
    {
        title: "Pro Plan",
        price: "₹ 199",
        description: "Unlock advanced features and a larger question bank.",
        features: [
            "Access to all quizzes",
            "Unlimited question bank",
            "Unlimited pdf uploads per day",
            "Priority support"
        ]
    }
]

const PremiumScreen = () => {
    const insets = useSafeAreaInsets();

    const RenderItem = ({ item, index }: { item: MockDataType, index: number }) => {
        const isFirst = index === 0;
        return (
            <View style={{ padding: 20, backgroundColor: index === 1 ? Colors.primary : '#f8f8f8', borderRadius: 10, width: horizontalScale(300) }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', fontFamily: 'Bungee-Regular' }}>{item.title}</Text>
                <Text style={{ fontSize: 18, color: '#333', marginVertical: 5 }}>{item.price}</Text>
                <Text style={{ color: isFirst ? '#666' : 'black', marginBottom: 10, fontFamily: 'Nunito-Bold', fontSize: 18 }}>{item.description}</Text>
                <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Features:</Text>
                {item.features.map((feature, index) => (
                    <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                        <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: isFirst ? Colors.primary : 'black', justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                            <AntDesignIcon name="check" size={12} color={isFirst ? '#E0F7FF' : 'white'} />
                        </View>
                        <Text key={index} style={{ color: '#555', fontSize: 14, fontFamily: 'Nunito-Bold' }}>{feature}</Text>
                    </View>
                ))}

                <View style={{ flex: 1, justifyContent: 'flex-end', }}>
                    <TouchableOpacity disabled={!isFirst} activeOpacity={.8} onPress={() => { }} style={{ marginTop: 20 }}>
                        <View style={{ padding: 15, borderRadius: 12, backgroundColor: isFirst ? Colors.primary : 'black', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 16, color: isFirst ? 'black' : 'white', fontFamily: 'Nunito-Bold' }}>{isFirst ? 'Continue With Free' : 'Coming Soon'}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <View style={{ paddingTop: insets.top, flex: 1, backgroundColor: '#121212', paddingHorizontal: 20, paddingBottom: insets.bottom + 20, gap: 20 }}>

            <View>
                <Text style={{ color: Colors.primary, fontFamily: 'Bungee-Regular', fontSize: 24, }}>Premium Plans</Text>
                <Text style={{ color: 'white', fontFamily: 'Nunito-Bold', fontSize: 16 }}>Unlock The full Power of Learning With Quizkr Premium Plans</Text>
                <Text style={{ color: 'white', fontFamily: 'Nunito-Bold', fontSize: 16 }}>Choose the perfect plan for your journey</Text>
            </View>

            <FlatList
                data={mockData}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                renderItem={({ item, index }) => (
                    <RenderItem item={item} index={index} />
                )}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ width: horizontalScale(10) }} />}
            />

        </View>
    )
}

export default PremiumScreen;

const styles = StyleSheet.create({})