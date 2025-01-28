import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import SingleSelect from 'components/SingleSelect'
import { languages } from 'utils/values'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Basic/SingleSelect',
  component: SingleSelect,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} satisfies ComponentMeta<typeof SingleSelect>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SingleSelect> = (args) => (
  <SingleSelect {...args} />
)

export const Default = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  items: languages,
}
