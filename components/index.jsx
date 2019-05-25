import React from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import cors from 'cors';
// console.log(React);

class App extends React.Component {

  constructor(props){
    super(props);
    this.state ={
      text: "Roll over image to zoom in",
      main: "https://s3.amazonaws.com/fec.amazin/1000_1.jpg",
      images: ["https://s3.amazonaws.com/fec.amazin/1000_1.jpg", "https://s3.amazonaws.com/fec.amazin/1000_2.jpg", "https://s3.amazonaws.com/fec.amazin/1000_3.jpg", "https://s3.amazonaws.com/fec.amazin/1000_4.jpg"]
    }
  this.imgHover =  this.imgHover.bind(this);
  this.textEnter = this.textEnter.bind(this);
  this.textLeave = this.textLeave.bind(this);
  
  }

  componentDidMount(){
    console.log(this.props);
    axios.get('https://shrouded-ravine-99591.herokuapp.com/api/images')
    .then((response)=> {this.setState({main: response.data[0].images[0]});this.setState({images: response.data[0].images})})
    .catch((err)=> {console.log(err, 'this is my error')})
  }

  imgHover(img){
    this.setState({main: img});
  }
  textEnter(){
    this.setState({text: "Click image to open expanded view"});
  }
  textLeave(){
    this.setState({text: "Roll over image to zoom in" });
  }

  render(){
    return (
    <>
      <div class="main">
      <div class="col-1">
      {this.state.images.map((img)=> (<div class="thumbnail" onMouseEnter={()=>{this.imgHover(img)}}><img src={img}></img></div>))}
      
    
      </div>
      <div class="col-2">
      <img id="mainimg" src={this.state.main} onMouseEnter={()=>{this.textEnter()}} onMouseLeave={()=>{this.textLeave()}}></img>
      <p>{this.state.text}</p>
      </div>
      
      </div>
      
    </>)
  }

}


const Routing = (props) => (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/:id" component={App} />
    </div>
  </Router>
)

ReactDOM.render(<Routing />, document.getElementById('image'));