import { useState } from "react";
import { useMediaQuery } from '@mui/material';

const CanceledWithdrawals = () => {
  const [displayedCourseWork, setDisplayedCourseWork] = useState(7);
  const isMobile = useMediaQuery('(max-width:768px)');
  const isTablet = useMediaQuery('(max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px)');

  const loadMoreCourseWork = () => {
    setDisplayedCourseWork((prevCount) => prevCount + 8);
  };

  const courseWorkData = [];

  return (
    <div className={`bg-white text-gray-800 p-4 ${isMobile ? 'text-xs' : isTablet ? 'text-sm' : 'text-base'}`}>
      <div className="text-center text-gray-800 font-light">
        You haven't failed any coursework and are currently ungraded.
      </div>
    </div>
  );
};

export default CanceledWithdrawals;
