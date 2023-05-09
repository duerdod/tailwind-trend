import { useState } from 'react';

const useLocationState = () => {
  const [highlightedLocation, setHighlightedLocation] = useState(null);
  const [expandedLocation, setExpandedLocation] = useState(null);

  const toggleExpandedLocation = id =>
    setExpandedLocation(expandedLocation === id ? null : id);

  return {
    activeLocation: highlightedLocation || expandedLocation,
    expandedLocation,
    setHighlightedLocation,
    toggleExpandedLocation
  };
};

export { useLocationState };
