/*
 * score 未完成
 */

import React, { Component } from 'react';
import {Link} from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {Modal} from "antd";
import Collectform from "./collectform";
import '../css/listitem.css'
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        minWidth: 800,
        width: '100%',
    },
    paper: {
        padding: theme.spacing(3, 2),
        width: 200
    },
    image: {
        height: 120,
        width: 96,
    }
}));

/*
* 需要传入的props（包装成json后可以简化）
* props.name : 条目标题
* props.date : 条目出版/播出日期
* props.author : 条目作者
* props.score : 条目评分
* props.rank : 条目排名
* props.chapter : 条目章节数
*/
class Listitem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {

        var rows=[];
        const item = this.props.ItemList;
        if(item !== undefined)
        {
            for(var i=0; i<item.length; ++i) {
                rows.push(
                    <Paper className={useStyles.root}>
                        <Grid container spacing={2}>
                            <Grid item xs={1}/>
                            <Grid item xs={2}>
                                <br/>
                                <img src="img/3.jpg" alt="暂无图片" className={useStyles.image} height="120px" width="96px"/>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="h4" component="h3">
                                    {item[i].itemname}
                                </Typography>
                                <br/>
                                <Paper className={useStyles.paper}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={4}>
                                            <Typography component="p" align="center">
                                                {item[i].pubTime.split("T")[0]}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography component="p" align="center">
                                                {item[i].mainAuthor}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography component="p" align="center">
                                                {item[i].chapterNum}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Paper>
                                <br/>
                                <Score id={item[i].id}/>
                            </Grid>
                            <Grid item xs={1}/>
                            <Grid item xs={2}>
                                <br/>
                                <Collectform/>
                            </Grid>
                        </Grid>
                    </Paper>

                )
                debugger;
            }
        }

        return(
            <div id={"mainlistitem"} >
                {rows}
            </div>
        );
    }
}

class Score extends Component{
    constructor(props){
        super(props);
        this.state = {data:[], isloaded:false}
    }
    componentWillMount() {
        const _this=this;
        axios.get("http://202.120.40.8:30741/rating/itemid/"+this.props.id)
            .then(function (res) {
                _this.setState({data: res.data, isloaded: true}
                );
            })
            .catch(function (error) {
            })
    }

    render(){
        return(
        <Grid container spacing={2}>
            <Grid item xs={3}>
                <Typography variant="h5" component="h3" align="center">
                    评分
                </Typography>
            </Grid>
            <Grid item xs={3}>
                    <Typography variant="h5" component="h3" align="center">
                        {this.state.data.avgScore}
                    </Typography>
            </Grid>
            <Grid item xs={3}>
                <Typography variant="h5" component="h3" align="center">
                    排名
                </Typography>
            </Grid>
            <Grid item xs={3}>
                    <Typography variant="h5" component="h3" align="center">
                        {this.state.data.rank}
                    </Typography>
            </Grid>
        </Grid>
        );
    }


}

export default Listitem;