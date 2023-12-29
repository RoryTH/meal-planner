'use client';
import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

export const FavouriteButton: React.FC<CommonComponentProps> = ({
    className
}) => {
    const [isFavorited, setIsFavorited] = useState(false);

    const toggleFavorite = () => {
        setIsFavorited(!isFavorited);
    };

    return (
        <button
            className={`${className} text-red-600`}
            onClick={toggleFavorite}
        >
            {isFavorited ? <FaHeart size={30} /> : <FaRegHeart size={30} />}
        </button>
    );
};
