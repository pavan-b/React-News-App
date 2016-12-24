import React from 'react';
import axios from 'axios';
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

//update delete comments
//headline-all the saved headlines from the db
//newComment-the updated comment to save
//headlineID-the id of the headline to update or delete
export default class SavedHeadlines extends React.Component {
	constructor () {
		super();
		this.state={
			headline:[],
			newComments:'',
			headlineId:'',			
		}	
		this.isEdit=false			
		}

		componentDidMount(){
			 this.fetchData();
		}

//fetch all the data from the db 
		fetchData=()=>{
			 axios.get('http://localhost:8080/data')
					   .then( (response) =>{	
					   				      
					   this.setState({headline:response.data});
			            });	
		}

//set the state with the new comments on edit
		handleChange = (event) => {
		    this.setState({
		      newComments: event.target.value,
		    });
		  };

//on edit set the previous comments to the state and also the id 
		 update=(comments,id)=>{		 	
		 	this.setState({		 	  
		 	  newComments:comments,
		 	  headlineId:id
		 	});		 	
		 }

//on save, update the db with new comments and reset the state to default value also rerending the view
		 save=()=>{		 	
		 	 axios.put('http://localhost:8080/data/'+this.state.headlineId,{comments:this.state.newComments})
					   .then( (response) =>{		  					   	
					   axios.get('http://localhost:8080/data')
					   .then( (response) =>{
					   this.setState({headline:response.data,headlineId:''});
			            });						   
			            });	
		 }

//on delete, delete the article from the db taking the id passed from the button click
		 delete=(id)=>{
		 	 axios.delete('http://localhost:8080/data/'+id)
					   .then( (response) =>{					   						      
					   if(response.data){					   	
					   	this.fetchData();
					   }
			            });
		 }

//display all the elements from the db
//on edit- hide the edit button and show the text input and the save button
//on save- hide the text input, save button and show the updated description
		showCards = () => {				
			var style = {
        	height: '50%',
        	width: '100%'
            };
			let edit={};
			let show={};			
			let data =this.state.headline;
		  if (data) {		         
		    var singleArticle = data.map((text, index) => {	
		    var temp=(((index+1) % 2)== 0)  ?"row":""; 
		   { if(text._id.toString() === this.state.headlineId.toString() ){	
		   	edit={
				'display':'none'
			};
			show={};
		    }
		    else{
		    	show={
				'display':'none'
			};
			edit={};
		    }}     
		      return ( < div className={temp} >
          < div className="col-md-6 col-sm-12 col-xs-12 col-lg-6" >		        
		        <Card key={index} >		           
		           <CardMedia
		             overlay={<CardTitle title={text.title} subtitle={text.author} />}
		           >
		             <img src={text.urlToImage} />
		           </CardMedia>
		           <CardTitle  subtitle={text.description} />
		           <CardText style={edit}>
		            {(text.comments == null || text.comments == '')?"__" : text.comments}			            	            
		           </CardText>
		           <CardText style={show}>
		            <TextField
		                    id="text-field-controlled"
		                    value={this.state.newComments}
		                    onChange={this.handleChange}
		                    multiLine={true}		                    
		                  />		            	            
		           </CardText>		           		           
		           <CardActions>
		             <RaisedButton  style={edit} label="edit" backgroundColor="#00BCD4"  onClick={()=>this.update(text.comments,text._id)}/>
		              <RaisedButton  style={show} label="save" backgroundColor="#5cb85c"  onClick={this.save}/>
		             <RaisedButton label="delete" secondary={true} onClick={()=>this.delete(text._id)}/>
		           </CardActions>
		         </Card>
		        <br/>
		        < /div> 
		        </div> 	        
		      )
		    })
		    
		  }		  
		  return singleArticle;
		};

	render()
	 {
	 	var container={
			"paddingTop":"110px"
		}	
		return ( < div className="container" style={container}>
		{this.showCards()}
			< /div>
		

		)
	}
}