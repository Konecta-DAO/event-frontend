import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import MultiEventFeedBack from 'components/Modals/MultiEventFeedBack'
import { FeedResponsePayload } from 'candid/ts/konecta.did'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Basic/MultiEventFeedBackModal',
  component: MultiEventFeedBack,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} satisfies ComponentMeta<typeof MultiEventFeedBack>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof MultiEventFeedBack> = (args) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <button
        onClick={() => {
          setIsOpen(true)
        }}
      >
        show modal
      </button>
      <MultiEventFeedBack
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  )
}

export const Default = Template.bind({})
Default.args = {
  isOpen: true,
  onClose: () => {},
  events: [
    {
      event_id: '123',
      name: 'UX/UI workshop design',
    },
    {
      event_id: '1234',
      name: 'Basics of ICP transactions',
    },
  ] as unknown as FeedResponsePayload[],
  onSubmit: (v) => console.log('result', v),
  formUid: 'EVENT_COMPLETE_CONFIRMATION',
}
