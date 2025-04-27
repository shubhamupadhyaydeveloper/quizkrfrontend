import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View, } from 'react-native'
import React, { useState } from 'react'
import { horizontalScale, verticalScale } from '../utils/responsive'
import HorizontalSlider from './HorizontalSlider'
import Modal from 'react-native-modal'
import { FilterValuesTypes } from '../modules/generateHome'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

type FiltersProps = {
    onValueChange: React.Dispatch<React.SetStateAction<FilterValuesTypes>>
}

const mockData = ['Filters ✻', 'Quiz', 'Text', "hard 🔥", 'Question No']
const Filters = ({ onValueChange }: FiltersProps) => {
    const [activeModal, setActiveModal] = useState(false)
    const [currentIndex, setCurrentIndex] = useState<any>(0)
    const [customData, setCustomData] = useState<any>([...mockData])


    return (
        <View>
            <FlatList
                data={customData}
                renderItem={({ item }) => (
                    <TouchableOpacity activeOpacity={.8} onPress={() => setActiveModal(prev => !prev)}>
                        <View style={{ padding: 4, paddingHorizontal: 8, backgroundColor: '#E2E3E5', borderRadius: 25 }}>
                            <Text style={{ fontFamily: 'Nunito-Medium', color: '#5D666F' }}>{item}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                horizontal
                ItemSeparatorComponent={() => <View style={{ width: horizontalScale(10) }} />}
                showsHorizontalScrollIndicator={false}
            />

            <Modal
                isVisible={activeModal}
                backdropOpacity={.5}
                animationIn={'slideInUp'}
                animationOut={'slideOutDown'}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View>
                        <TouchableOpacity activeOpacity={.8} onPress={() => setActiveModal(prev => !prev)}>
                            <View style={{ flexDirection: "row", justifyContent: 'flex-end' }}>
                                <View style={{ paddingVertical: 6, paddingHorizontal: 12, backgroundColor: 'white', borderRadius: 25, width: horizontalScale(100), marginBottom: 10 }}>
                                    <Text style={{ textAlign: 'center' }}>Close</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={{ height: screenHeight * .8, width: screenWidth * .9, backgroundColor: 'white', borderRadius: 12, padding: 15 }}>
                            <Text>hello ji</Text>
                        </View>
                        <TouchableOpacity onPress={() => {

                        }} activeOpacity={.8} style={{ padding: 10, backgroundColor: '#0D9276', borderRadius: 12 , marginTop: 10 }}>
                            <Text style={{ color: 'white', fontFamily: 'Bungee-Regular', fontSize: 12, lineHeight: 14, textAlign: 'center' }}>Save Changes</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </Modal>
        </View>
    )
}

export default Filters;

const styles = StyleSheet.create({})