import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import EventsCard from 'components/EventsCard'
import { categories } from 'utils/values'
import eventData from 'data/events.json'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Basic/EventsCard',
  component: EventsCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} satisfies ComponentMeta<typeof EventsCard>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof EventsCard> = (args) => (
  <EventsCard {...args} />
)

export const Default = Template.bind({})
Default.args = {
  data: eventData,
}
