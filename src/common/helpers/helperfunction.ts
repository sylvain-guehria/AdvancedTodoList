import moment from 'moment';
import store from '@/store/index'

export const helperFunctions = {

  formatDate(dateS: string): string {
    const date = new Date(dateS);
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
    return (`${da}-${mo}-${ye}`);
  },
};
