import { ITask, PriorityEnum } from './dummyData'
import * as validate from 'validate.js'

// TODO: Extend Validate.JS with reusable, TypeScript-tight functionality for all in-house projects to use


// TODO: Refactor Task and TaskEdit to use this fieldToLabel for consistency
const fieldToLabel: { [ key: string ]: string } = {
  abxTaskId: 'Task ID',
  organisationTaskId: 'Organisation\'s Task ID',
  organisationId: 'Organisation ID',
  priority: 'Priority',
  taskStatus: 'Status',
  assignedto: 'Assigned Vehicle ID',
  timestamp: 'Incident Date/Time',
  latitude: 'Latitude',
  longitude: 'Longitude',
  tasksummary: 'Task Summary',
  taskdescription: 'Task Description'
}

const constraints = {
  organisationId: {
    numericality: true
  },
  priority: {
    presence: {
      allowEmpty: false
    },
    exclusion: {
      within: [ 'none' ],
      message: 'Please set the priority of this task.'
    },
    inclusion: [ PriorityEnum.LOW, PriorityEnum.MEDIUM, PriorityEnum.HIGH ]
  },
  taskStatus: {
    presence: {
      allowEmpty: false
    },
    exclusion: {
      within: [ 'none' ],
      message: 'Please set the status of this task.'
    },
    type: 'string'
  },
  assignedto: {
    presence: {
      allowEmpty: false
    },
    type: 'string'
  },
  timestamp: {
    presence: {
      allowEmpty: false
    },
    datetime: true
  },
  latitude: {
    presence: {
      allowEmpty: false
    },
    numericality: {
      lessThanOrEqualTo: 180,
      greaterThanOrEqualTo: -180
    }
  },
  longitude: {
    presence: {
      allowEmpty: false
    },
    numericality: {
      lessThanOrEqualTo: 90,
      greaterThanOrEqualTo: -90
    }
  },
  tasksummary: {
    presence: {
      allowEmpty: false
    },
    type: 'string',
    length: {
      maximum: 255
    }
  },
  taskdescription: {
    presence: {
      allowEmpty: false
    },
    type: 'string'
  }
}

const formatErrors = (errors?: { [ key: string ]: string[] }): string[] => {
  if (typeof errors !== 'object') return []
  const labels = Object.keys(errors).map(field =>
    fieldToLabel.hasOwnProperty(field) ? fieldToLabel[ field ] as string : 'Unknown')
  return Object.values(errors).reduce((p, v, i) =>
    [ ...p, ...v.map(errorMessage => `${labels[ i ]}: ${errorMessage}`) ], [])
}

export const validateTask = (task: Partial<ITask>): string[] => {
  // Before using it we must add the parse and format functions
  validate.extend(validate.validators.datetime, {
    // The value is guaranteed not to be null or undefined but otherwise it
    // could be anything.
    // NB: This is a lazy implementation.
    parse: function (value: unknown) {
      return Date.parse(value as string)
    },
    // Input is a unix timestamp
    format: function (value: unknown) {
      return Date.parse(value as string)
    }
  })

  // TODO: Create custom error messages to use only this label by default (not %{Label}: ${Fieldname} ${errorMessage})
  return formatErrors(validate.validate(task, constraints))
}
