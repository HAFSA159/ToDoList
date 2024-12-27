import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  @Input() taskToUpdate: Task | null = null;
  @Output() taskSaved = new EventEmitter<Task>();
  taskTitle: string = '';
  taskDescription: string = '';
  taskDueDate: string = '';
  taskPriority: string = '';
  errorMessage: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    if (this.taskToUpdate) {
      this.taskTitle = this.taskToUpdate.title;
      this.taskDescription = this.taskToUpdate.description || '';
      this.taskDueDate = this.taskToUpdate.dueDate || '';
      this.taskPriority = this.taskToUpdate.priority || '';
    }
  }

  onSubmit() {
    if (this.taskTitle && this.taskDueDate && this.taskPriority) {
      try {
        let updatedTask: Task;
        if (this.taskToUpdate) {
          updatedTask = {
            ...this.taskToUpdate,
            title: this.taskTitle,
            description: this.taskDescription,
            dueDate: this.taskDueDate,
            priority: this.taskPriority
          };
          this.taskService.updateTask(updatedTask);
          console.log('Task Updated:', updatedTask);
        } else {
          updatedTask = {
            title: this.taskTitle,
            description: this.taskDescription,
            dueDate: this.taskDueDate,
            priority: this.taskPriority
          };
          this.taskService.addTask(updatedTask);
          console.log('Task Added:', updatedTask);
        }
        this.taskSaved.emit(updatedTask);
      } catch (error: any) {
        this.errorMessage = error.message;
      }
    }
  }
}
