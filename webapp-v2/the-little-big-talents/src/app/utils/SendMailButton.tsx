'use client';

import { Button, ButtonProps } from '@chakra-ui/react';
import { useCallback } from 'react';

const SendMailButton: React.FC<Omit<ButtonProps, 'onClick'>> = (props) => {
  const handleClick = useCallback(async () => {
    await fetch('/api/send-email', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Пешо Георгиев',
        email: 'bgeorgiev122@gmail.com',
      }),
    });
  }, []);

  return <Button onClick={handleClick} {...props} />;
};

export default SendMailButton;
