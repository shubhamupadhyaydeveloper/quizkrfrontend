import { Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import { BottomTabBarButtonProps, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Colors } from '../../../theme/colors';
import { moderateScale } from '../../../utils/responsive';
import { HomeIcon, CreateIcon, BookmarkIcon, UserIcon } from '../../../components/icons';

const ROUTE_ICONS: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
    Home: HomeIcon,
    Create: CreateIcon,
    Saved: BookmarkIcon,
    Profile: UserIcon,
}

const NESTED_ROOTS: Record<string, string | undefined> = {
    Create: 'CreateHome',
    Profile: 'ProfileHome',
}

const CustomTabBar = ({ state, navigation, descriptors }: BottomTabBarProps) => {
    const insets = useSafeAreaInsets();

    // Screens deeper than a tab's first screen are full-screen tasks with their
    // own footer buttons — the floating bar would sit on top of them.
    const focused = state.routes[state.index];
    const nestedRoute = getFocusedRouteNameFromRoute(focused);
    const tabRoot = NESTED_ROOTS[focused.name];
    if (tabRoot && nestedRoute && nestedRoute !== tabRoot) return null;

    function CustomTabBarButton({ children, onPress, onLayout }: BottomTabBarButtonProps) {
        return (
            <Pressable
                onLayout={onLayout}
                onPress={onPress}
                style={({ pressed }) => [
                    styles.button,
                    { transform: [{ scale: pressed ? 0.94 : 1 }] },
                ]}
            >
                {children}
            </Pressable>
        );
    }

    return (
        <View style={[styles.wrapper, { bottom: Math.max(insets.bottom, 16) + moderateScale(8) }]}>
            {state.routes.map((route, index) => {
                const isFocused = state.index === index;
                const Icon = ROUTE_ICONS[route.name];

                // Tapping a tab always lands on that tab's first screen, so
                // Create starts a fresh quiz instead of reopening old results.
                const rootScreen = NESTED_ROOTS[route.name];

                const onPress = () => {
                    if (rootScreen) {
                        navigation.navigate({
                            name: route.name,
                            params: { screen: rootScreen },
                        } as never);
                        return;
                    }
                    if (!isFocused) {
                        navigation.navigate(route.name);
                    }
                };

                return (
                    <CustomTabBarButton key={route.key} onPress={onPress}>
                        <View style={[styles.iconSlot, isFocused && styles.iconSlotActive]}>
                            {Icon ? (
                                <Icon size={22} color={isFocused ? Colors.surface : Colors.muted} />
                            ) : null}
                        </View>
                    </CustomTabBarButton>
                )
            })}
        </View>
    )
}

export default CustomTabBar;

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        left: 20,
        right: 20,
        height: 70,
        borderRadius: 999,
        backgroundColor: Colors.surface,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 14,
        shadowColor: Colors.ink,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.08,
        shadowRadius: 30,
        elevation: 8,
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconSlot: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconSlotActive: {
        backgroundColor: Colors.ink,
    },
})
