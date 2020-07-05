import React, { useContext } from 'react';
import { CurrentUserContext } from '../context/context'
import PropTypes from 'prop-types';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import axios from 'axios';

const _ = require("lodash");
const { compose, withProps, lifecycle } = require("recompose");

const GoogleMapContainer = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyALk2YofY1rU3fw0UAXXSm_cwquQ4PaHUc&v=3.exp&libraries=geometry,drawing,places&language=uk",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px`, width: '100%' }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  lifecycle({
    async componentWillMount() {
      const refs = {}
      const { state, dispatch } = this.props;
      // console.log('GoogleMapContainer::componentWillMount::state');
      // console.log(state);
      this.setState({
        bounds: null,
        center: {
          lat: state.location.lat,
          lng: state.location.lng
        },
        zoom: 15,
        markers: [{
          position: {
            lat: state.location.lat,
            lng: state.location.lng
          }
        }],
        places: [],
        onMapMounted: ref => {
          refs.map = ref;
        },
        onMapClick: async (e) => {
          const { locked } = this.props;
          if (locked === true) {
            return;
          }
          else {
            const obj = JSON.parse(JSON.stringify(e.latLng));
            const response = await axios({
              method: 'get',
              url: `http://api.positionstack.com/v1/forward?access_key=02a5cf920f6489bdb9f7e846a0204a42&query=${obj.lat},${obj.lng}`,
              headers: {
                'Content-Type': 'application/json; charset=utf-8',
              }
            });
            console.log(response)
            this.setState({
              markers: [{ position: e.latLng }],
              bounds: null,
              center: e.latLng
            },
              () => {
                  dispatch({ type: 'SET_LOCATION', payload: obj })
                  console.log(obj)
              }
            );
          }
        },
        onBoundsChanged: async () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
            zoom: 15
          })
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        }
      })
    }
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  // console.log(props)
  return (
    <>
      <GoogleMap
        ref={props.onMapMounted}
        zoom={props.zoom}
        center={props.center}
        onIdle={props.onBoundsChanged}
        onClick={props.onMapClick}
      >
        {props.markers && props.markers.map((marker, index) => {
          return (
            <Marker key={index} position={marker.position} />
          );
        }
        )}
      </GoogleMap>
      <ol className="">
        {props.places ? props.places.map(
          ({ place_id, formatted_address }) => (
            <li key={place_id}>
              {formatted_address}
            </li>
          )
        ) : ''}
      </ol>
    </>
  );
}
);

const GoogleMapWrapper = ({ locked }) => {
  const [state, dispatch] = useContext(CurrentUserContext);
  return (
    <GoogleMapContainer locked={locked} state={state} dispatch={dispatch} />
  )
}

GoogleMapWrapper.propTypes = {
  locked: PropTypes.bool
}

GoogleMapContainer.defaultProps = {
  locked: false
}

export default GoogleMapWrapper;

