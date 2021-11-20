import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { cardType, MAP_HEIGHT_PROPERTY_PAGE } from '../../../const';
import { fetchCurrentOfferAction, fetchOffersNearbyAction } from '../../../store/api-action';
import { getCurrentOffer, getCurrentOfferLoadedStatus, getOffersNearby } from '../../../store/data-reducer/selectors';
import Host from '../../host/host';
import LoadWrapper from '../../load-wrapper/load-wrapper';
import Map from '../../map/map';
import PageHeader from '../../page-header/page-header';
import PlacesList from '../../places-list/places-list';
import PropertyInfo from '../../property-info/property-info';
import Reviews from '../../reviews/reviews';

type ParamType = {
  id: string;
}

const GALLERY_IMAGES_MAX_AMOUNT = 6;

function Property(): JSX.Element {
  const currentOffer = useSelector(getCurrentOffer);
  const isCurrentOfferLoaded = useSelector(getCurrentOfferLoadedStatus);
  const offersNearby = useSelector(getOffersNearby);

  const dispatch = useDispatch();

  const { id } = useParams<ParamType>();

  useEffect(() => {
    const onCurrentOfferFetch = (idItem: number) => {
      dispatch(fetchCurrentOfferAction(idItem));
    };

    onCurrentOfferFetch(parseInt(id, 10));
  }, [dispatch, id]);

  useEffect(() => {
    const onOffersNearbyFetch = (idItem: number) => {
      dispatch(fetchOffersNearbyAction(idItem));
    };

    onOffersNearbyFetch(parseInt(id, 10));
  }, [dispatch, id]);

  const { images } = currentOffer;

  const nearOffersWithCurrentOffer = [...offersNearby, currentOffer];

  return (
    <LoadWrapper isLoad = {isCurrentOfferLoaded}>
      <div className="page">
        <PageHeader />

        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {
                  [...images.slice(0, GALLERY_IMAGES_MAX_AMOUNT)]
                    .map((image) => (
                      <div className="property__image-wrapper" key={image}>
                        <img className="property__image" src={image} alt="Photo studio" />
                      </div>
                    ))
                }
              </div>
            </div>

            <div className="property__container container">
              <div className="property__wrapper">
                <PropertyInfo offer={currentOffer} />
                <Host offer={currentOffer} />
                <Reviews />
              </div>
            </div>

            <section className="property__map map">
              <Map offers={nearOffersWithCurrentOffer} activePlaceCard={currentOffer.id} height={MAP_HEIGHT_PROPERTY_PAGE} />
            </section>
          </section>


          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>

              <div className="near-places__list places__list">
                <PlacesList offers={offersNearby} currentCardType={cardType.NEAR_PLACES} />
              </div>

            </section>
          </div>
        </main>
      </div>
    </LoadWrapper>
  );
}

export default Property;
