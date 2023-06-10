
import lemonDessertImage from './assets/lemon-dessert.jpg';
import greekSaladImage from './assets/greek-salad.jpg';
import bruschettaImage from './assets/bruschetta.jpg';
import pages from '../../../utils/pages';
import { Link } from 'react-router-dom';
import MealCard from './MealCard';
import './WeeklySpecials.css';




const meals = [
  {
    name: 'Greek Salad',
    image: greekSaladImage,
    price: '$15.95',
    description: `Our famous Greek salad of crispy lettuce, peppers, olives, and our
    New York-style feta cheese. Garnished with crispy onion and salty capers.`,
  },
  {
    name: 'Bruschetta',
    image: bruschettaImage,
    price: '$11.98',
    description: `An Italian antipasto made of grilled bread, smeared with garlic and seasoned with salt and olive oil. 
    Toppings of tomato, veggies, beans, cured pork, or cheese.`,
  },
  {
    name: 'Lemon Dessert',
    image: lemonDessertImage,
    price: '$12.90',
    description: `This cake is adored for its flavor and texture and simplicity. 
    A base of creamed butter, sugar, eggs, lemon, milk, and flour; the most basic of ingredients.`,
  },
];

const WeeklySpecials = () => {
  return (
    <section className="container grid weekly-specials">
      <div className="weekly-specials-header">
        <h2>This week's specials!</h2>
        <Link className="button-primary" to={pages.get('orderOnline').path}>
          Online Menu
        </Link>
      </div>
      {meals.map((meal, index) => 
        <MealCard key={index} meal={meal} />
      )}
    </section>
  );
};

export default WeeklySpecials;
