
import type { TASKTYPE } from '@/constants/index'

export type taskType  = TASKTYPE.TODO | TASKTYPE.BACKLOG;


export interface taskInput {
  label: string;
  type: taskType;
};

export interface task extends taskInput {
  id: number;
  createdAt: Date;
  isDone: boolean;
}

export interface sortable<Type, Field extends keyof Type> {
  by: Field;
  type: string;
};

export interface menu {
  label: string;
  to: string;
};
