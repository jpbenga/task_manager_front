import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { DialogData } from '../../models/DialogData';
import { provideNativeDateAdapter } from '@angular/material/core';
import { TasksService } from '../services/tasks.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    MatButtonModule
        ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private tasksService: TasksService
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    console.log('Task to save:', this.data.task);
    console.log('Is new task:', this.data.isNew);

    if (this.data.isNew) {
      this.createTask();
    } else if (this.data.task.id) {
      this.updateTask();
    } else {
      console.error('Invalid state: not new but no ID');
    }
  }

  private createTask(): void {
    this.tasksService.createTask(this.data.task).subscribe({
      next: (createdTask) => {
        console.log('Task created:', createdTask);
        this.dialogRef.close(createdTask);
      },
      error: (error) => {
        console.error('Error creating task:', error);
        this.handleError(error);
      }
    });
  }
  handleError(error: any) {
    throw new Error('Method not implemented.');
  }

  private updateTask(): void {
    this.tasksService.updateTask(this.data.task.id!, this.data.task).subscribe({
      next: (updatedTask) => {
        console.log('Task updated:', updatedTask);
        this.dialogRef.close(updatedTask);
      },
      error: (error) => {
        console.error('Error updating task:', error);
        this.handleError(error);
      }
    });
  }
}
