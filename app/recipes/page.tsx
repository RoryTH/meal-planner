import React from 'react';
import RecipeCard from '../components/RecipeCard';

function Page() {
    const numberOfCards = 15; // generate placeholder cards for testing

    return (
        <div>
            <div className="mx-5 justify-items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
                {Array.from({ length: numberOfCards }).map((_, index) => (
                    <RecipeCard
                        key={index}
                        title={'Chicken and Rice'}
                        prepTime={15}
                        description={
                            'Thyme-roasted portobellos top a bed of caramelised leek and chestnut mushroom risotto, garnished with homemade cheese tuiles, rich truffle oil and toasted hazelnuts. Delicious seasonal decadence!'
                        }
                        imageUrl={`https://source.unsplash.com/collection/11521778?${Math.random()}`}
                        price={3.98}
                        calories={650}
                        protein={43}
                        carbs={68}
                        fat={29}
                    />
                ))}
            </div>
        </div>
    );
}

export default Page;
