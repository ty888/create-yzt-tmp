import React from 'react'
import { View, Text } from '@tarojs/components'
import { connect } from 'react-redux'
import './index.scss'

const Template = () => {

  return (
    <View className='index'>
      <Text>Template</Text>
    </View>
  )
}

export default connect()(Template)