import { StyleSheet, Animated, Pressable } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { BlurView } from "expo-blur";
import { Portal } from "@gorhom/portal";
import PopupMenu from "./PopupMenu";

const BOOK_EXPAND_FACTOR = 1.03;
const FADE_SPEED = 200;
const APPEAR_SPEED = 200;

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const PopupContainer = ({
    dimensions,
    setShowPortal,
    expandScreenAnimation,
    restoreScreenAnimation,
    translateAdjustment,
    expansionAdjustment,
    bookID,
    children,
    getBooks
}) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const blurAnim = useRef(new Animated.Value(0)).current;
    const translateAnim = useRef(new Animated.Value(0)).current;

    const restoreBookAnimation2 = Animated.timing(scaleAnim, {
        toValue: 1.0,
        duration: FADE_SPEED,
        useNativeDriver: true,
    });
    const expandBookAnimation = Animated.timing(scaleAnim, {
        toValue: BOOK_EXPAND_FACTOR,
        duration: APPEAR_SPEED,
        useNativeDriver: true,
    });
    const blurAnimation = Animated.timing(blurAnim, {
        toValue: 30,
        duration: APPEAR_SPEED,
        useNativeDriver: false,
    });
    const undoBlurAnimation = Animated.timing(blurAnim, {
        toValue: 0,
        duration: FADE_SPEED,
        useNativeDriver: false,
    });
    const translateAnimation = Animated.timing(translateAnim, {
        toValue: translateAdjustment,
        duration: APPEAR_SPEED,
        useNativeDriver: true,
    });
    const undoTranslateAnimation = Animated.timing(translateAnim, {
        toValue: 0,
        duration: FADE_SPEED,
        useNativeDriver: true,
    });

    const displayMenu = () => {
        Animated.parallel([
            blurAnimation,
            expandBookAnimation,
            translateAnimation,
            expandScreenAnimation,
        ]).start();
    };

    const closeMenu = () => {
        Animated.parallel([
            childAnimation.shrinkAnimation,
            childAnimation.fadeAnimation,
            undoBlurAnimation,
            restoreBookAnimation2,
            undoTranslateAnimation,
            restoreScreenAnimation,
        ]).start(() => {
            setShowPortal(false);
            getBooks();
        });
    };

    const [childAnimation, setChildAnimation] = useState({});

    useEffect(() => {
        displayMenu();
    }, []);

    const portalPosition = {
        position: "absolute",
        left: dimensions.x,
        top: dimensions.y,
        width: dimensions.width,
        height: dimensions.height,
        transform: [{ scale: scaleAnim }, { translateY: translateAnim }],
    };

    return (
        <Portal>
            <Pressable style={{ ...StyleSheet.absoluteFill }} onPress={closeMenu}>
                <AnimatedBlurView
                    intensity={blurAnim}
                    style={{ flex: 1 }}
                    tint="dark"
                />
            </Pressable>
            <Animated.View style={portalPosition}>{children}</Animated.View>
            <PopupMenu
                dimensions={dimensions}
                setChildAnimation={setChildAnimation}
                translateAdjustment={translateAdjustment}
                expansionAdjustment={expansionAdjustment}
                bookID={bookID}
                closeMenu={closeMenu}
            />
        </Portal>
    );
};

export default PopupContainer;
