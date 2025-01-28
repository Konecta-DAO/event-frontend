import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import CheckBox from 'components/CheckBox'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Basic/CheckBox',
  component: CheckBox,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    caption: {
      control: {
        type: 'text',
      },
    },
    color: {
      control: { type: 'select' },
      options: [
        'educational',
        'professional',
        'entertainment',
        'health',
        'others',
      ],
    },
  },
} satisfies ComponentMeta<typeof CheckBox>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CheckBox> = (args) => (
  <CheckBox {...args} />
)

export const Educational = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Educational.args = {
  caption: 'CheckBox',
  checked: true,
  color: 'educational',
}

export const Professional = Template.bind({})
Professional.args = {
  caption: 'CheckBox',
  checked: true,
  color: 'professional',
}

export const Health = Template.bind({})
Health.args = {
  caption: 'CheckBox',
  checked: true,
  color: 'health',
}
export const Others = Template.bind({})
Others.args = {
  caption: 'CheckBox',
  checked: true,
  color: 'others',
}
