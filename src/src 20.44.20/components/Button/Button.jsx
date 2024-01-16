
import { Link } from 'react-router-dom';

const Button = ({title ,logo ,link}) => {
  return (
    <div>
      <div className="flex flex-wrap gap-5 xl:gap-7.5">
        <Link
          to={link}
          className="inline-flex items-center justify-center gap-2.5 rounded-full bg-subMain py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          <span>{logo}</span>
          {title}
        </Link>
      </div>
    </div>
  );
}

export default Button