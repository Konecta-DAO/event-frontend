import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import FeedCard from 'components/FeedCard'
import event from 'data/events.json'
import { FeedResponsePayload } from 'candid/ts/konecta.did'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Basic/FeedCard',
  component: FeedCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} satisfies ComponentMeta<typeof FeedCard>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof FeedCard> = (args) => (
  <div className="bg-[black]">
    <FeedCard {...args} />
  </div>
)

export const Default = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  event: event as unknown as FeedResponsePayload,
}
