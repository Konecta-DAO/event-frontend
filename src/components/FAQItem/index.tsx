import React from 'react'
import { AddOutlined, RemoveOutlined } from '@mui/icons-material'
import styles from './styles.module.css'

interface FAQItemProps {
  data: any
  index: number
  openItemIndex: any
  setOpenItemIndex: any
}

export default function FAQItem({
  data,
  index,
  openItemIndex,
  setOpenItemIndex,
}: FAQItemProps) {
  const isOpen = openItemIndex === index

  return (
    <div className={styles.faqItem}>
      <div className={styles.faqItemHeader}>
        <p>{data.question}</p>
        <span onClick={() => setOpenItemIndex(isOpen ? null : index)}>
          {isOpen ? <RemoveOutlined /> : <AddOutlined />}
        </span>
      </div>
      {!isOpen && <div className={styles.devider} />}

      {isOpen && <div className={styles.faqDescription}>{data.answer}</div>}
    </div>
  )
}
