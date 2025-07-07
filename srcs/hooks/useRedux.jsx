import { useDispatch, useSelector } from 'react-redux';

/**
 * Custom hook for using Redux dispatch and selector easily.
 */
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
