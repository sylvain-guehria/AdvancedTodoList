import moment from "moment";

export function formatDate(value: Date) {
  if (value) {
    return moment(value).format("YYYY/MM/DD");
  }
}

export function formatDateHHMM(value: Date) {
  if (value) {
    return moment(value).format("YYYY/MM/DD HH:mm");
  }
}

export function formatTimeHHMM(value: Date) {
  if (value) {
    return moment(value).format("HH:mm");
  }
}
