import React, { Component } from 'react';
import { defaultImgPath, loadImage } from '../utils/helpers';
import PropTypes from 'prop-types';

class ImageBox extends Component {

  constructor(props) {
    super(props);
    this.img = undefined;
    this.state = {
      isFetchingImg: true
    }

    this.handleImgLoad = this.handleImgLoad.bind(this);
    this.handleImgError = this.handleImgError.bind(this);
  }

  componentDidMount() {
    this.img = loadImage(
      this.props.imgPath,
      this.handleImgLoad,
      this.handleImgError
    );
  }

  handleImgLoad() {
    this.setState(() => ({isFetchingImg: false}));
  }

  handleImgError() {
    this.setState(() => ({isFetchingImg: false}));
  }

  componentWillUnmount() {
    this.img.removeEventListener('load', this.handleImgLoad);
    this.img.removeEventListener('error', this.handleImgError);
  }

  render() {
    const { imgPath, styleClass } = this.props;
    const imgSrc = this.state.isFetchingImg ? defaultImgPath : imgPath;
    return (
      <img src={imgSrc} className={styleClass} />
    );
  }
}

Image.propTypes = {
  imgPath: PropTypes.string.isRequired,
  styleClass: PropTypes.string
}

export default ImageBox;