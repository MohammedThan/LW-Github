import { View, Text,SafeAreaView } from 'react-native'
import React from 'react'

export default function homePage({route}) {
    const { code } = route.params;
    
  return (
    <SafeAreaView>
        <View>
            <Text>{code}</Text>
        </View>
    </SafeAreaView>

  )
}