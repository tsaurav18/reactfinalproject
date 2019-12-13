import React  from 'react';
import './App.css';
import api from './api';
import PostView from './components/PostView'

import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';



class App extends React.Component {
  constructor(props){
  super(props)
  this.state= {
    title:'',
    content:'',
    results:[],

  }
}
componentDidMount(){
  this.getPosts()
}
async getPosts(){
const _results= await api.getAllPosts()
console.log(_results)
this.setState({results: _results.data})
  
}



handlingChange=(event)=> {
  this.setState({[event.target.name]:event.target.value})
}
handlingSubmit= async (event)=>{
  event.preventDefault()
  let result =await api.createPost({title:this.state.title,content:this.state.content})
  console.log('successfully',result)
  this.setState({title:'',content:''})
  this.getPosts()
}
handlingDelete= async (id)=>{
 await api.deletePost(id)
  this.getPosts()
}
  render(){
  return (
    <div className="App">
      <Container maxWidth="lg">
  <div className="PostingSection">
    <Paper className="PostingPaper">
    <h2>To Do-List</h2>
    <form className="PostingForm"onSubmit={this.handlingSubmit}> 
    
    <TextField
          id="outlined-multiline-flexible"
          label="title"
          name="title"
          multiline
          rowsMax="4"
          margin="normal"
           value={this.state.title}
          onChange={this.handlingChange}
          variant="outlined"
        />
   
    
    <br></br>
        
    <TextField
          id="outlined-multiline-flexible"
          label="content"
          name="content"
          multiline
          rows="6"
          margin="normal"
           value={this.state.content}
          onChange={this.handlingChange}
          variant="outlined"
        />
    


   
    <Button color="secondary" varient="outlined" type="submit">제출하기</Button>
    </form>
    </Paper>
  </div>
  <div className ="ViewSection">
    {
    this.state.results.map((post)=>

    <Card className={'card'}>
    <CardContent>
     
      <Typography>
      <PostView id ={post.id}title={post.title} content={post.content}/>
      </Typography>
    </CardContent>
    <CardActions>
      <Button color="secondary" size="small" onClick={(event)=>this.handlingDelete(post.id)}>delete</Button>
    </CardActions>
  </Card>
)
    
    }

  </div>
  </Container>
    </div>
  );
}
}
export default App;


