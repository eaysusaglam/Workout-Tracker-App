import { Component } from '@angular/core';
import { Workout } from '../workout';
import { WorkoutService } from '../workout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-workout',
  templateUrl: './create-workout.component.html',
  styleUrl: './create-workout.component.css'
})
export class CreateWorkoutComponent {

  workout: Workout = new Workout();

  constructor(private workoutService: WorkoutService,
    private router: Router) {}

  saveWorkout() {
    this.workoutService.createWorkout(this.workout).subscribe(data => {
      console.log(data);
      this.goToWorkoutList();
    },
    error => console.log(error));
  }

  goToWorkoutList(){
    this.router.navigate(['/workouts'])
  }

  onSubmit(){
    console.log(this.workout);
    this.saveWorkout();
  }

}
