import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sortType } from '../../const';
import { changeSort } from '../../store/action';
import { getCurrentSort } from '../../store/interface-reducer/selectors';

function Sort(): JSX.Element {
  const currentSort = useSelector(getCurrentSort);

  const dispatch = useDispatch();

  const onSortChange = (currentSortItem: string) => {
    dispatch(changeSort(currentSortItem));
  };

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

export default Sort;
