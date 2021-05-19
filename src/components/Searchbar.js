import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import {Form} from 'react-bootstrap';
// import "../styles/searchbar.css"
 
export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '', name: ""};
  }
 
  handleChange = address => {
    this.setState({address : address, name: address});
  };
 
  handleSelect = address => {
    // console.log("HERE address")
    // console.log(address);
    this.setState({name: address})
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };
 
  render() {
    return (
      <PlacesAutocomplete
        value={this.state.name}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <Form.Control
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
              value={this.state.name}
              id="search-form"
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
<<<<<<< HEAD
              {suggestions.map((suggestion, index) => {
=======
              {suggestions.map(suggestion, index => {
>>>>>>> fbc2fe891c89392f5990d6e73ee4ceaf8d367785
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div 
                  {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
<<<<<<< HEAD
                    key={index}
=======
                    key = {index}
>>>>>>> fbc2fe891c89392f5990d6e73ee4ceaf8d367785
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}