import { useState } from 'react'
import FAQItem from 'components/FAQItem/index.tsx'
import { faqs } from 'utils/values.tsx'
import styles from './style.module.css'

export default function Help() {
  const [openItemIndex, setOpenItemIndex] = useState<any>(null)

  return (
    <div className={styles.help}>
      <div className={styles.header}>
        <h1 className="text-white text-[36px] max-md:text-[20px] font-[700]">
          Help
        </h1>
      </div>
      <div className="h-[1.5px] bg-[#FFFFFF1A] mb-[40px] max-md:mb-[20px]"></div>
      <div className="flex max-md:flex-col justify-between border-b border-[#363548] max-md:border-none pb-[40px] mb-[32px] max-md:mb-0 max-md:mb-[20px]">
        <div className="flex flex-col gap-[6px] max-md:mb-[10px]">
          <h1 className="text-white text-[22px] max-md:text-[13px] font-[500]">
            Frequently asked questions
          </h1>
          <p className="text-[#A2A2B4] text-[18px] max-md:text-[12px] font-[400]">
            We know you have some question in mind, <br />
            we’re tired to list the most important one.
          </p>
        </div>
        <div className="flex flex-col w-[60%] max-md:w-full max-md:max-h-[220px] overflow-y-auto">
          {faqs.map((item, index) => (
            <FAQItem
              data={item}
              key={index}
              index={index}
              openItemIndex={openItemIndex}
              setOpenItemIndex={setOpenItemIndex}
            />
          ))}
        </div>
      </div>
      <div className="flex max-md:flex-col justify-between rounded-[8px] bg-white/5 p-[32px] max-md:p-[16px_10px] max-md:gap-[16px]">
        <div className="flex flex-col gap-[20px] max-md:gap-[10px]">
          <h1 className="text-white text-[22px] max-md:text-[13px] font-[500]">
            Do you still need our help?
          </h1>
          <p className="text-white/40 text-[18px] max-md:text-[12px] font-[400]">
            Can’t find the answer you’re looking for? Please chat to our
            friendly team.
          </p>
        </div>
        <a
          className="rounded-[8px] h-fit bg-[#337FF5] text-white text-[16px] max-md:text-[13px] font-[400] p-[14px_20px] max-md:py-[10px] max-md:w-fit"
          href="mailto:help@konecta.com"
        >
          Get in touch
        </a>
      </div>
    </div>
  )
}
