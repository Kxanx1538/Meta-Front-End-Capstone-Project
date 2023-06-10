import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faStarHalfAlt
} from '@fortawesome/free-solid-svg-icons';
import './TestimonialCard.css';




const ratingLevels = { '0.5': faStarHalfAlt, '1': faStar, };

const TestimonialCard = ({ customer }) => {
  return (
    <article className="testimonial-card">
      <img src={customer.image} alt={customer.firstName} />
      <h4>{customer.fullName}</h4>
      <span>
        {customer.rating.map((ratingPoint, index) => 
          <FontAwesomeIcon 
            key={index} 
            icon={ratingLevels[ratingPoint]} 
            size="xs" 
          />
        )}
      </span>
      <blockquote><p>"{customer.says}"</p></blockquote>
    </article>
  );
};

export default TestimonialCard;
