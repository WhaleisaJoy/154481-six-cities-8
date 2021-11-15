import { connect, ConnectedProps } from 'react-redux';
import { useParams } from 'react-router-dom';
import { cardType, MAP_HEIGHT_PROPERTY_PAGE } from '../../../const';
import { StateType } from '../../../types/state';
import Host from '../../host/host';
import Map from '../../map/map';
import PageHeader from '../../page-header/page-header';
import PlacesList from '../../places-list/places-list';
import PropertyInfo from '../../property-info/property-info';
import Reviews from '../../reviews/reviews';

type ParamType = {
  id: string;
}

const mapStateToProps = ({offers, comments}: StateType) => ({
  offers,
  comments,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const GALLERY_IMAGES_MAX_AMOUNT = 6;
const NEAR_OFFERS_MAX_AMOUNT = 3;

function Property({offers, comments}: PropsFromRedux): JSX.Element {
  const { id } = useParams<ParamType>();
  const currentOffer = offers[parseInt(id, 10)];
  const { images } = currentOffer;

  const nearOffers = [...offers.slice(0, currentOffer.id), ...offers.slice(currentOffer.id + 1)].slice(0, NEAR_OFFERS_MAX_AMOUNT);
  const nearOffersWithCurrentOffer = [...nearOffers, currentOffer];

  return (
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
              <Reviews offer={currentOffer} comments={comments} />
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
              <PlacesList offers={nearOffers} currentCardType={cardType.NEAR_PLACES} />
            </div>

          </section>
        </div>
      </main>
    </div>
  );
}

export {Property};
export default connector(Property);
