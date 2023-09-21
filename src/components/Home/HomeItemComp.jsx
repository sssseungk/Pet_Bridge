import PropTypes from 'prop-types';
import getPbImageURL from '@/utils/getPbImageUrl';

function HomeItemCompo({ item }) {
  return (
    <a href={item.url} target="_blank" rel="noopener noreferrer">
      <div className="flex gap-1 flex-col w-[90px]">
        <img
          alt={item.title}
          src={getPbImageURL(item, 'photo')}
          className="rounded-lg w-[90px] h-[90px] object-cover aria-hidden"
        />
        <p className="text-xs font-bold">{item.title}</p>
        <p className="text-xs">{item.address}</p>
      </div>
    </a>
  );
}
HomeItemCompo.propTypes = {
  item: PropTypes.object,
};

export default HomeItemCompo;
