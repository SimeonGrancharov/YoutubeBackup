import React from 'react'
import { useCallback } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { useReduxAction } from '../hooks/useReduxAction'
import { userSlice } from '../reducers/user'
import { LogOutIcon } from './icons/LogOut'

export const LogOutButton = () => {
  const logOutAction = useReduxAction(userSlice.actions.logOut)
  const logOut = useCallback(() => logOutAction(), [])

  return (
    <TouchableOpacity onPress={logOut} activeOpacity={0.8}>
      <LogOutIcon style={styles.icon} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
    marginRight: 15
  }
})
