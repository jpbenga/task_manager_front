import { DateTime } from "luxon";

export interface DialogData {
    task: {
      title: string;
      description: string;
      dueDate: DateTime;
      status: string;
    };
    isNew: boolean;
  }