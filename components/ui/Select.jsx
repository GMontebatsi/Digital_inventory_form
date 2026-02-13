import React from 'react';
import { cn } from '@/lib/utils';
import styles from './Select.module.css';

export const Select = React.forwardRef(({ className, children, ...props }, ref) => {
    return (
        <select
            className={cn(styles.select, className)}
            ref={ref}
            {...props}
        >
            {children}
        </select>
    );
});
Select.displayName = "Select";
