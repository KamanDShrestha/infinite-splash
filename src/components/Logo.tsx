import logo from '../assets/logo.png';

//This component is used for providing for the application
const Logo = () => {
  return (
    <img
      src={logo}
      className='h-10 transition-all duration-200 sm:h-16 block max-[400px]:hidden'
    />
  );
};

export default Logo;
