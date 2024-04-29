package net.javaguides.springbootbackend.controller;

import net.javaguides.springbootbackend.exception.ResourceNotFoundException;
import net.javaguides.springbootbackend.model.Workout;
import net.javaguides.springbootbackend.repository.WorkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/")
public class WorkoutController {
    @Autowired
    private WorkoutRepository workoutRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // get all workouts Rest API
    @GetMapping("/workouts")
    public List<Workout> getAllWorkouts() {
        return workoutRepository.findAll();
    }

    // get workouts by userID Rest API
    @GetMapping("/workouts/user/{userID}")
    public List<Workout> getWorkoutsByUserID(@PathVariable Long userID) {
        return workoutRepository.findByUserID(userID);
    }

    // create workout Rest API
    @PostMapping("/workouts")
    public Workout createWorkout(@RequestBody Workout workout) {
        // Save the workout to the Workouts table
        Workout savedWorkout = workoutRepository.save(workout);

        // Call the stored procedure to update the users table
        jdbcTemplate.update("CALL AddUserID(?)", savedWorkout.getUserID());

        return savedWorkout;
    }

    // get workout by ID Rest API
    @GetMapping("/workouts/{workoutID}")
    public ResponseEntity<Workout> getWorkoutById(@PathVariable Long workoutID) {
        Workout workout = workoutRepository.findById(workoutID)
                .orElseThrow(() -> new ResourceNotFoundException("Workout does not exist with ID: " + workoutID));
        return ResponseEntity.ok(workout);
    }

    // update workout Rest API
    @PutMapping("/workouts/{workoutID}")
    public ResponseEntity<Workout> updateWorkout(@PathVariable Long workoutID, @RequestBody Workout workoutDetails) {
        // (1) retrieve existing workout from DB
        Workout workout = workoutRepository.findById(workoutID)
                .orElseThrow(() -> new ResourceNotFoundException("Workout does not exist with ID: " + workoutID));

        // get updates
        workout.setUserID(workoutDetails.getUserID());
        workout.setDate(workoutDetails.getDate());
        workout.setDuration(workoutDetails.getDuration());

        // assign to an updated workout
        Workout updatedWorkout = workoutRepository.save(workout);
        return ResponseEntity.ok(updatedWorkout);
    }

    // delete workouts Rest API
    @DeleteMapping("/workouts/{workoutID}")
    public ResponseEntity<Map<String, Boolean>> deleteWorkout(@PathVariable Long workoutID) {
        // retrieve workout w particular id
        Workout workout = workoutRepository.findById(workoutID)
                .orElseThrow(() -> new ResourceNotFoundException("Workout does not exist with ID: " + workoutID));

        // deletes workout, but delete() returns nothing
        workoutRepository.delete(workout);

        // create map to return to client
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}