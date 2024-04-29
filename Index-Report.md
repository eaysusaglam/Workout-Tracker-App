This document describes the indexes and stored proceducres for this project.

I have created an index called "theUserIds" on the column user_id in the workouts table to support reporting workouts based on user ID as well as support searching the workouts table for existing ID's when adding to the user table.

I have also created two Stored Procedures that are reliant on this index: 
// Searches for workouts based on User ID
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `FindWorkoutsByUserID`(
    IN search_id LONG
)
BEGIN
    SELECT * FROM workout_management_system.workouts
    WHERE user_id = search_id;
END$$
DELIMITER ;


// Adds/Updates entries in the User table based on User ID DELIMITER $$ CREATE DEFINER=root@localhost PROCEDURE AddUserID(IN p_user_id INT) BEGIN DECLARE v_total_workouts INT;

-- check if the user_id exists in the users table
SELECT total_workouts INTO v_total_workouts
FROM users
WHERE user_id = p_user_id;

-- if the user_id does not exist, insert a new row
IF v_total_workouts IS NULL THEN
    INSERT INTO users (user_id, total_workouts)
    VALUES (p_user_id, 1);

-- if the user_id exists, increment the total_workouts
ELSE
    UPDATE users
    SET total_workouts = v_total_workouts + 1
    WHERE user_id = p_user_id;
END IF;
END$$ DELIMITER ;
