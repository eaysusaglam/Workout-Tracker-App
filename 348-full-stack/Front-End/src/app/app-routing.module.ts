import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateWorkoutComponent } from './create-workout/create-workout.component';
import { UpdateWorkoutComponent } from './update-workout/update-workout.component';
import { User } from './user';
import { UserDetailsComponent } from './user-details/user-details.component';
import { WorkoutListComponent } from './workout-list/workout-list.component';

const routes: Routes = [
  {path: 'workouts', component: WorkoutListComponent},
  {path: 'create-workout', component: CreateWorkoutComponent},
  {path : 'update-workout/:workoutID', component: UpdateWorkoutComponent},
  {path: '', redirectTo: 'workouts', pathMatch: 'full'},
  {path: 'user-details/:user_id', component:UserDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
