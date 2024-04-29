import { Component, OnInit } from '@angular/core';
import { Router, TitleStrategy } from '@angular/router';
import { Workout } from '../workout';
import { WorkoutService } from '../workout.service';
import { User } from '../user';
import { UserService } from '../user.service';





@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrl: './workout-list.component.css'
})
export class WorkoutListComponent implements OnInit{
  workouts: Workout[] = [];
  filteredWorkouts: Workout[] = [];
  user!: User;
  userIds: number[] = [0, 1, 2, 3, 4, 5];
  selectedUserId: number | null = null;

  constructor(private workoutService: WorkoutService, private userService: UserService,
    private router: Router) {}

  ngOnInit(): void {
    this.getWorkouts();
    this.getUserIds();
  }

  private getWorkouts() {
    this.workoutService.getWorkoutsList().subscribe(data => {
      this.workouts = data;
      this.filteredWorkouts = data;
    });
  }

  private getUserIds() {
    this.userService.getUsersList().subscribe(users => {
      this.userIds = users.map(user => user.user_id);
    });
  }

  onUserSelect() {
    console.log('Selected User ID:', this.selectedUserId); // Debugging log
    if (this.selectedUserId === null || !this.userIds.includes(this.selectedUserId)) {
      console.log('null');
      this.filteredWorkouts = this.workouts;
    } else {
      this.filteredWorkouts = this.workouts.filter(
        workout => workout.userID === this.selectedUserId
      );
    }
  }

  updateWorkout(workoutID: number) {
    this.router.navigate(['update-workout', workoutID]);
  }

  deleteWorkout(workoutID: number) {
    this.workoutService.deleteWorkout(workoutID).subscribe(date => {
      this.getWorkouts();
    })
  }

  userDetails(user_id: number) {
    this.router.navigate(['user-details', user_id]);
  }
}
