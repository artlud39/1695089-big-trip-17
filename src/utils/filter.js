import {FILTER_TYPE} from '../const';
import {isTaskExpired,} from './task';

const filter = {
  [FILTER_TYPE.ALL]: (tasks) => tasks.filter((task) => !task.isArchive),
  [FILTER_TYPE.OVERDUE]: (tasks) => tasks.filter((task) => isTaskExpired(task.dueDate) && !task.isArchive),
  [FILTER_TYPE.TODAY]: (tasks) => tasks.filter((task) => isTaskExpiringToday(task.dueDate) && !task.isArchive),
};

export {filter};
