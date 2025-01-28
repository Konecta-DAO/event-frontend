import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import ProposalStatusCard from 'components/ProposalStatusCard/ProposalStatusCard'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Basic/ProposalStatusCard',
  component: ProposalStatusCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} satisfies ComponentMeta<typeof ProposalStatusCard>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ProposalStatusCard> = (args) => (
  <ProposalStatusCard {...args} />
)

export const Default = Template.bind({})
Default.args = {
  eventId: '1234',
  eventCreator: 'Josh Powell',
  eventName: 'UX/UI Design process - Design thinking',
  lastUpdatedAt: 1712298045000000n,
  location: 'https://meet.google.com/123-abs-geps',
  note: 'I possess a deep understanding of design principles and industry best practices. My ability to create intuitive and engaging user flows, combined with my ability to work efficiently and collaboratively',
  status: 'Accepted',
}
