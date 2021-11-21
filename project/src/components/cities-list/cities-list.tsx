import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Cities } from '../../database';
import { changeCity } from '../../store/action';

type CitiesListProps = {
  city: string;
};

function CitiesList(props: CitiesListProps): JSX.Element {
  const { city } = props;

  const dispatch = useDispatch();

  const onChooseCity = (currentCity: string) => {
    dispatch(changeCity(currentCity));
  };

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {
            Object
              .values(Cities)
              .map((cityItem) => {
                const className = cityItem === city
                  ? 'locations__item-link tabs__item tabs__item--active'
                  : 'locations__item-link tabs__item';

                return (
                  <li className="locations__item" key={cityItem}>
                    <Link
                      className={className}
                      to="/"
                      onClick={(evt) => {
                        onChooseCity(evt.currentTarget.text);
                      }}
                    >
                      <span>{cityItem}</span>
                    </Link>
                  </li>
                );
              })
          }
        </ul>
      </section>
    </div>
  );
}

export default CitiesList;

