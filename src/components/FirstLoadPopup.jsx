import React, { useState, useEffect } from 'react';
import { useCookies } from 'next-client-cookies';
import PopupBlock from '@/components/Popup';

const FirstLoadPopup = () => {
    const [showPopup, setShowPopup] = useState(false);
    const cookie = useCookies();
    const initialHasVisited = cookie.get("firstVisitedMigrate1")
  
    useEffect(() => {
      if (!initialHasVisited) {
        setShowPopup(true);
      }
    }, [initialHasVisited]);
  
    const handleClosePopup = () => {
      setShowPopup(false);
      cookie.set("firstVisitedMigrate1", Date.now(), { expires: 365 })
    };
  
    return (
      <>
        {showPopup && <PopupBlock onClose={handleClosePopup} />}
      </>
    );
};

export default FirstLoadPopup;
