package net.javaguides.springbootbackend.repository;

import net.javaguides.springbootbackend.model.Workout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkoutRepository extends JpaRepository<Workout, Long> {
    @Query(nativeQuery=true, value="CALL FindWorkoutsByUserID(:userID)")
    List<Workout> findByUserID(@Param("userID") Long userID);
}
