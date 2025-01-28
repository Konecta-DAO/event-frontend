import React from 'react'
import styles from './styles.module.css'
import { useAppSelector } from 'reduxStore/hooks'
import { RootState } from 'reduxStore/store'

const loadingSelector = (state: RootState) => state.appState.isLoading

const LoaderBar = () => {
  const isVisible = useAppSelector(loadingSelector)

  if (isVisible) {
    return <div className={styles.progressbar} />
  }

  return null
}

export default LoaderBar
