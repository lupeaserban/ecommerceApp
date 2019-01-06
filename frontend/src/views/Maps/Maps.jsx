import React from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoibHVwZWFzZXJiYW4iLCJhIjoiY2owaGNsMjZyMDJ5eDJxcDVleWE2a3BjdCJ9.fMYQbhKexTYmOygHsUSUEw";

class Maps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 12,
      bearing: 7,
      pitch: 45,
      center: [23.6, 46.7712],
      lon: "",
      lat: ""
    };
  }

  showPosition = map => {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position);
      this.setState(() => {
        return {
          lon: position.coords.longitude,
          lat: position.coords.latitude
        };
      });
      // console.log(this.state);

      let popup = new mapboxgl.Popup({
        offset: 15,
        anchor: "bottom-left"
      }).setText("You are here.");
      new mapboxgl.Marker()
        .setLngLat([this.state.lon, this.state.lat])
        .addTo(map)
        .setPopup(popup);
    });
  };

  componentDidMount() {
    const options = this.state;

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/lupeaserban/cjnbe24ko5ul92rmfszpzhevk",
      center: options.center,
      zoom: options.zoom,
      bearing: options.bearing,
      pitch: options.pitch
    });
    this.map = map;
    this.showPosition(map);
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    const style = {
      margin: 0,
      top: 0,
      bottom: 0,
      height: "90vh",
      width: "100%"
    };

    return <div style={style} ref={el => (this.mapContainer = el)} />;
  }
}

export default Maps;
