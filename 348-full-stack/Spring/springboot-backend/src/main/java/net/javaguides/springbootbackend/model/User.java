package net.javaguides.springbootbackend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int user_id;
    @Column(name = "total_workouts")
    private int total_workouts;

    public User() {

    }

    public User(int total_workouts) {
        this.total_workouts = total_workouts;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public int getTotal_workouts() {
        return total_workouts;
    }

    public void setTotal_workouts(int total_workouts) {
        this.total_workouts = total_workouts;
    }
}
