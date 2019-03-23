import { Duration } from "moment";
import moment = require("moment");

class DurationProcessorUtil {

  /**
   * Converts date string from database format to UI format.
   *
   * @param duration - string formatted like '25:59:58' (e.g. 25 hours, 59 minutes and 58 seconds)
   * @return string formatted like '1d 1h 59m'
   */
  stringToUiFormat(duration: string): string {
    const momentDuration = moment.duration(duration);
    return this.durationToUiFormat(momentDuration);
  }

  durationToUiFormat(duration: Duration): string {
    return duration.days() + 'd ' + duration.hours() + 'h ' + duration.minutes() + 'm';
  }
}

const durationProcessorUtil = new DurationProcessorUtil();

export { durationProcessorUtil }
