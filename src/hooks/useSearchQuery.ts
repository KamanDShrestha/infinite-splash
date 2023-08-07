import { useEffect, useState } from 'react';

//This hook function is used for providing the search query based on the value in search input along with method to set it
function useSearchQuery(searchInput: React.RefObject<HTMLInputElement>) {
  const [searchQuery, setSearchQuery] = useState('');

  //Providing the functionality of pressing the Enter key to set the search query
  useEffect(() => {
    function setQuery(e: KeyboardEvent) {
      if (e.code.toLowerCase() === 'enter') {
        setSearchQuery(searchInput.current?.value || '');
      }
    }
    document.addEventListener('keydown', (e) => setQuery(e));
  }, [searchInput]);

  return { searchQuery, setSearchQuery };
}

export default useSearchQuery;
