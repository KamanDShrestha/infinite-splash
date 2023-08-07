type Props = {
  message: string;
};

// This component is used for providing different messages to UI
const Message = ({ message }: Props) => {
  return (
    <h1 className='my-10 text-xl font-semibold text-center sm:text-2xl'>
      {message}
    </h1>
  );
};

export default Message;
