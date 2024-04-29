import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Workout } from './workout';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private baseURL = "http://localhost:8080/api/v1/workouts"

  constructor(private httpClient: HttpClient) { }

  getWorkoutsList(): Observable<Workout[]> {
    return this.httpClient.get<Workout[]>(this.baseURL);
  }

  // post request
  createWorkout(workout: Workout): Observable<Object> {
    return this.httpClient.post(this.baseURL, workout);
  }

  // get workout by ID
  getWorkoutByID(workoutID: number): Observable<Workout> {
    return this.httpClient.get<Workout>(`${this.baseURL}/${workoutID}`);
  }

  updateWorkout(workoutID: number, workout: Workout): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/${workoutID}`, workout);
  }

  deleteWorkout(workoutID: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${workoutID}`);
  }
}
