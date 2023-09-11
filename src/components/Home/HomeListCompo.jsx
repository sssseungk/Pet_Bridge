import PropTypes from 'prop-types';

function HomeListCompo(props) {
  return (
    <div className="px-5 py-3">
      <div className="flex justify-between items-center">
        <h2 className="font-bold inline">{props.title}</h2>
        <span className="text-xs">더보기 &gt; </span>
      </div>
    </div>
  );
}

HomeListCompo.propTypes = {
  title: PropTypes.string.isRequired,
};

export default HomeListCompo;
