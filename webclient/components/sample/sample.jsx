import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import AutoComplete from 'material-ui/AutoComplete';
import CardExampleWithAvatar from '../../components/sample/article';
import Snackbar from 'material-ui/Snackbar';
import axios from 'axios';

//news selection and data transfer to cards and also toggle snackbar on data save
export default class Sample extends React.Component {
	constructor (props) {
		super(props);
		this.state = {		
			article:'',
			showSnackbar:false,
			snackMessage:''			
		}		
		this.newsSources= [];	
		this.newsSourcesId=[];		
	}

//Before component loads fetch all the sources and store it in the respective arrays
componentWillMount(){	
 axios.get('https://newsapi.org/v1/sources?language=en')
		   .then( (response) =>{	   
		   	let {sources} =response.data;
		   	sources.forEach((data)=>{
		   		this.newsSources.push(data.name);
		   		this.newsSourcesId.push(data.id);
		   	});		   	
            });		   
}

//upon the user selecting the news source hit the news api to fetch the news articles and set that to the state variable
whichNews(newsProvider,index){	
 axios.get('https://newsapi.org/v1/articles?source='+this.newsSourcesId[index]+'&apiKey=2a467d6458ad46a8bc45c877d351ae68')
		   .then( (response) =>{	   
		   	this.setState({
                    article: response.data,                   
                });
            });	
}

//toggle snackbar to show that data has been saved
toggleSnackbar=(data)=>{
	this.setState({
	                showSnackbar: !(this.state.showSnackbar) ,snackMessage:data                  
	                });
}

render () {	
//show the autocomplete component and show the cards sending the article data as props
const style={
	"paddingLeft":"1%",
	"paddingBottom":"2%"
}
const container={
	"paddingTop":"70px"
}
	return (			
		<div className="container" style={container}>		
			<AutoComplete
			      floatingLabelText="news from"
			      filter={AutoComplete.caseInsensitiveFilter}
			      dataSource={this.newsSources}
			      maxSearchResults={5}
			      onNewRequest={this.whichNews.bind(this)}
			      style={style}
			    />				        		
			<CardExampleWithAvatar  data={this.state.article} toggleSnackbar={this.toggleSnackbar.bind(this)} />
			<br/>
			<Snackbar
			          open={this.state.showSnackbar}
			          message={this.state.snackMessage}
			          autoHideDuration={2000}
			          action="done"
			          onRequestClose={this.toggleSnackbar}
			        />
		</div>
	);
}
}//end of class
