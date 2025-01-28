import styles from './style.module.css'
import * as React from 'react'

interface TagsProps {
  text: string | JSX.Element
  onClose?: React.MouseEventHandler<HTMLSpanElement>
  size?: 'medium' | 'small' | 'xsmall' | any
  color?:
    | 'default'
    | 'educational'
    | 'professional'
    | 'entertainment'
    | 'health'
    | 'others'
    | any
  icon?: any
}

export default function Tags({
  text,
  onClose,
  size = 'medium',
  color = 'default',
  icon,
}: TagsProps) {
  return (
    <div className={`${styles.tags} ${styles[color]} ${styles[size]}`}>
      {text}
      {icon && (
        <span className={styles.close} onClick={onClose}>
          {icon}
        </span>
      )}
    </div>
  )
}
