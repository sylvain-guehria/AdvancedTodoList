import moment from 'moment';

export const myFunctions = {

  getdaysleft (deadlineS: string): string{
    if (!deadlineS){return ''}
    return moment(deadlineS).fromNow();
  },

  formatDate (dateS: string): string {
    const date = new Date(dateS);
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
    return (`${da}-${mo}-${ye}`);
  }
};
