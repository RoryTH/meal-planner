import Image from 'next/image';
import { PiCurrencyGbp } from 'react-icons/pi';
import { MdOutlineTimer } from 'react-icons/md';
import { IoNutritionOutline } from 'react-icons/io5';
import { FavouriteButton } from './FavouriteButton';
import { SelectRecipeButton } from './SelectRecipeButton';

interface RecipeCardProps extends CommonComponentProps {
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
    return (
        <div className=" w-full overflow-hidden bg-stone-100 rounded-lg shadow-lg dark:bg-gray-800 relative flex flex-col justify-between">
            <div>
                <FavouriteButton className="absolute left-4 top-4 p-1.5" />
                <Image
                    className="object-cover object-center w-full h-72"
                    src={imageUrl}
                    alt="Recipe image"
                    width={500}
                    height={500}
                />
                <SelectRecipeButton className="absolute right-5 transform -translate-y-1/2 p-1.5" />
                <div>
                    <h2 className="pt-4 px-4 text-xl font-semibold text-gray-800 dark:text-stone-100">
                        {title}
                    </h2>
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
                    <p className="px-2 text-sm">{price} per serving</p>
                </div>

                <div className="flex items-center mt-1 text-gray-200 dark:text-gray-800">
                    <MdOutlineTimer />
                    <p className="px-2 text-sm">{prepTime} min</p>
                </div>

                <div className="flex items-center mt-1 text-gray-200 dark:text-gray-800">
                    <IoNutritionOutline />
                    <p className="px-2 text-sm">
                        <span className="block xs:hidden between-lg-xl:block ">
                            {calories} Kcal | {protein}g p | {carbs}g c | {fat}g
                            f
                        </span>
                        <span className="hidden xs:block between-lg-xl:hidden ">
                            {calories} Kcal | {protein}g protein | {carbs}g
                            carbs | {fat}g fat
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;
