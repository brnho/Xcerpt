import { View, Animated, Dimensions } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";
import PopupContainer from "./PopupContainer";
import Book from "./Book";

const SHRINK_FACTOR = 0.98;
const BOOK_EXPAND_FACTOR = 1.03;
const WINDOW_HEIGHT = Dimensions.get("window").height;
const WINDOW_WIDTH = Dimensions.get("window").width;
const PADDING_HORIZONTAL = 20;
const MARGIN_BOTTOM = 10;
const POPUP_MENU_HEIGHT = 81;
const BOUNDARY_BOTTOM = 75;

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const PortalBook = ({
    item,
    navigation,
    expandScreenAnimation,
    restoreScreenAnimation,
    setScrollEnabled,
    getBooks
}) => {
    const [showPortal, setShowPortal] = useState(false);
    const [dimensions, setDimensions] = useState({
        x: null,
        y: null,
        width: null,
        height: null,
    });
    const [translateAdjustment, setTranslateAdjustment] = useState(0);
    const [expansionAdjustment, setExpansionAdjustment] = useState({
        x: 0,
        y: 0,
    });

    const getAdjustments = () => {
        const shrinkAdjustment =
            ((1 - SHRINK_FACTOR) / 2) * WINDOW_HEIGHT +
            dimensions.y * (SHRINK_FACTOR - 1);
        const bottomY = dimensions.y + dimensions.height + POPUP_MENU_HEIGHT;
        const boundaryAdjustment =
            -1 * Math.max(0, bottomY - (WINDOW_HEIGHT - BOUNDARY_BOTTOM));
        const eAdjustmentY = (dimensions.height * (BOOK_EXPAND_FACTOR - 1)) / 2;
        const eAdjustmentX =
            (WINDOW_WIDTH -
                (dimensions.width - PADDING_HORIZONTAL * 2) * BOOK_EXPAND_FACTOR) /
            2;
        const eAdjustment = { x: eAdjustmentX, y: eAdjustmentY };
        setTranslateAdjustment(shrinkAdjustment + boundaryAdjustment);
        setExpansionAdjustment(eAdjustment);
    };

    // on long press: setDimensions is called, updating dimensions and triggering this useEffect
    useEffect(() => {
        if (dimensions.x !== null) {
            getAdjustments();
            setShowPortal(true);
            setScrollEnabled(true);
        }
    }, [dimensions]);

    const scaleAnim = useRef(new Animated.Value(1)).current;

    const shrinkBookAnimation = Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 150,
        useNativeDriver: true,
    });
    const restoreBookAnimation = Animated.timing(scaleAnim, {
        toValue: 1.0,
        duration: 150,
        useNativeDriver: true,
    });

    const retrieveDimensions = () => {
        view.current.measure((fx, fy, width, height, px, py) => {
            setDimensions({
                x: px,
                y: py,
                width: width,
                height: height,
            });
        });
    };
    const bounce = () => {
        setScrollEnabled(false);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        shrinkBookAnimation.start(() => {
            restoreBookAnimation.start(() => {
                retrieveDimensions();
            });
        });
    };

    const view = useRef();

    return (
        <>
            <View
                ref={view}
                style={{ marginBottom: MARGIN_BOTTOM, paddingHorizontal: PADDING_HORIZONTAL, opacity: showPortal ? 0 : 1  }}
            >
                <AnimatedTouchable
                    style={{ transform: [{ scale: scaleAnim }] }}
                    activeOpacity={1}
                    delayLongPress={350}
                    onLongPress={showPortal ? null : bounce}
                >
                    <Book item={item} navigation={navigation} />
                </AnimatedTouchable>
            </View>
            {showPortal && (
                <PopupContainer
                    dimensions={dimensions}
                    setDimensions={setDimensions}
                    showPortal={showPortal}
                    setShowPortal={setShowPortal}
                    expandScreenAnimation={expandScreenAnimation}
                    restoreScreenAnimation={restoreScreenAnimation}
                    translateAdjustment={translateAdjustment}
                    expansionAdjustment={expansionAdjustment}
                    bookID={item.id}
                    getBooks={getBooks}
                >
                    <View style={{ paddingHorizontal: PADDING_HORIZONTAL }}>
                        <Book item={item} navigation={navigation} />
                    </View>
                </PopupContainer>
            )}
        </>
    );
};

export default PortalBook;
