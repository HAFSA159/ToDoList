import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [];

  addTask(task: Task) {
    const newTask = {
      ...task,
      id: this.generateId(),
      priority: task.priority || "medium",
    };
    this.tasks.push(newTask);
    console.log("Task added:", newTask);
  }

  updateTask(updatedTask: Task) {
    const index = this.tasks.findIndex((task) => task.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
      console.log('Task updated:', updatedTask);
    } else {
      throw new Error('Task not found');
    }
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
