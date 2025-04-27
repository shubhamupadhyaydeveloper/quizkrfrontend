import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'

const GoBack = () => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity activeOpacity={.8} onPress={() => navigation.goBack()}>
            <View style={styles.container}>
                <AntDesignIcon name='arrowleft' size={20} color={'black'} />
            </View>
        </TouchableOpacity>
    )
}

export default GoBack;

const styles = StyleSheet.create({
    container: {
        padding: 5,
        borderRadius: 25,
        backgroundColor: '#E2E3E5',
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    }
})