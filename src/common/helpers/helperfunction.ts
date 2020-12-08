import moment from 'moment';
import store from '@/store/index'

export const myFunctions = {

  getdaysleft(deadlineS: string): string {

    if (deadlineS === new Date().toISOString().substring(0, 10)) {
      return 'today'
    }
    if (!deadlineS) { return '' }
    return moment(deadlineS).fromNow();
  },

  getNumberdaysleft(deadlineS: string): number {
    const deadline = new Date(deadlineS);
    const DiffTime: number = deadline.getTime() - new Date().getTime();

    const diffTimeString: string = (DiffTime / (1000 * 3600 * 24)).toFixed(1);
    return parseFloat(diffTimeString);
  },
  formatDate(dateS: string): string {
    const date = new Date(dateS);
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
    return (`${da}-${mo}-${ye}`);
  },
  dateOfTask(key) {

    var index = store.getters.getTodoList.findIndex(function (o) {
      return o.key === key;
    });

    if (index !== -1) {
      return store.getters.getTodoList[index].deadline;
    }
  }
};
