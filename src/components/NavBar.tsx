import React from 'react';
import Logo from './Logo';
import { FaSave, FaSearch } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

type Props = {
  searchInput: React.RefObject<HTMLInputElement>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

const NavBar = ({ searchInput, setSearchQuery }: Props) => {
  function handleClick() {
    setSearchQuery(searchInput.current?.value || '');
  }

  return (
    <div className='flex my-0 px-8 w-[100vw] items-center gap-4 justify-center'>
      <Logo />
      <div className='flex p-5 w-[100vw] items-center gap-4 justify-center'>
        <input
          type='text'
          ref={searchInput}
          className='h-12 p-5 border border-stone-800 w-[60%] rounded-2xl'
        />

        <FaSearch
          onClick={handleClick}
          size={30}
          className='hover:cursor-pointer'
        />
      </div>
      <NavLink
        to='/savedImages'
        className='flex items-center gap-2 text-lg font-semibold'
      >
        Saved <FaSave />
      </NavLink>
    </div>
  );
};

export default NavBar;
