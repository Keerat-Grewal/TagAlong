import React, { Component } from 'react';

class SimpleMap extends Component {
  
 
  render() {
    return (
        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d101400.99868591237!2d-122.09555218029577!3d37.418645988136866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1619465478782!5m2!1sen!2sus" width="600" height="450" style={{border:0}} allowfullscreen="" loading="lazy"></iframe>
    );
  }
}
 
export default SimpleMap;