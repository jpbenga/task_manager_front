import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/Task';
import { DialogData } from '../../models/DialogData';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    FormsModule
        ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    // Ensure dueDate is a DateTime object
    if (!(this.data.task.dueDate instanceof DateTime)) {
      this.data.task.dueDate = DateTime.fromISO(this.data.task.dueDate as unknown as string);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    // Convert DateTime to ISO string before sending to backend
    const taskToSave = {
      ...this.data.task,
      dueDate: this.data.task.dueDate.toISO()
    };
    this.dialogRef.close(taskToSave);
  }
}
