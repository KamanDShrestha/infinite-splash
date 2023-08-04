// function useEnterKey(key,){

import { useEffect, useState } from 'react';

// }
function useSearchQuery(searchInput: React.RefObject<HTMLInputElement>) {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    function setQuery(e: KeyboardEvent) {
      if (e.code.toLowerCase() === 'enter') {
        console.log('Enter pressed');
        setSearchQuery(searchInput.current?.value || '');
      }
    }

    document.addEventListener('keydown', (e) => setQuery(e));
  }, [searchInput]);

  return { searchQuery, setSearchQuery };
}

export default useSearchQuery;
