import styles from './styles.module.css'
import { useAppSelector } from 'reduxStore/hooks.tsx'
import { RootState } from 'reduxStore/store.tsx'

const loadingSelector = (state: RootState) => state.appState.isLoading

const LoaderBar = () => {
  const isVisible = useAppSelector(loadingSelector)

  if (isVisible) {
    return <div className={styles.progressbar} />
  }

  return null
}

export default LoaderBar
