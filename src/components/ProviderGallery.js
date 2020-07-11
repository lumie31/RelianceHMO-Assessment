import React from "react";
import PropTypes from "prop-types";
import LoadingScreen from "./common/LoadingScreen";

import {Redirect} from 'react-router-dom';

class Gallery extends React.Component {
  // TASK 3a:
  // Complete the Gallery component to include functionality
  // On click on left or right arrows, the gallery should change its image
  // On click of the thumbnails, the image selected should be updated as well
  // On click of the "Read more" button in the selected Image, it should redirect to the Selected Provider View.
  //
  //
  // Task 3b:
  // Write tests for the Gallery component. Tests should be written in the Gallery.spec.js file in the __tests__ folder.
  //
  //
  // ============== CODE GOES BELOW THIS LINE :) ==============
  constructor(props) {
    super(props);
    
    this.state = {
      currentIndex: 0,
      redirect: null,
    };
  }

  getCurrentIndex() {
    let total = this.props.items.length;
    let curr = this.state.currentIndex; // 5
    let next = (curr + 1) % total; // 6
    let prev = (curr - 1) < 0 ? (total - 1) : (curr - 1); // 4

    return [prev, curr, next];
  }

  handleSwitch(direction) {
    const [prev, curr, next] = this.getCurrentIndex();
    this.setState({
      currentIndex:
        direction === "left"
          ? prev
          : next,
    });
  }
  render() {
    const { items } = this.props;
    const [prev, curr, next] = this.getCurrentIndex();
    console.log(prev, curr, next);
    if (!items || items.length === 0) {
      return <LoadingScreen />;
    }

    if (this.state.redirect){
      return <Redirect to={this.state.redirect}></Redirect>
    }
    return (
      <div data-testid="gallery" className="box-shadow gallery">
        <div className="gallery__slider">
          <div className="gallery__slider-item-wrapper">
            <div
              className="gallery__slider-item prev"
              style={{
                backgroundImage: `url("${items[prev].imageUrl}")`,
              }}
            ></div>
            <div className="gallery__slider-item active">
              <img
                src={items[curr].imageUrl}
                className="gallery__slider-item active"
                alt=""
              />
              <div className="gallery__slider-item__info">
                <div className="gallery__slider-item__info-name">
                  {items[curr].name}
                </div>
                <div className="gallery__slider-item__info-description">
                  {items[curr].description}
                  <p className="read-more">
                    <button onClick={() => this.setState({redirect: "/view-provider"})}>Click to View</button>
                  </p>
                </div>
              </div>
            </div>
            <div
              className="gallery__slider-item next"
              style={{
                backgroundImage: `url("${items[next].imageUrl}")`,
              }}
            ></div>
          </div>
          <div className="gallery__slider-controls">
            <button
              onClick={() => this.handleSwitch("left")}
              className="gallery__slider-controls__button left"
            >
              <i className="fa fa-chevron-left"></i>
            </button>
            <button
              onClick={() => this.handleSwitch("right")}
              className="gallery__slider-controls__button right"
            >
              <i className="fa fa-chevron-right"></i>
            </button>
          </div>
        </div>
        <div className="gallery__thumbnails">
          <div
            className="gallery__thumbnails__item"
            style={{
              backgroundImage: `url("${items[prev].thumbnail}")`,
            }}
          ></div>
          <div
            className="gallery__thumbnails__item active"
            style={{
              backgroundImage: `url("${items[curr].thumbnail}")`,
            }}
          ></div>
          <div
            className="gallery__thumbnails__item"
            style={{
              backgroundImage: `url("${items[next].thumbnail}")`,
            }}
          ></div>
        </div>
      </div>
    );
  }
}

Gallery.propTypes = {
  startFrom: PropTypes.number,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      imageUrl: PropTypes.string.isRequired,
      name: PropTypes.string,
      description: PropTypes.string,
    })
  ).isRequired,
  onClick: PropTypes.instanceOf(Function),
};

export default Gallery;
