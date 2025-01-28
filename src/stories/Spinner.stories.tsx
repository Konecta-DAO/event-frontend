import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Spinner from 'components/Spinner'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Basic/Spinner',
  component: Spinner,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    size: {
      options: ['default', 'medium', 'small'],
      control: { type: 'radio' },
    },
  },
} satisfies ComponentMeta<typeof Spinner>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Spinner> = (args) => <Spinner {...args} />

export const Default = Template.bind({})
Default.args = {
  size: 'default',
}
export const Medium = Template.bind({})
Medium.args = {
  size: 'medium',
}
export const Small = Template.bind({})
Small.args = {
  size: 'small',
}
