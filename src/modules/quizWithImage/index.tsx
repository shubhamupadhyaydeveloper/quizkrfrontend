import { Alert, Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import TextRecognition from '@react-native-ml-kit/text-recognition';
import Modal from 'react-native-modal'
import { horizontalScale, verticalScale } from '../../utils/responsive';
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import Clipboard from '@react-native-clipboard/clipboard';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

const QuizWithImage = () => {
  const [cameraImage, setCameraImage] = useState<any>('')
  const [processedText, setProcessedText] = useState<string | null>('')
  const [modalVisible, setModalVisible] = useState(false)
  const [textCopy, setTextCopy] = useState(false)

  const handleExtractText = async (imageUrl: string) => {
    console.log('this is working')
    const result = await TextRecognition.recognize(imageUrl);
    setProcessedText(result.text)
    setModalVisible(prev => !prev)
  }

  const handleTakeImage = async () => {
    try {
      const result = await launchCamera({
        mediaType: "photo",
        cameraType: "back",
        quality: 0.9,

      });

      if (result.didCancel) {
        console.log("User cancelled image picker");
        return;
      }

      if (result.errorCode) {
        Alert.alert("Error", result.errorMessage || "Something went wrong");
        return;
      }

      if (result.assets && result.assets.length > 0) {
        setCameraImage(result.assets[0].uri)
      }
    } catch (error) {
      console.error("Error launching camera:", error);
    }
  };

  const handleSelectImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: "photo",
        selectionLimit: 0
      });

      if (result.didCancel) {
        console.log("User cancelled image picker");
        return;
      }

      if (result.errorCode) {
        Alert.alert("Error", result.errorMessage || "Something went wrong");
        return;
      }

      if (result.assets && result.assets.length > 0) {
        setCameraImage(result.assets[0].uri)
      }
    } catch (error) {
      console.error("Error launching camera:", error);
    }
  }

  return (
    <ScrollView style={{ flex: 1 }}>

      <View style={{ marginTop: 20, justifyContent: 'center', alignItems: "center", marginBottom: 20 }}>
        <View style={styles.emptyImageContainer}>
          <Text style={styles.emptyImageContainerText}>No Image Selected</Text>
        </View>
      </View>

      <View style={{ gap: 10, flexDirection: 'row', }}>
        <TouchableOpacity activeOpacity={.8} style={{ flex: 1 }} onPress={handleTakeImage}>
          <View style={{ padding: 15, borderRadius: 24, backgroundColor: '#0D9276', }}>
            <Text style={{ textAlign: 'center', fontSize: 12, lineHeight: 14, fontFamily: 'Bungee-Regular', color: 'white' }}>Click Image</Text>
          </View>
        </TouchableOpacity>
        {/* <Text style={{ textAlign: 'center', fontFamily: 'Nunito-Bold', fontSize: 14 }}>Or</Text> */}
        <TouchableOpacity activeOpacity={.8} style={{ flex: 1 }} onPress={handleSelectImage}>
          <View style={{ padding: 15, borderRadius: 24, backgroundColor: '#0D9276', }}>
            <Text style={{ textAlign: 'center', fontSize: 12, lineHeight: 14, fontFamily: 'Bungee-Regular', color: 'white' }}>Select Image</Text>
          </View>
        </TouchableOpacity>
      </View>


      <View>
        {cameraImage ? (
          <Image
            source={{ uri: cameraImage }}
            style={{
              width: 320,
              height: 400
            }}
          />
        ) : null}

      </View>

      <Button title='get Text' onPress={() => handleExtractText(cameraImage)} />

      <View style={{ flex: 1, justifyContent: 'flex-end', paddingVertical: verticalScale(50) }} >
        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <View />
          <TouchableOpacity activeOpacity={.8} style={{ width: horizontalScale(140), }} >
            <View style={{ paddingVertical: 10, backgroundColor: '#0D9276', borderRadius: 20, paddingHorizontal: 20, flexDirection: 'row', gap: 5, }}>
              <MaterialIcon name='timer' color={'white'} size={22} />
              <Text style={{ color: 'white' }}>Quiz me</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        onBackdropPress={() => setModalVisible(prev => !prev)}
        isVisible={modalVisible}
        onBackButtonPress={() => setModalVisible(prev => !prev)}
        backdropOpacity={0.6}
        animationIn={'slideInLeft'}
        animationOut={'slideOutLeft'}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
          <View style={{ gap: 10 }}>

            <TouchableOpacity activeOpacity={.8} onPress={() => setModalVisible(prev => !prev)}>
              <View style={styles.container}>
                <AntDesignIcon name='close' size={20} color={'black'} />
              </View>
            </TouchableOpacity>

            <View style={{ backgroundColor: 'white', width: horizontalScale(320), height: verticalScale(600), borderRadius: 8, paddingHorizontal: 20 }}>
              <ScrollView style={{ flex: 1 }}>
                <Text style={{ color: 'black', marginTop: 10, marginBottom: 10, fontFamily: 'Nunito-Bold', fontSize: 16 }}>
                  {processedText}
                </Text>
              </ScrollView>
            </View>

            <View>
              <TouchableOpacity onPress={() => {
                Clipboard.setString(processedText!)
                setTextCopy(true)
                setTimeout(() => {
                  setTextCopy(false)
                }, 2000)
              }} activeOpacity={.8} style={{ padding: 10, backgroundColor: '#0D9276', borderRadius: 12 }}>
                <Text style={{ color: 'white', fontFamily: 'Bungee-Regular', fontSize: 12, lineHeight: 14, textAlign: 'center' }}> {textCopy ? 'Copied' : 'Copy'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </ScrollView>
  )
}

export default QuizWithImage;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderRadius: 25,
    backgroundColor: '#E2E3E5',
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyImageContainer: {
    width: horizontalScale(200),
    height: verticalScale(200),
    borderRadius: 12
    , borderColor: '#d2d2d2',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7F8'
  },
  emptyImageContainerText: {
    fontFamily: 'Bungee-Regular',
    fontSize: 12
  }

})