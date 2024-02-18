import { Button } from '@nextui-org/react';
import React from 'react';

function CustomButton({ children, className }) {
  return (
    <Button size='lg' className={`
    rounded-lg
    border-2
    bg-transparent
    text-foreground-dark
    border-border
    shadow-small
    hover:text-primary-light
    hover:border-primary-dark
    hover:shadow-medium
    ${className}`
    }>
      {children}
    </Button>
  )
}

export default CustomButton;