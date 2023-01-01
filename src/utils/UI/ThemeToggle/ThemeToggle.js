import { useDispatch } from 'react-redux';
import { toggleTheme } from '../../../store/slices/newsSlice';

import { ReactComponent as DarkIcon } from './images/darkIcon.svg';
import { ReactComponent as LightIcon } from './images/lightIcon.svg';

export const DarkMode = ({ darkMode }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={() => dispatch(toggleTheme(!darkMode))}>
        {darkMode ? <LightIcon /> : <DarkIcon />}
      </button>
    </div>
  );
};
