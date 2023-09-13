import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getPbImageURL } from '@/utils/getPbImageUrl';

function HomeItemCompo({ item }) {
  return (
    <Link>
      <div className="flex gap-1 flex-col w-[90px]">
        <img
          src={getPbImageURL(item, 'photo')}
          className="rounded-lg w-[90px] h-[90px] object-cover"
        />
        <p className="text-xs font-bold">{item.title}</p>
        <p className="text-xs">{item.address}</p>
      </div>
    </Link>
  );
}
HomeItemCompo.propTypes = {
  item: PropTypes.object,
};

export default HomeItemCompo;
