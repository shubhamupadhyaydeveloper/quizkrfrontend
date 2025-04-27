import React, { useEffect, useState } from "react";
import FastImage from "react-native-fast-image";

interface AnimatedTabIconProps {
    focused: boolean;
    gif: any; // GIF file
    staticImage: any; // Static PNG file
    duration?: number; // Optional: GIF duration in ms (default: 2000ms)
}

const AnimatedIcon: React.FC<AnimatedTabIconProps> = ({ focused, gif, staticImage, duration = 2000 }) => {
    const [imageSource, setImageSource] = useState(staticImage);

    useEffect(() => {
        if (focused) {
            setImageSource(gif);

            // After GIF duration, switch back to static image
            const timeout = setTimeout(() => {
                setImageSource(staticImage);
            }, duration);

            return () => clearTimeout(timeout); // Cleanup
        }
    }, [focused]);

    return (
        <FastImage
            source={imageSource}
            style={{ width: 30, height: 30 }}
            resizeMode={FastImage.resizeMode.contain}
        />
    );
};

export default AnimatedIcon;
