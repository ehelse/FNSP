import React, { Component } from 'react';
import { ekstruderBygninger, tegnRute, addStart } from './maboxutils';
import './App.css';
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1IjoiYW5kcmVhc2U4OWRldiIsImEiOiJjazUzbmN4bHYwOHkzM2VxdGFkamVicHh4In0.DdGmpKQ-GPNoi-yVBTOXNw';
const secretToken = 'sk.eyJ1IjoiYW5kcmVhc2U4OWRldiIsImEiOiJjazU2czZwd28wMjZoM3NwODViMzlheDFvIn0.mAGpV2l3t7NSO4pAlqan9w';

export class Map extends Component {
    state = {
        lat: 59.931899,
        lng: 10.995412,
        zoom: 16,
        features: null,
    };
    componentDidMount() {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/andrease89dev/ck53v83xd08a31cs5klh6150t',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom,
            //maxZoom: this.state.zoom,
            //minZoom: 16,
            pitch: 45,
            bearing: 20,
            antialias: true,
        });

        this.setState({ kart: map }, () => this.initialiserKart())
    }
    initialiserKart = () => {
        ekstruderBygninger(this.state.kart)
        addStart(this.state.kart, [10.995503, 59.933354])
        this.hentFeatureCollection()
    }
    hentStyle = () => {
        fetch(`https://api.mapbox.com/styles/v1/andrease89dev?access_token=${secretToken}`)
            .then(data => data.json())
            .then(formatert => console.log(formatert))
    }
    slettGammelData = () => {
        if (this.state.kart.getLayer('end')) {
            this.state.kart.removeLayer('end').removeSource('end')
            this.state.kart.removeLayer('route').removeSource('route')
        }

    }
    navigasjon = (start, slutt, feature) => {
        console.log('dette funker: ', slutt)
        this.slettGammelData();
        fetch(
            `https://api.mapbox.com/directions/v5/mapbox/walking/${start};${slutt}?geometries=geojson&access_token=pk.eyJ1IjoiYW5kcmVhc2U4OWRldiIsImEiOiJjazUzbmN4bHYwOHkzM2VxdGFkamVicHh4In0.DdGmpKQ-GPNoi-yVBTOXNw`)
            .then((response) => response.json())
            .then((data) => tegnRute(this.state.kart, feature, data))
    }
    hentFeatureCollection = () => {
        fetch('https://api.mapbox.com/datasets/v1/andrease89dev/ck53uepfu06t42rqhkgg500dk/features?access_token=pk.eyJ1IjoiYW5kcmVhc2U4OWRldiIsImEiOiJjazUzbmN4bHYwOHkzM2VxdGFkamVicHh4In0.DdGmpKQ-GPNoi-yVBTOXNw')
            .then((response) => response.json())
            .then((data) => this.setState({ features: data.features }))
    }

    finnMinLokasjon = (map) => {
        map.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                trackUserLocation: true
            })
        );
    }
    settMobilNavigasjon = (e) => {
        const parsetVerdi = JSON.parse(e);
        this.navigasjon([10.995503, 59.933354], parsetVerdi.geometry.coordinates, parsetVerdi)
    }
    render() {
        const features = this.state.features?.sort((a, b) => a.properties?.name.localeCompare(b.properties.name))
        return (
            <div className="App">
                <div
                    ref={el => this.mapContainer = el}
                    className="mapContainer" />
                <div className='liste-wrapper'>
                    <h1 className='headerTekstVei'>Veibeskrivelse </h1>
                    <div>
                        <select className='drop-down-vis-mobil' onChange={(e) => this.settMobilNavigasjon(e.target.value)}>
                            <option>Vis veibeskrivelser</option>
                            {features?.map((feature, key) => {
                                if (feature.properties.skalVises !== false) return <option
                                    key={key}
                                    className='featurebox-mobil'
                                    value={JSON.stringify(feature)}>
                                    {feature.properties.name}
                                </option>
                            })}
                        </select>
                    </div>
                    {features?.map((feature, key) => {
                        if (feature.properties.skalVises !== false) {
                            return <div>
                                <button
                                    key={key}
                                    className='featurebox'
                                    onClick={() => this.navigasjon([10.995503, 59.933354], feature.geometry.coordinates, feature)}>
                                    {feature.properties.name}
                                </button>

                            </div>
                        }
                        else {
                            return null;
                        }
                    })}
                </div>
            </div>
        );
    }

}

export default Map;
