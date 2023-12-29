'use client';
import React, { useState } from 'react';
import { BsFillPlusSquareFill } from 'react-icons/bs';
import { FiMinusSquare } from 'react-icons/fi';

export const SelectRecipeButton: React.FC<CommonComponentProps> = ({
    className
}) => {
    const [isSelected, setIsSelected] = useState(false);

    const toggleSelect = () => {
        setIsSelected(!isSelected);
    };

    return (
        <button
            className={`${className} bg-stone-100 dark:bg-gray-800 text-gray-800 dark:text-stone-100  rounded`}
            onClick={toggleSelect}
        >
            {isSelected ? (
                <FiMinusSquare size={30} />
            ) : (
                <BsFillPlusSquareFill size={30} />
            )}
        </button>
    );
};
