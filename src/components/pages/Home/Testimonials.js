import customer1Image from './assets/customer1.jpg';
import customer2Image from './assets/customer2.jpg';
import customer3Image from './assets/customer3.jpg';
import customer4Image from './assets/customer4.jpg';
import TestimonialCard from './TestimonialCard';
import './Testimonials.css';



const customers = [
  {
    fullName: 'Sarah T.',
    image: customer1Image,
    rating: [1, 1, 1, 1, 0.5],
    says: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  },
  {
    fullName: 'Bart A.',
    image: customer2Image,
    rating: [1, 1, 1, 1, 1],
    says: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  },


  {
    fullName: 'Iris W.',
    image: customer3Image,
    rating: [1, 1, 1, 1, 0.5],
    says: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  },

  {
    fullName: 'Wallace R.',
    image: customer4Image,
    rating: [1, 1, 1, 1, 0],
    says: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  },
];



const Testimonials = () => {
  return (
    <section className="testimonials">
      <div className="container grid">
        <h2>What people are saying about us!</h2>
        {customers.map((customer, index) => 
          <TestimonialCard key={index} customer={customer} />
        )}
     </div>
    </section>
  );
};

export default Testimonials;
