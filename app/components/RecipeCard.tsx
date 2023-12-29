'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { PiCurrencyGbp } from 'react-icons/pi';
import { BsFillPlusSquareFill } from 'react-icons/bs';
import { FiMinusSquare } from 'react-icons/fi';
import { MdOutlineTimer } from 'react-icons/md';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { IoNutritionOutline } from 'react-icons/io5';

interface RecipeCardProps {
    title: string;
    description: string;
    prepTime: number;
    imageUrl: string;
    price: number;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
    title,
    description,
    prepTime,
    imageUrl,
    price,
    calories,
    protein,
    carbs,
    fat
}) => {
    const [isFavorited, setIsFavorited] = useState(false);
    const [isSelected, setIsSelected] = useState(false);

    const toggleFavorite = () => {
        setIsFavorited(!isFavorited);
    };

    const toggleSelect = () => {
        setIsSelected(!isSelected);
    };

    const [showFullText, setShowFullText] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    const checkWidthAndUpdateText = () => {
        if (containerRef.current) {
            const width = containerRef.current.offsetWidth;
            setShowFullText(width > 350);
        }
    };

    useEffect(() => {
        checkWidthAndUpdateText();
        window.addEventListener('resize', checkWidthAndUpdateText);
        return () =>
            window.removeEventListener('resize', checkWidthAndUpdateText);
    }, []);

    return (
        <div
            ref={containerRef}
            className=" w-full overflow-hidden bg-stone-100 rounded-lg shadow-lg dark:bg-gray-800 relative flex flex-col justify-between"
        >
            <div>
                <button
                    className="absolute left-4 top-4 text-red-600 p-1.5"
                    onClick={toggleFavorite}
                >
                    {isFavorited ? (
                        <FaHeart size={30} />
                    ) : (
                        <FaRegHeart size={30} />
                    )}
                </button>
                <Image
                    className="object-cover object-center w-full h-72"
                    src={imageUrl}
                    alt="avatar"
                    width={500}
                    height={500}
                />

                <button
                    className="absolute right-5 transform -translate-y-1/2 bg-stone-100 dark:bg-gray-800 text-gray-800 dark:text-stone-100 p-1.5 rounded"
                    onClick={toggleSelect}
                >
                    {isSelected ? (
                        <FiMinusSquare size={30} />
                    ) : (
                        <BsFillPlusSquareFill size={30} />
                    )}
                </button>

                <div>
                    <h1 className="pt-4 px-4 text-xl font-semibold text-gray-800 dark:text-stone-100">
                        {title}
                    </h1>
                    <div className="pt-2 pb-4 px-4">
                        <p className=" text-gray-700 dark:text-gray-400 line-clamp-2 h-12">
                            {description}
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-green-700 dark:bg-green-500 m-0 pb-4 pt-2 px-4">
                <div className="flex items-center mt-1 text-gray-200 dark:text-gray-800">
                    <PiCurrencyGbp />
                    <h2 className="px-2 text-sm">{price} per serving</h2>
                </div>

                <div className="flex items-center mt-1 text-gray-200 dark:text-gray-800">
                    <MdOutlineTimer />
                    <h2 className="px-2 text-sm">{prepTime} min</h2>
                </div>

                <div className="flex items-center mt-1 text-gray-200 dark:text-gray-800">
                    <IoNutritionOutline />
                    <h2 className="px-2 text-sm">
                        {calories} Kcal |
                        {showFullText
                            ? ` ${protein}g protein `
                            : ` ${protein}g p `}
                        |{showFullText ? ` ${carbs}g carbs` : ` ${carbs}g c`} |
                        {showFullText ? ` ${fat}g fat` : ` ${fat}g f`}
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;
