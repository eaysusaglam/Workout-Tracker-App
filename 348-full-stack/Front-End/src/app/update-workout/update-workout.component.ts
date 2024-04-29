import { Component, OnInit } from '@angular/core';
import { Workout } from '../workout';
import { WorkoutService } from '../workout.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-workout',
  templateUrl: './update-workout.component.html',
  styleUrl: './update-workout.component.css'
})
export class UpdateWorkoutComponent implements OnInit{

  workoutID!: number;
  workout: Workout = new Workout();
  constructor(private workoutService: WorkoutService,
    private route: ActivatedRoute,
    private router: Router) {}

   ngOnInit(): void {
    this.workoutID = this.route.snapshot.params['workoutID'];


    this.workoutService.getWorkoutByID(this.workoutID).subscribe(data => {
      this.workout = data;
    }, error => console.log(error));
   }

   goToWorkoutList(){
    this.router.navigate(['/workouts'])
  }
  
  updateWorkout() {
    this.workoutService.updateWorkout(this.workoutID, this.workout).subscribe(
      (data: any) => {
        console.log(data);
        this.workout.userID = data.userID;
        // Assuming data contains updated date and duration fields
        this.workout.date = data.date; // Update date field
        this.workout.duration = data.duration; // Update duration field
        this.goToWorkoutList();
      },
      error => console.log(error)
    );
  }

   

   onSubmit() {
    this.updateWorkout();
   }




}
