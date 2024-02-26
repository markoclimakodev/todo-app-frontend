import { UseToggleReturnType } from '@/interface/hooks/UseToggleReturnType';
import { useState, useCallback } from 'react';

export const useToggle = (initialState: boolean = false): UseToggleReturnType => {
    const [isOpen, setIsOpen] = useState<boolean>(initialState);

    const toggle = useCallback(() => {
        setIsOpen((prevIsOpen) => !prevIsOpen);
    }, []);

    return {
        isOpen,
        toggle,
    };
};


