import styles from './style.module.css'

const CheckBox = ({ caption, color, ...rest }: any) => {
  return (
    <label className={styles.myCheckbox}>
      <input type="checkbox" {...rest} />
      <span className={`${styles[color]} ${styles.checkmark}`}></span>
      {caption}
    </label>
  )
}

export default CheckBox
