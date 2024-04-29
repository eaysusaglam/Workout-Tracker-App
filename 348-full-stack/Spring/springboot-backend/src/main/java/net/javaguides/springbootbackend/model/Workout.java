package net.javaguides.springbootbackend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "workouts")


public class Workout {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private long workoutID;

    @Column(name = "user_ID")
    private long userID;
    @Column(name = "duration")
    private long duration;
    @Column(name = "date")
    private String date;


    public Workout() {
    }

    public Workout(long userID, long duration, String date) {
        this.userID = userID;
        this.duration = duration;
        this.date = date;
    }

    public long getWorkoutID() {
        return workoutID;
    }

    public void setWorkoutID(long workoutID) {
        this.workoutID = workoutID;
    }

    public long getUserID() {
        return userID;
    }

    public void setUserID(long userID) {
        this.userID = userID;
    }

    public long getDuration() {
        return duration;
    }

    public void setDuration(long duration) {
        this.duration = duration;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
