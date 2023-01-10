import { useEffect, useRef } from 'react';
import { animateMouse, toggleIndicator } from '../utils/Indicator';

const MouseIndicator = ({ children }) => {
  const indicator = useRef(null);

  useEffect(() => {
    const id = children.props.id || '';
    if (id === '') return;
    const element = document.querySelector(`#${id}`);

    element.addEventListener('mousemove', (e) => animateMouse(e, indicator.current));

    return () => {
      element.removeEventListener('mousemove', (e) => animateMouse(e, indicator.current));
    };
  }, []);

  return (
    <div
      onMouseEnter={(e) => toggleIndicator(e, indicator.current)}
      onMouseLeave={(e) => toggleIndicator(e, indicator.current)}
    >
      {children}
      <div
        id='mouse-indicator'
        className='fixed z-40 w-4 h-4 ease-out scale-0 rounded-full pointer-events-none bg-red -top-2 -left-2 opacity-1 will-change-transform'
        ref={indicator}
      />
    </div>
  );
};

export default MouseIndicator;
