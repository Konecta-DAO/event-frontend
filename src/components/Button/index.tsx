import styles from './style.module.css'

export default function Button({
  text = '',
  onClick,
  variant = 'primary',
  isDisabled = false,
  icon,
  iconPos = 'start',
  id,
  type,
  width = 'fit',
  ...props
}: any) {
  return (
    <button
      disabled={isDisabled}
      type={type || 'button'}
      className={`${styles.button} ${styles[variant]} ${
        isDisabled ? styles.disabled : ''
      } w-${width} max-md:text-[13px] max-md:p-[8px_14px] max-md:w-fit`}
      onClick={() => {
        if (onClick) onClick()
      }}
      id={id}
      {...props}
    >
      {icon && <span className={`self-${iconPos}`}>{icon}</span>}
      {text && text}
    </button>
  )
}
