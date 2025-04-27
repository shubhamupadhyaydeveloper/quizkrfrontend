import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { pick } from '@react-native-documents/picker'
import RNFS from 'react-native-fs';

type ResponseType = {
  numPages : number,
  title : string,
  author : string,
  text : string
}

const QuizWithPdf = () => {
  const [result,setResult] = useState<ResponseType | null>(null)


  const handleSelectPdf = async () => {

    console.log('handle click is working')

    const [result] = await pick({
      mode :'open'
    })


    const formData = new FormData()
    formData.append('pdf', {
       uri : result.uri,
       type : result.type,
       name : result.name
    })

    const response = await fetch('http://192.168.1.103:3002/user/upload', {
      method: 'POST',
      body: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    

    const apiResult = await response.json()

    setResult(apiResult.data)

    console.log('this is your resullt',apiResult)

  }

  return (
    <ScrollView>
      <Text>QuizWithPdf</Text>
      <Button
        title="open file"
        onPress={handleSelectPdf}
      />

      <Text style={{color : 'black'}}>
        {result?.text}
      </Text>
    </ScrollView>
  )
}

export default QuizWithPdf;

const styles = StyleSheet.create({})