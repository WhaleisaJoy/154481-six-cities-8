import { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import { sortType } from '../../const';
import { changeSort } from '../../store/action';
import { Actions } from '../../types/action';
import { StateType } from '../../types/state';

const mapStateToProps = ({currentSort}: StateType) => ({
  currentSort,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onSortChange(currentSort: string) {
    dispatch(changeSort(currentSort));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Sort({currentSort, onSortChange}: PropsFromRedux): JSX.Element {
  const [isSortOptionsOpen, setSortOptionsOpen] = useState<boolean>(false);

  const sortOptionsClassNameActive = isSortOptionsOpen ? 'places__options--opened' : '';

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>

      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => {
          setSortOptionsOpen(!isSortOptionsOpen);
        }}
      >
        {currentSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>

      <ul className={`places__options places__options--custom ${sortOptionsClassNameActive}`}>
        {
          Object.values(sortType).map((sort) => {
            const activeClassName = sort === currentSort ? 'places__option--active' : '';

            return (
              <li
                key={sort}
                className={`places__option ${activeClassName}`}
                tabIndex={0}
                onClick={({currentTarget}) => {
                  onSortChange(currentTarget.innerText);
                  setSortOptionsOpen(!isSortOptionsOpen);
                }}
              >
                {sort}
              </li>
            );
          })
        }
      </ul>
    </form>
  );
}

export {Sort};
export default connector(Sort);
