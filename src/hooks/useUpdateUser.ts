import { useEffect } from 'react';
import { useAppDispatch } from './reduxHooks';
import { setUser } from '../redux/slices/userSlice';
import { User } from 'firebase/auth';

export const useUpdateUser = (user: User | null | undefined) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const updateUser = async () => {
      if (user) {
        const token = await user.getIdToken();
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token,
          }),
        );
      }
    };

    updateUser();
  }, [dispatch, user]);
};
