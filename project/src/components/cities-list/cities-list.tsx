import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';
import { Cities } from '../../database';
import { changeCity } from '../../store/action';
import { Actions } from '../../types/action';

type CitiesListProps = {
  city: string;
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onChooseCity(city: string) {
    dispatch(changeCity(city));
  },
});

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & CitiesListProps;

function CitiesList(props: ConnectedComponentProps): JSX.Element {
  const { city, onChooseCity } = props;

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

export {CitiesList};
export default connector(CitiesList);
