export interface ITask {
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

export enum StatusEnum {
  InProgress = 'In Progress',
  Complete = 'Complete',
  Assigned = 'Assigned'
}

export const dummyTask = (priority: PriorityEnum, status: StatusEnum): ITask => ({
  abxTaskId: 123,
  organisationTaskId: 321,
  organisationId: 3,
  priority: priority,
  taskStatus: status,
  assignedto: 'AAA11AA',
  timestamp: new Date(),
  latitude: -150.321,
  longitude: 39.321,
  tasksummary: 'Unspecified first aid emergency',
  taskdescription: 'Leverage agile frameworks to provide a robust synopsis ' +
    'for high level overviews. Iterative approaches to corporate strategy foster ' +
    'collaborative thinking to further the overall value proposition. Organically grow ' +
    'the holistic world view of disruptive innovation via workplace diversity and empowerment.'

})
export const tasks = [
  dummyTask(PriorityEnum.LOW, StatusEnum.InProgress),
  dummyTask(PriorityEnum.HIGH, StatusEnum.Assigned),
  dummyTask(PriorityEnum.MEDIUM, StatusEnum.Assigned),
  dummyTask(PriorityEnum.HIGH, StatusEnum.InProgress),
  dummyTask(PriorityEnum.LOW, StatusEnum.Complete),
  dummyTask(PriorityEnum.LOW, StatusEnum.Complete),
  dummyTask(PriorityEnum.MEDIUM, StatusEnum.InProgress) ]

export interface IResponse<T = any> {
  status: number,
  body?: T
}

const response = <T>(status = 200, body?: T): IResponse<T> =>
  ({ status, body })

// tasks
export const getAllTasks = (): IResponse<ITask[]> =>
  response(201, tasks) // GET

export const createTask = (task: ITask[]): IResponse =>
  response(201) // POST

// tasks/organisations/{organisationId}
export const getTasksByOrganisation = (organisationId: number): IResponse<ITask[]> =>
  response(201, tasks) // GET

// tasks/organisations/{organisationId}/{callerId}/
// note: accessId in request header
export const getTasksByCaller = (organisationId: number, callerId: number, accessId: number): IResponse<ITask[]> =>
  response(200, tasks) // GET

// tasks/organisations/{organisationId}/{callerId}/latest
export const getLatestTaskByCaller = (organisationId: number, callerId: number, accessId: number): IResponse<ITask> =>
  response(200, dummyTask(PriorityEnum.MEDIUM, StatusEnum.InProgress)) // GET

// tasks/{abxTaskId}/
export const deleteTask = (abxTaskId: number): IResponse =>
  response(204) // DELETE

export const getTask = (abxTaskId: number): IResponse<ITask> =>
  response(200, dummyTask(PriorityEnum.MEDIUM, StatusEnum.InProgress)) // GET

export const updateTask = (abxTaskId: number, task: ITask) =>
  response(201) // PUT
