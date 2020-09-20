const myFunctions = {

  getdaysleft (deadline: Date): number{
    const DiffTime: number = deadline.getTime() - new Date().getTime();

    const diffTimeString: string = (DiffTime / (1000 * 3600 * 24)).toFixed(1);
    return parseFloat(diffTimeString);
  },

  formatDate (date: Date): string {
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
    return (`${da}-${mo}-${ye}`);
  }
};

export default myFunctions;
