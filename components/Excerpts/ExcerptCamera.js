import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Animated,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import CropRectangle from "./CropRectangle.js";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import CameraPreview from "./CameraPreview.js";
import { AntDesign } from '@expo/vector-icons';

export default function ExcerptCamera({ book_uuid, setModalVisible, loadExcerpts }) {
  const [permission, setPermission] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [hasTakenPicture, setHasTakenPicture] = useState(false);
  const [showInfoBox, setShowInfoBox] = useState(true);

  // necessary to use state for getting view dimensions
  const [viewWidth, setViewWidth] = useState(null);
  const [viewHeight, setViewHeight] = useState(null);
  const [widthScale, setWidthScale] = useState(null);
  const [heightScale, setHeightScale] = useState(null);
  let camera;

  const opacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // check current permission status
    (async () => {
      const { status } = await Camera.getCameraPermissionsAsync();
      setPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    if (!showInfoBox) {
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start()
    } 
  }, [showInfoBox]);

  const takePicture = async (bottom, left, height, width) => {
    if (!camera) return;
    setHasTakenPicture(true); // display loading wheel while camera takes picture
    const photo = await camera.takePictureAsync();
    // get scaling ratio because photo dimension units are different from view dimension units
    const wScale = photo.width / viewWidth;
    const hScale = photo.height / viewHeight;
    const cropPhoto = await manipulateAsync(
      photo.uri,
      [
        {
          crop: {
            height: height * hScale,
            width: width * wScale,
            originX: wScale * left,
            originY: photo.height - hScale * (bottom + height),
          },
        },
      ],
      { compress: 1, format: SaveFormat.PNG }
    );
    const origPhoto = await manipulateAsync(
      photo.uri,
      [],
      { compress: 1, format: SaveFormat.PNG }
    )
    setWidthScale(wScale);
    setHeightScale(hScale);
    setCapturedImage({ cropPhoto, origPhoto });
    setHasTakenPicture(false);
  };

  const resetCamera = () => {
    setCapturedImage(null);
  };

  const grantPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setPermission(status === "granted");
  };

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  if (permission === null) {
    // Camera permissions are still loading
    return <ActivityIndicator size="large" />;
  }

  if (permission === false) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={grantPermission} title="grant permission" />
      </View>
    );
  }

  if (!capturedImage) {
    return (
      <View style={styles.container}>
        <View
          style={styles.innerContainer}
          onLayout={(event) => {
            setViewWidth(event.nativeEvent.layout.width);
            setViewHeight(event.nativeEvent.layout.height);
          }}
        >
          <Camera
            style={styles.camera}
            type={CameraType.back}
            onCameraReady={onCameraReady}
            ref={(elem) => {
              camera = elem;
            }}
          >
            {hasTakenPicture ? <ActivityIndicator size="large" /> : null}
          </Camera>

          <Animated.View style={[styles.boxInfo, { opacity: opacityAnim }]}>
            <Text style={styles.boxInfoText}>Drag or resize the highlighter box to cover the text you wish to capture, then tap
              the <AntDesign name="scan1" size={15} color="white" /> button</Text>
          </Animated.View>

          <CropRectangle
            isCameraReady={isCameraReady}
            takePicture={takePicture}
            setShowInfoBox={setShowInfoBox}
          />
        </View>
      </View>
    );
  } else {
    return (
      <CameraPreview
        photo={capturedImage}
        resetCamera={resetCamera}
        widthScale={widthScale}
        heightScale={heightScale}
        book_uuid={book_uuid}
        loadExcerpts={loadExcerpts}
        setModalVisible={setModalVisible}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  innerContainer: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  boxInfo: {
    position: 'absolute',
    top: 75,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '80%',
    padding: 10,
    borderRadius: 10
  },
  boxInfoText: {
    textAlign: 'center',
    color: 'white'
  }
});
