import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TasksService } from '../../tasks/services/tasks.service';
import { Task } from '../../models/Task';


describe('TaskService', () => {
  let service: TasksService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TasksService]
    });
    service = TestBed.inject(TasksService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create a task', () => {
    const mockTask: Task = {
      id: 1, // Vous pouvez utiliser un ID factice pour le test
      title: 'New Task',
      description: 'Task description',
      dueDate: '2023-12-31', // Utilisez une date valide au format string
      status: 'TODO', // Ou tout autre statut valide selon votre modèle
      user: {
        id: 1,
        username: 'testuser',
        role: 'ROLE_USER'
      }
    };

    service.createTask(mockTask).subscribe(task => {
      expect(task).toBeTruthy();
      expect(task.title).toBe('New Task');
      // Vous pouvez ajouter d'autres assertions ici
    });

    const req = httpMock.expectOne(`${service['apiUrl']}`);
    expect(req.request.method).toBe('POST');
    req.flush(mockTask);
  });
});