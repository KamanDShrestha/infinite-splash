type Props = {
  message: string;
};

const Message = ({ message }: Props) => {
  return (
    <h1 className='my-10 text-2xl font-semibold text-center'>{message}</h1>
  );
};

export default Message;
