import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import FAQItem from 'components/FAQItem'
import { faqs } from 'utils/values'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Basic/FAQItem',
  component: FAQItem,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} satisfies ComponentMeta<typeof FAQItem>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof FAQItem> = (args) => <FAQItem {...args} />

export const Default = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  data: faqs[1],
  index: 1,
  openItemIndex: 1,
}
