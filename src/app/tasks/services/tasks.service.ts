import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../models/Task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private apiUrl = 'http://localhost:8080/tasks'; // Ajustez l'URL selon votre configuration

  constructor(private http: HttpClient) { }

  // Récupérer toutes les tâches
  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  // Récupérer une tâche par son ID
  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  // Créer une nouvelle tâche
  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  // Mettre à jour une tâche
  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task);
  }

  // Supprimer une tâche
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
