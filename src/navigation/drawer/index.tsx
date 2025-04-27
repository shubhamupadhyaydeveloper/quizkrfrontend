import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer'
import RootStackNavigation from '../root-stack'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'

const DrawerNavigation = () => {
    const Drawer = createDrawerNavigator()
    const myTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: 'black',

        },
    };

    const DrawerContent = (props: DrawerContentComponentProps) => {
        return (
            <DrawerContentScrollView {...props}>
                <View >
                    <Text style={{
                        color: 'black',
                        fontSize: 15,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginTop: 20
                    }}>hi this is drawer</Text>
                </View>
            </DrawerContentScrollView>
        )
    }


    return (
        <NavigationContainer theme={myTheme}>
            <Drawer.Navigator
                drawerContent={props => <DrawerContent {...props} />}
                screenOptions={{
                    headerShown: false,
                    drawerType: 'slide'
                }}>
                <Drawer.Screen name="Root" component={RootStackNavigation} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default DrawerNavigation;

const styles = StyleSheet.create({})