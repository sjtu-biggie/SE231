import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TopicList from "../component/topiclist";
import Tags from "../component/tag";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import Addtopic from "../component/addtopic";


class Topicpage extends Component{

    constructor(props)
    {
        super(props);
        this.state={tags:[],topics:[]};
        this.handletagchange=this.handletagchange.bind(this);
        this.handleSearch=this.handleSearch.bind(this);
    }

    handleSearch(value){
        this.setState({search:value});
    }

    handletagchange(tags){
        this.setState({tags:tags});

    }
    componentWillMount() {
        axios.get("http://202.120.40.8:30741/topic/all").then(
            function (response){

            this.setState({topics:response.data});
        }.bind(this)
        )
    }

    render(){
        return(
            <Grid container direction={"row"} spacing={4} >
                <Grid item xs={2} />
                    <br/>
                <Grid item xs={8} >
                    <Typography variant={"h6"} component={"h6"} align={"left"} >讨论版</Typography>
                    <Grid container spacing={0}>
                    <TopicList  search={this.state.search} topics={this.state.topics}/>
                    </Grid>
                </Grid>
                <Grid item xs={2}><Addtopic /></Grid>
            </Grid>
        );
    }
}

export default Topicpage;

            /*
                                <Tags select={true} tagchange={this.handletagchange} tags={["热血","王道","搞怪","不高兴","没头脑"]} /></Grid>

             */