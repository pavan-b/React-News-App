import React from 'react';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {   hashHistory } from 'react-router';
import axios from 'axios';

export default class Login extends React.Component{
	constructor(){
    super();
    this.state={     
      openDialog:true,
      id:'',
      pass:'',
      errId:'',
      errPass:'',
      msg:''
    }    
  }

  	drawDialog = ()=>{
  	  this.setState({openDialog: !(this.state.openDialog)});
  	  hashHistory.push('/');
  	}

  	login=()=>{  	
  	if((this.state.id == '') || (this.state.id == null)){
  		this.setState({errId:"This field is required"});
  		return;

  	}
  	else if((this.state.pass == '') || (this.state.pass == null))	{
  		this.setState({errPass:"This field is required"});
  		return;
  	}
  	  		axios.post('http://localhost:8080/users', {username :this.state.id ,password : this.state.pass})
  		  .then((response)=> {     		    
  		    console.log(response);
  		    if(response.data != false){
  		    this.setState({errId:"",errPass:"",msg:"Login successful !!",openDialog: false});
  		    hashHistory.replace("/");		     

  		}else{
  			this.setState({errId:"",errPass:"",msg:"Login failed !!"});
  		}
  		  })
  		}
  	

  	username=(event)=>{
  		if((event.target.value == '') || (event.target.value == null)){
  		this.setState({errId:"This field is required"});
  		return;
  	}
  		this.setState({id:event.target.value,errId:""})
  	}

  	password=(event)=>{
  		if((event.target.value == '') || (event.target.value == null)){
  		this.setState({errPass:"This field is required"});
  		return;
  	}
  		this.setState({pass:event.target.value,errPass:""})
  	}  	

	render(){		
		return(
				<div>
				<Dialog
				         title="Login"                     
				         modal={false}
				         open={this.state.openDialog}
				         onRequestClose={this.drawDialog}
				       >
				        <TextField                 
				              floatingLabelText="user id"
				              onChange={this.username}	
				             errorText={this.state.errId}		              
				            />
				            <br/>
				            <br/>
				            <TextField
				              floatingLabelText="password"
				              type="password"
				              onChange={this.password}
				             errorText={this.state.errPass}
				            />
				            <br/>
				            <span>{this.state.msg}</span>
				            <br/>
				            <RaisedButton
				              label="login"
				              backgroundColor="#00BCD4"
				              onTouchTap={this.login}
				            />
				       </Dialog>
				</div>
			);
	}
}