import React from 'react';
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from 'material-ui/Card';
import AddComment from './comments';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';

//article card section and modal window toggle
export default class CardExampleWithAvatar extends React.Component { 
  //state variable openModal-status of the model window and the title- it should display
     constructor(props) {
      super(props);
      this.state = {
      openModal: false,
      title:''
    }    
    this.handleToggle=this.handleToggle.bind(this);
  }

//called upon the save button is called to toggle the modal window for saving the comments
handleToggle(headline)  {  
    this.setState({openModal: !(this.state.openModal),title:headline});
  };

//iterates through all the news articles and returns a card for each article
  showCards = () => {
    var {articles} = this.props.data;   
    if (articles) {
      var style = {
        height: '50%',
        width: '100%'
      };
      var container = {
        height: '100%',
        width: '100%'
      }      
      var singleArticle = articles.map((text, index) => {
        var temp=(((index+1) % 3)== 0)  ?"row":"";        
        return ( < div className={temp} id='article' >
          < div className="col-md-4 col-sm-12 col-xs-12 col-lg-4" >
          < Card key = {index} style = {container} expandable={true} >
          < CardMedia expandable={true} >
          < img style = {style} src = {text.urlToImage}/>
           < /CardMedia> 
           < CardTitle title = {text.title} actAsExpander={true} />
          < CardText expandable={true} >
           {text.description} 
          < /CardText> 
          <CardActions expandable={true}>
                <RaisedButton label="Save" backgroundColor="#00BCD4" onClick={()=> this.handleToggle(text)  } />              
          </CardActions>    
          < /Card> 
          < br / >
          < /div>          
          </div>
        )
      })
      return singleArticle;
    }
  };

//save comments from the modal window to mongodb
saveComments(headline,comments){
  axios.post('http://localhost:8080/data', {
      userId: 'admin',
      author: headline.author,
      title: headline.title,
      description: headline.description,
      url: headline.url,
      urlToImage: headline.urlToImage,
      publishedAt: headline.publishedAt,
      comments: comments
    })
    .then((response)=> {     
  if(!response.data ){
    this.props.toggleSnackbar("Please login to save");
  }else{this.props.toggleSnackbar("Comments saved successfully");}
    })
    .catch(function (error) {
      console.log(error);
    });
}

//upon receiving the values iterate and display each article for each card
  render() {
    return ( < div > {this.showCards()}
     <AddComment toggle={this.state.openModal} changeState={this.handleToggle.bind(this)} title={this.state.title}  saveComments={this.saveComments.bind(this)}/>  < /div>);
  }
}