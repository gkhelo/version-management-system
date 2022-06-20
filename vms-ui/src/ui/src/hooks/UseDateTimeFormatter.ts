import { GridValueFormatterParams } from "@mui/x-data-grid";
import { format, parseISO } from "date-fns";
import { format as TimeZoneFormat, utcToZonedTime } from "date-fns-tz";

const GEORGIA_LOCAL_DATE = "dd/MM/yyyy";
const GEORGIA_LOCAL_DATE_TIME = "dd/MM/yyyy, HH:mm:ss";

const dataGridValueFormatter = (params: GridValueFormatterParams<string>) => {
  return formatInTimeZone(
    parseISO(params.value),
    GEORGIA_LOCAL_DATE_TIME,
    "UTC",
  );
};

const formatInTimeZone = (
  date: Date | string | number,
  fmt: string,
  tz: string,
) => TimeZoneFormat(utcToZonedTime(date, tz), fmt, { timeZone: tz });

const toGeorgiaLocale = (date: any): string | undefined => {
  if (!date) {
    return undefined;
  }
  const dateTime = new Date(date);
  return format(dateTime, GEORGIA_LOCAL_DATE_TIME) || "";
};

const isValidDate = (d: any): boolean => {
  return d instanceof Date && !isNaN(d.getTime());
};

const useDateFormatter = () => {
  return {
    patterns: {
      georgia_date: GEORGIA_LOCAL_DATE,
      georgia_date_time: GEORGIA_LOCAL_DATE_TIME,
    },
    isValidDate: isValidDate,
    toGeorgiaLocale: toGeorgiaLocale,
    dataGridValueFormatter: dataGridValueFormatter,
  };
};

export default useDateFormatter;
