/*
 * 讨论区，参考知乎微博热评榜
 */

import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TopicList from "../component/topiclist";
import Tag from "../component/tag";
import Typography from "@material-ui/core/Typography";
import Navigation from "../component/navigation";
import axios from "axios";
class Topicpage extends Component{
    constructor(props)
    {
        super(props);
        this.state={tags:[],topics:[]};
        this.handletagchange=this.handletagchange.bind(this);
    }
    handletagchange(tags){
        this.setState({tags:tags});

    }
    componentWillMount() {
        axios.get("/all").then(
            function (data){
            this.setState({topics:data});
        }.bind(this)
        )
    }

    render(){
        return(
            <Grid container direction={"row"} spacing={3} >
                <Grid item xs={12} spacing={3} ><Navigation /> </Grid>

                <Grid item xs={1} > </Grid>
                <Grid item xs={6} ><br/> <br/>
                    <Grid item>
                        <Typography variant={"h6"} component={"h6"} align={"left"} >讨论版</Typography>
                    </Grid>
                    <TopicList />
                </Grid>
                <Grid item xs={4} direction={"column"} spacing={3} ><br/> <br/>
                    <Tag select={true} tagchange={this.handletagchange}/>
                    <TopicList topics={this.state.topics}/>
                </Grid>
            </Grid>
        );
    }
}

export default Topicpage;