import React, { useState, useEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import CropRectangle from "./CropRectangle.js";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import Themes from "../Themes/Themes.js";
import MlkitOcr from 'react-native-mlkit-ocr';
import TextRecognition from '@react-native-ml-kit/text-recognition';

const CameraPreview = ({ photo, resetCamera, widthScale, heightScale }) => {
  const getText = async () => {
    try {
      //const result = await TextRecognition.recognize();
      //const result = await TesseractOcr.recognize(photo.uri, LANG_ENGLISH); 
      //const result = await Tesseract.recognize(photo.uri, LANG_ENGLISH);
      //const OCR = NativeModules.OCR;
      //const result = await OCR.scanForText(photo.uri);
      //console.log(result);

      const resultFromUri = await MlkitOcr.detectFromUri(photo.uri);
      resultFromUri.map((block) => {
        block.lines.map((line) => {
          console.log(line.text);
        })
      })
      /*
      const tessOptions = {};
      const text = await TesseractOcr.recognize(photo.uri, LANG_ENGLISH, tessOptions);
      console.log(text);
      */
      /*
       const result = await TextRecognition.recognize(photo.uri);
       console.log(result);
             */
    } catch (err) {
      console.log('Error:', err);
    }
  }
  useEffect(() => {
    getText();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{ uri: photo.uri }}
        style={{
          width: photo.width / widthScale,
          height: photo.height / heightScale,
        }}
      />
      <TouchableOpacity
        style={styles.takePhotoButton}
        onPress={resetCamera}
      ></TouchableOpacity>
    </SafeAreaView>
  );
};

export default function ExcerptCamera() {
  const [permission, setPermission] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [hasTakenPicture, setHasTakenPicture] = useState(false);

  // necessary to use state for getting view dimensions
  const [viewWidth, setViewWidth] = useState(null);
  const [viewHeight, setViewHeight] = useState(null);
  const [widthScale, setWidthScale] = useState(null);
  const [heightScale, setHeightScale] = useState(null);
  let camera;

  useEffect(() => {
    // check current permission status
    (async () => {
      const { status } = await Camera.getCameraPermissionsAsync();
      setPermission(status === "granted");
    })();
  }, []);

  const takePicture = async (bottom, left, height, width) => {
    if (!camera) return;
    setHasTakenPicture(true); // display loading wheel while camera takes picture
    const photo = await camera.takePictureAsync();
    // get scaling ratio because photo dimension units are different from view dimension units
    const wScale = photo.width / viewWidth;
    const hScale = photo.height / viewHeight;
    const manipResult = await manipulateAsync(
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
    setWidthScale(wScale);
    setHeightScale(hScale);
    setCapturedImage(manipResult);
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
      <SafeAreaView style={styles.container}>
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
          <CropRectangle
            isCameraReady={isCameraReady}
            takePicture={takePicture}
          />
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <CameraPreview
        photo={capturedImage}
        resetCamera={resetCamera}
        widthScale={widthScale}
        heightScale={heightScale}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Themes.dark.bg,
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
  takePhotoButton: {
    width: 80,
    height: 80,
    backgroundColor: "white",
    borderRadius: 9999,
    position: "absolute",
    bottom: "10%",
  },
  takePhotoButtonDisabled: {
    backgroundColor: "grey",
  },
});
