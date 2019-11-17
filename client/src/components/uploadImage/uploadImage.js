import React from 'react'
const axios = require("axios");

export class UploadImage extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      file: null
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onFormSubmit(e){
    e.preventDefault();
    const formData = new FormData();
    formData.append('caseImage',this.state.file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    axios.post("/api/uploadImage",formData,config)
      .then((response) => {
        console.log("The file is successfully uploaded");
        this.props.onChange(response);
      }).catch((error) => {
      console.log('error:', error)
      this.setState({file:''});
    });
  }
  onChange(e) {
      setTimeout(() => {
      document.getElementById('upload-file').click();
    }, 1250);
    this.setState({file:e.target.files[0]});
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <input type="file" name="caseImage" onChange= {this.onChange} size="40"/>
        <button style={{display:'none'}} id={'upload-file'} type="submit">Upload</button>
      </form>

    )
  }
}

