import moment = require("moment");

class DateTimeProcessorUtil {

  dateToUiFormat(date: Date): string {
    if (!date) {
      return '';
    }
    return moment(date).format('DD.MM.YYYY');
  }
}

const dateTimeProcessorUtil = new DateTimeProcessorUtil();

export { dateTimeProcessorUtil }
