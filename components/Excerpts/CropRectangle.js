import React, { useRef } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Animated,
  PanResponder,
  View,
  Dimensions
} from "react-native";
import { AntDesign } from '@expo/vector-icons'; 

const WINDOW_HEIGHT = Dimensions.get('window').height;
const WINDOW_WIDTH = Dimensions.get('window').width;

const BOX_WIDTH = 300;
const BOX_HEIGHT = 200;
const BOX_LEFT = (WINDOW_WIDTH - BOX_WIDTH) / 2;
const BOX_BOTTOM = (WINDOW_HEIGHT - BOX_HEIGHT) / 2;
const CORNER_HITBOX = 50;
const MIN_BOX_WIDTH = 30;
const MIN_BOX_HEIGHT = 30;
const BORDER_RADIUS = 2;

export default function CropRectangle({ isCameraReady, takePicture, setShowInfoBox }) {
  // animatable styles for the main box and its four courner boxes
  const boxAnim = useRef({
    left: new Animated.Value(BOX_LEFT),
    bottom: new Animated.Value(BOX_BOTTOM),
    width: new Animated.Value(BOX_WIDTH),
    height: new Animated.Value(BOX_HEIGHT),
  }).current;
  const frozenBoxAnim = useRef({
    left: new Animated.Value(BOX_LEFT),
    bottom: new Animated.Value(BOX_BOTTOM),
    width: new Animated.Value(BOX_WIDTH),
    height: new Animated.Value(BOX_HEIGHT),
  }).current;

  const topRightAnim = useRef({
    left: new Animated.Value(BOX_LEFT + BOX_WIDTH - CORNER_HITBOX / 2 - BORDER_RADIUS / 2),
    bottom: new Animated.Value(BOX_BOTTOM + BOX_HEIGHT - CORNER_HITBOX / 2 - BORDER_RADIUS / 2),
  }).current;
  const frozenTopRightAnim = useRef({
    left: new Animated.Value(BOX_LEFT + BOX_WIDTH - CORNER_HITBOX / 2 - BORDER_RADIUS / 2),
    bottom: new Animated.Value(BOX_BOTTOM + BOX_HEIGHT - CORNER_HITBOX / 2 - BORDER_RADIUS / 2),
  }).current;

  const topLeftAnim = useRef({
    left: new Animated.Value(BOX_LEFT - CORNER_HITBOX / 2 + BORDER_RADIUS / 2),
    bottom: new Animated.Value(BOX_BOTTOM + BOX_HEIGHT - CORNER_HITBOX / 2 - BORDER_RADIUS / 2),
  }).current;
  const frozenTopLeftAnim = useRef({
    left: new Animated.Value(BOX_LEFT - CORNER_HITBOX / 2 + BORDER_RADIUS / 2),
    bottom: new Animated.Value(BOX_BOTTOM + BOX_HEIGHT - CORNER_HITBOX / 2 - BORDER_RADIUS / 2),
  }).current;

  const bottomLeftAnim = useRef({
    left: new Animated.Value(BOX_LEFT - CORNER_HITBOX / 2  + BORDER_RADIUS / 2),
    bottom: new Animated.Value(BOX_BOTTOM - CORNER_HITBOX / 2  + BORDER_RADIUS / 2),
  }).current;
  const frozenBottomLeftAnim = useRef({
    left: new Animated.Value(BOX_LEFT - CORNER_HITBOX / 2  + BORDER_RADIUS / 2),
    bottom: new Animated.Value(BOX_BOTTOM - CORNER_HITBOX / 2  + BORDER_RADIUS / 2),
  }).current;

  const bottomRightAnim = useRef({
    left: new Animated.Value(BOX_LEFT + BOX_WIDTH - CORNER_HITBOX / 2  - BORDER_RADIUS / 2),
    bottom: new Animated.Value(BOX_BOTTOM - CORNER_HITBOX / 2  + BORDER_RADIUS / 2),
  }).current;
  const frozenBottomRightAnim = useRef({
    left: new Animated.Value(BOX_LEFT + BOX_WIDTH - CORNER_HITBOX / 2  - BORDER_RADIUS / 2),
    bottom: new Animated.Value(BOX_BOTTOM - CORNER_HITBOX / 2  + BORDER_RADIUS / 2),
  }).current;

  // pan responder for the top right corner box
  const topRightPanResponder = useRef(
    PanResponder.create({
      // necessary to include this for PanResponder to work within Modal
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      // use frozen animations here to remember original box positions
      onPanResponderMove: (_, gestureState) => {
        setShowInfoBox(false);
        // minimum dx before hitting MIN_BOX_WIDTH
        const threshX = MIN_BOX_WIDTH - frozenBoxAnim.width._value;
        if (gestureState.dx > threshX) {
          boxAnim.width.setValue(frozenBoxAnim.width._value + gestureState.dx);
          topRightAnim.left.setValue(
            frozenTopRightAnim.left._value + gestureState.dx
          );
          bottomRightAnim.left.setValue(
            frozenBottomRightAnim.left._value + gestureState.dx
          );
        }
        // maximum dy before hitting MIN_BOX_HEIGHT
        const threshY = frozenBoxAnim.height._value - MIN_BOX_HEIGHT;
        if (gestureState.dy < threshY) {
          boxAnim.height.setValue(
            frozenBoxAnim.height._value - gestureState.dy
          );
          topRightAnim.bottom.setValue(
            frozenTopRightAnim.bottom._value - gestureState.dy
          );
          topLeftAnim.bottom.setValue(
            frozenTopLeftAnim.bottom._value - gestureState.dy
          );
        }
      },
      // update frozen animations
      onPanResponderRelease: () => {
        frozenBoxAnim.width.setValue(boxAnim.width._value);
        frozenBoxAnim.height.setValue(boxAnim.height._value);
        frozenTopRightAnim.left.setValue(topRightAnim.left._value);
        frozenTopRightAnim.bottom.setValue(topRightAnim.bottom._value);
        frozenBottomRightAnim.left.setValue(bottomRightAnim.left._value);
        frozenTopLeftAnim.bottom.setValue(topLeftAnim.bottom._value);
      },
    })
  ).current;

  // pan responder for the top left corner box
  const topLeftPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        setShowInfoBox(false);
        const threshX = frozenBoxAnim.width._value - MIN_BOX_WIDTH;
        if (gestureState.dx < threshX) {
          boxAnim.width.setValue(frozenBoxAnim.width._value - gestureState.dx);
          boxAnim.left.setValue(frozenBoxAnim.left._value + gestureState.dx);
          topLeftAnim.left.setValue(
            frozenTopLeftAnim.left._value + gestureState.dx
          );
          bottomLeftAnim.left.setValue(
            frozenBottomLeftAnim.left._value + gestureState.dx
          );
        }

        const threshY = frozenBoxAnim.height._value - MIN_BOX_HEIGHT;
        if (gestureState.dy < threshY) {
          boxAnim.height.setValue(
            frozenBoxAnim.height._value - gestureState.dy
          );
          topLeftAnim.bottom.setValue(
            frozenTopLeftAnim.bottom._value - gestureState.dy
          );
          topRightAnim.bottom.setValue(
            frozenTopRightAnim.bottom._value - gestureState.dy
          );
        }
      },
      onPanResponderRelease: () => {
        frozenBoxAnim.width.setValue(boxAnim.width._value);
        frozenBoxAnim.left.setValue(boxAnim.left._value);
        frozenBoxAnim.height.setValue(boxAnim.height._value);
        frozenTopLeftAnim.left.setValue(topLeftAnim.left._value);
        frozenTopLeftAnim.bottom.setValue(topLeftAnim.bottom._value);
        frozenBottomLeftAnim.left.setValue(bottomLeftAnim.left._value);
        frozenTopRightAnim.bottom.setValue(topRightAnim.bottom._value);
      },
    })
  ).current;

  // pan responder for the bottom left corner box
  const bottomLeftPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        setShowInfoBox(false);
        const threshX = frozenBoxAnim.width._value - MIN_BOX_WIDTH;
        if (gestureState.dx < threshX) {
          boxAnim.width.setValue(frozenBoxAnim.width._value - gestureState.dx);
          boxAnim.left.setValue(frozenBoxAnim.left._value + gestureState.dx);
          bottomLeftAnim.left.setValue(
            frozenBottomLeftAnim.left._value + gestureState.dx
          );
          topLeftAnim.left.setValue(
            frozenTopLeftAnim.left._value + gestureState.dx
          );
        }
        const threshY = MIN_BOX_HEIGHT - frozenBoxAnim.height._value;
        if (gestureState.dy > threshY) {
          boxAnim.height.setValue(
            frozenBoxAnim.height._value + gestureState.dy
          );
          boxAnim.bottom.setValue(
            frozenBoxAnim.bottom._value - gestureState.dy
          );
          bottomLeftAnim.bottom.setValue(
            frozenBottomLeftAnim.bottom._value - gestureState.dy
          );
          bottomRightAnim.bottom.setValue(
            frozenBottomRightAnim.bottom._value - gestureState.dy
          );
        }
      },
      onPanResponderRelease: () => {
        frozenBoxAnim.width.setValue(boxAnim.width._value);
        frozenBoxAnim.left.setValue(boxAnim.left._value);
        frozenBoxAnim.height.setValue(boxAnim.height._value);
        frozenBoxAnim.bottom.setValue(boxAnim.bottom._value);
        frozenBottomLeftAnim.left.setValue(bottomLeftAnim.left._value);
        frozenBottomLeftAnim.bottom.setValue(bottomLeftAnim.bottom._value);
        frozenTopLeftAnim.left.setValue(topLeftAnim.left._value);
        frozenBottomRightAnim.bottom.setValue(bottomRightAnim.bottom._value);
      },
    })
  ).current;

  // pan responder for the bottom right corner box
  const bottomRightPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        setShowInfoBox(false);
        const threshX = MIN_BOX_WIDTH - frozenBoxAnim.width._value;
        if (gestureState.dx > threshX) {
          boxAnim.width.setValue(frozenBoxAnim.width._value + gestureState.dx);
          bottomRightAnim.left.setValue(
            frozenBottomRightAnim.left._value + gestureState.dx
          );
          topRightAnim.left.setValue(
            frozenTopRightAnim.left._value + gestureState.dx
          );
        }
        const threshY = MIN_BOX_HEIGHT - frozenBoxAnim.height._value;
        if (gestureState.dy > threshY) {
          boxAnim.height.setValue(
            frozenBoxAnim.height._value + gestureState.dy
          );
          boxAnim.bottom.setValue(
            frozenBoxAnim.bottom._value - gestureState.dy
          );
          bottomRightAnim.bottom.setValue(
            frozenBottomRightAnim.bottom._value - gestureState.dy
          );
          bottomLeftAnim.bottom.setValue(
            frozenBottomLeftAnim.bottom._value - gestureState.dy
          );
        }
      },
      onPanResponderRelease: () => {
        frozenBoxAnim.width.setValue(boxAnim.width._value);
        frozenBoxAnim.height.setValue(boxAnim.height._value);
        frozenBoxAnim.bottom.setValue(boxAnim.bottom._value);
        frozenBottomRightAnim.left.setValue(bottomRightAnim.left._value);
        frozenBottomRightAnim.bottom.setValue(bottomRightAnim.bottom._value);
        frozenTopRightAnim.left.setValue(topRightAnim.left._value);
        frozenBottomLeftAnim.bottom.setValue(bottomLeftAnim.bottom._value);
      },
    })
  ).current;

  // pan responder for the main box (translation)
  const boxPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        setShowInfoBox(false);
        // x directions
        boxAnim.left.setValue(frozenBoxAnim.left._value + gestureState.dx);
        topRightAnim.left.setValue(
          frozenTopRightAnim.left._value + gestureState.dx
        );
        topLeftAnim.left.setValue(
          frozenTopLeftAnim.left._value + gestureState.dx
        );
        bottomLeftAnim.left.setValue(
          frozenBottomLeftAnim.left._value + gestureState.dx
        );
        bottomRightAnim.left.setValue(
          frozenBottomRightAnim.left._value + gestureState.dx
        );
        // y directions
        boxAnim.bottom.setValue(frozenBoxAnim.bottom._value - gestureState.dy);
        topRightAnim.bottom.setValue(
          frozenTopRightAnim.bottom._value - gestureState.dy
        );
        topLeftAnim.bottom.setValue(
          frozenTopLeftAnim.bottom._value - gestureState.dy
        );
        bottomLeftAnim.bottom.setValue(
          frozenBottomLeftAnim.bottom._value - gestureState.dy
        );
        bottomRightAnim.bottom.setValue(
          frozenBottomRightAnim.bottom._value - gestureState.dy
        );
      },
      onPanResponderRelease: () => {
        frozenBoxAnim.left.setValue(boxAnim.left._value);
        frozenBoxAnim.bottom.setValue(boxAnim.bottom._value);
        frozenTopRightAnim.left.setValue(topRightAnim.left._value);
        frozenTopRightAnim.bottom.setValue(topRightAnim.bottom._value);
        frozenTopLeftAnim.left.setValue(topLeftAnim.left._value);
        frozenTopLeftAnim.bottom.setValue(topLeftAnim.bottom._value);
        frozenBottomLeftAnim.left.setValue(bottomLeftAnim.left._value);
        frozenBottomLeftAnim.bottom.setValue(bottomLeftAnim.bottom._value);
        frozenBottomRightAnim.left.setValue(bottomRightAnim.left._value);
        frozenBottomRightAnim.bottom.setValue(bottomRightAnim.bottom._value);
      },
    })
  ).current;

  return (
    <>
      <Animated.View
        style={[styles.box, boxAnim]}
        {...boxPanResponder.panHandlers}
      />
      <Animated.View
        style={[styles.cornerHitBox, topRightAnim]}
        {...topRightPanResponder.panHandlers}
      >
        <View style={styles.cornerBox}></View>
      </Animated.View>
      <Animated.View
        style={[styles.cornerHitBox, topLeftAnim]}
        {...topLeftPanResponder.panHandlers}
      >
        <View style={styles.cornerBox}></View>
      </Animated.View>
      <Animated.View
        style={[styles.cornerHitBox, bottomLeftAnim]}
        {...bottomLeftPanResponder.panHandlers}
      >
        <View style={styles.cornerBox}></View>
      </Animated.View>
      <Animated.View
        style={[styles.cornerHitBox, bottomRightAnim]}
        {...bottomRightPanResponder.panHandlers}
      >
        <View style={styles.cornerBox}></View>
      </Animated.View>

      {isCameraReady ? (
        <TouchableOpacity
          style={styles.takePhotoButton}
          onPress={() => {
            takePicture(
              boxAnim.bottom._value,
              boxAnim.left._value,
              boxAnim.height._value,
              boxAnim.width._value
            );
          }}
        ><AntDesign name="scan1" size={40} color="hsl(0, 0%, 40%)" /></TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.takePhotoButton, styles.takePhotoButtonDisabled]}
          disabled={true}
        ><AntDesign name="scan1" size={40} color="hsl(0, 0%, 40%)" /></TouchableOpacity>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  box: {
    position: "absolute",
    backgroundColor: 'rgba(255, 240, 0, .2)',
    borderWidth: BORDER_RADIUS,
    borderColor: 'rgba(255, 240, 0, 1)',
    //opacity: 0.4,
  },
  cornerHitBox: {
    position: "absolute",
    width: CORNER_HITBOX,
    height: CORNER_HITBOX,
    //backgroundColor: "yellow",
    //opacity: 0.2,
    //borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cornerBox: { 
    width: 15, 
    height: 15, 
    backgroundColor: 'rgba(255, 240, 0, 1)', 
    borderRadius: 100,
    //opacity: 1,
  },
  takePhotoButton: {
    width: 80,
    height: 80,
    backgroundColor: "white",
    borderRadius: 9999,
    position: "absolute",
    bottom: "10%",
    justifyContent: 'center',
    alignItems: 'center'
  },
  takePhotoButtonDisabled: {
    backgroundColor: "grey",
  },
});
