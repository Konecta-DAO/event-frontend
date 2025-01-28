import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Button from 'components/Button'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Basic/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    text: {
      control: {
        type: 'text',
      },
    },
    onclick: Function,
    variant: {
      options: ['primary', 'accent', 'outlined'],
      control: { type: 'select' },
    },
  },
} satisfies ComponentMeta<typeof Button>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  text: 'Button',
  variant: 'primary',
}

export const Accent = Template.bind({})
Accent.args = {
  text: 'Button',
  variant: 'accent',
}

export const Outlined = Template.bind({})
Outlined.args = {
  text: 'Button',
  variant: 'outlined',
}
