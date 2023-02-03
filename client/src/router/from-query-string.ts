import { DEFAULT_OPTIONS } from 'src/const/default-query-options';

export const fromQueryString = (querystring: string): Options | DefOptions => {
  if (!querystring) return DEFAULT_OPTIONS;
  const querystringOpt = querystring.slice(1);
  const querystringArr = querystringOpt.split('&');
  const options: Options = {};

  querystringArr.forEach((filter) => {
    const filterType = filter.split('=')[0];
    let param = filter.split('=')[1];

    if (filterType === 'limit' || filterType === 'page') {
      if (+param <= 0 || Number.isNaN(+param)) param = '1';
      options[filterType] = +param;
    }
  });
  return options;
};