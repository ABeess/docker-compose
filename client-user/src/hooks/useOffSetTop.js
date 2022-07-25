import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import offsetAtom from 'src/recoils/offsetAtom';

// ----------------------------------------------------------------------

export default function useOffSetTop(top) {
  // const [offsetTop, setOffSetTop] = useState(false);

  const [offsetState, setOffSetState] = useRecoilState(offsetAtom);
  const isTop = top || 100;

  useEffect(() => {
    window.onscroll = () => {
      if (window.pageYOffset > isTop) {
        setOffSetState(true);
      } else {
        setOffSetState(false);
      }
    };
    return () => {
      window.onscroll = null;
    };
  }, [isTop]);
  return offsetState;
}

// Usage
// const offset = useOffSetTop(100);
