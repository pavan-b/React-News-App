import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

//modal window to collect comments for the title
export default class AddComment extends React.Component {	
  //value-comment, title-headline
	constructor(props){
		super(props);
		this.state = {
      value: '',
      title:''
      
    };	
  this.actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.handleClose.bind(this)}
      />,
      <FlatButton
        label="Save"
        primary={true}        
        onTouchTap={this.toggle}        
      />,
    ];
    this.toggle=this.toggle.bind(this);    
   
}  

//on close or cancel call the changeState of the parent to close the window and pass '' as headline
 handleClose = () => {
    this.props.changeState('');
    this.setState({value:''})
  };

//on save button click close the modal and save the comments for the perticular title
toggle=()=>{	
	this.handleClose();
	this.props.saveComments(this.state.title,this.state.value);	
  //setting the comments to null making it fresh for others
  this.setState({value:''})
}

//change the state.value to store the commnts the user types
handleChange=(event)=> {
    this.setState({value: event.target.value,title:this.props.title});
  }

//display the modal window with the title and comment section
render() {
	this.title=this.props.title;		
    return ( < div >    	
    		<Dialog
    		          title={this.props.title.title}    		          
    		          modal={false}
    		          actions={this.actions}
    		          open={this.props.toggle }
    		          onRequestClose={this.handleClose.bind(this)}    		          
    		        >
    		        <br/>
    		          <TextField
    		                hintText="comments.."
    		                fullWidth={true}
    		                multiLine={true}
    		                value={this.state.value}
    		                onChange={this.handleChange}
    		              />
    		              <br/>     		                
    		        </Dialog>
     < /div>)
  }
	}