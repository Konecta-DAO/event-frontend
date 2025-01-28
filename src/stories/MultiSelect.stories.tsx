import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import MultiSelect from 'components/MultiSelect'
import { categories } from 'utils/values'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Basic/MultiSelect',
  component: MultiSelect,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} satisfies ComponentMeta<typeof MultiSelect>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof MultiSelect> = (args) => (
  <MultiSelect {...args} />
)

export const Default = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  items: categories,
}
