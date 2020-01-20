import React, { useRef, useEffect, useState } from 'react';
import { Input } from 'antd';
/* global google */

const LocationSearch = props => {
  const autocompleteInput = useRef();
  let autocomplete = null;

  const handlePlaceChanged = () => {
    const place = autocomplete.getPlace();
    const e = document.createEvent('Event');
    const event = { ...e };
    event.target = {};
    event.target.name = 'location';
    event.target.value = place.formatted_address;
    props.onChange(event);
    const latitude = { ...e };
    latitude.target = {};
    latitude.target.name = 'latitude';
    latitude.target.value = place.geometry.location.lat();
    props.onChange(latitude);
    const longitude = { ...e };
    longitude.target = {};
    longitude.target.name = 'longitude';
    longitude.target.value = place.geometry.location.lng();
    props.onChange(longitude);
    console.log(place);
  };

  useEffect(() => {
    autocomplete = new google.maps.places.Autocomplete(
      autocompleteInput.current,
      { types: ['geocode'] }
    );

    autocomplete.addListener('place_changed', handlePlaceChanged);
  }, []);

  return (
    <input
      ref={autocompleteInput}
      id="autocomplete"
      placeholder="Enter your address"
      type="text"
      {...props}
    />
  );
};

export default LocationSearch;
