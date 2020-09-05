export interface Task {
  // Task Id used internally
  abxTaskId: number
  organisationTaskId: number
  organisationId: number
  priority: PriorityEnum
  taskStatus: string
  // vehicle id associated with the task
  assignedto: string
  // When the incident happened
  timestamp: Date
  latitude: number
  longitude: number
  // short summary to be displayed in task lists
  tasksummary: string
  // full description of what the task is about
  taskdescription: string

}

export enum PriorityEnum {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}

const dummyTask: Task = {
  abxTaskId: 123,
  organisationTaskId: 321,
  organisationId: 3,
  priority: PriorityEnum.LOW,
  taskStatus: 'In Progress',
  assignedto: 'Emily Axford',
  timestamp: new Date(),
  latitude: -150.321,
  longitude: 39.321,
  tasksummary: 'Reach out to sponsors',
  taskdescription: 'Leverage agile frameworks to provide a robust synopsis ' +
    'for high level overviews. Iterative approaches to corporate strategy foster ' +
    'collaborative thinking to further the overall value proposition. Organically grow ' +
    'the holistic world view of disruptive innovation via workplace diversity and empowerment.'

}
export const tasks = [ dummyTask, dummyTask, dummyTask, dummyTask, dummyTask, dummyTask, dummyTask ]


const response = (status = 200, body?: any) =>
  ({ status, body })

// tasks
const getAllTasks = () =>
  response(201, tasks) // GET
const createTask = (task: Task[]) =>
  response(201) // POST


// tasks/organisations/{organisationId}
const getTasksByOrganisation = (organisationId: number) =>
  response(201, tasks) // GET

// tasks/organisations/{organisationId}/{callerId}/
// note: accessId in request header
const getTasksByCaller = (organisationId: number, callerId: number, accessId: number) =>
  response(200, tasks) // GET

// tasks/organisations/{organisationId}/{callerId}/latest
const getLatestTaskByCaller = (organisationId: number, callerId: number, accessId: number) =>
  response(200, dummyTask) // GET

// tasks/{abxTaskId}/
const deleteTask = (abxTaskId: number) =>
  response(204) // DELETE
const getTask = (abxTaskId: number) =>
  response(200, dummyTask) // GET
const updateTask = (abxTaskId: number, task: Task) =>
  response(201) // PUT
