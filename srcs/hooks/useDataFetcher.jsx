import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useDataFetcher = (fetchAction, selector) => {
  const dispatch = useDispatch();
  const state = useSelector(selector || (() => ({})));
  const { data, loading, error } = state;

  useEffect(() => {
    // Check if data is null, undefined, or an empty array/object
    const isDataEmpty = data === null || data === undefined || (Array.isArray(data) && data.length === 0) || (typeof data === 'object' && !Array.isArray(data) && Object.keys(data).length === 0);
    
    if (isDataEmpty && !loading && !error) {
      dispatch(fetchAction());
    }
  }, [dispatch, fetchAction, data, loading, error]);

  const retry = () => dispatch(fetchAction());

  // Return normalized data (array or object), ensuring data is not undefined
  return { data: data ?? (Array.isArray(state) ? [] : {}), loading: loading ?? false, error, retry };
};

export default useDataFetcher;