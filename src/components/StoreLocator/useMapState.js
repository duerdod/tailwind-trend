import { useState, useCallback } from 'react';

const useMapState = () => {
  const [mapState, setMapState] = useState({
    isOpen: false,
    infoId: null
  });

  const showInfo = useCallback(
    id => {
      setMapState({
        isOpen: mapState.infoId !== id || !mapState.isOpen,
        infoId: id
      });
    },
    [mapState.infoId, mapState.isOpen]
  );

  return {
    ...mapState,
    showInfo
  };
};

export { useMapState };
