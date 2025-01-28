import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Tags from 'components/Tags'
import { Close } from '@mui/icons-material'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Basic/Tags',
  component: Tags,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    text: {
      control: {
        type: 'text',
      },
    },
    color: {
      control: { type: 'select' },
      options: [
        'default',
        'educational',
        'professional',
        'entertainment',
        'health',
        'others',
      ],
    },
    icon: { type: 'symbol' },
  },
} satisfies ComponentMeta<typeof Tags>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Tags> = (args) => <Tags {...args} />

export const Educational = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Educational.args = {
  text: 'Tags',
  color: 'educational',
  icon: (
    <Close
      sx={{
        width: '14px',
        height: '14px',
      }}
    />
  ),
}

export const Professional = Template.bind({})
Professional.args = {
  text: 'Tags',
  color: 'professional',
}

export const Health = Template.bind({})
Health.args = {
  text: 'Tags',
  color: 'health',
}
export const Others = Template.bind({})
Others.args = {
  text: 'Tags',
  color: 'others',
}
