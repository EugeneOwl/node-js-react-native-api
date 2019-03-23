-- User's time logged should be calculated as sum of all time logged that user logged to task_logs
CREATE OR REPLACE FUNCTION recalculate_user_time_logged()
  RETURNS TRIGGER AS
$BODY$
  BEGIN
    UPDATE users
        SET time_logged = (SELECT SUM(time_logged) FROM task_logs WHERE user_id = NEW.user_id)
    WHERE id = NEW.user_id;

    RETURN NEW;
  END;
$BODY$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS users_recalculate_time_worked ON task_logs;

CREATE TRIGGER users_recalculate_time_worked
  AFTER INSERT OR UPDATE OR DELETE ON task_logs FOR EACH ROW
  EXECUTE PROCEDURE recalculate_user_time_logged();
