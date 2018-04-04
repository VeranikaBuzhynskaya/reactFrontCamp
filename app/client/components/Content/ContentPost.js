import React from 'react';
import Post from '../Post/Post';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {getPosts} from "../../actions/actions";
import styles from'./content.css';
 

class ContentPost extends React.Component{

    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.requestPosts();
    }

    requestPosts(){
        this.props.fetchPosts();
    }

    sortPostsBy (sortBy, posts){
        if(sortBy === "releaseDate") {
            posts.sort(function (a, b) {
                const itemA = a.releaseDate || '0';
                const itemB = b.releaseDate || '0';
                return itemB.replace(/-/g, '')
                    - itemA.replace(/-/g, '');
            });
        }else {
            posts.sort(function (a, b) {
                return a.author.localeCompare(b.author);
            });
        }
        return posts;
    }

    render(){
        console.log(this.props.state);
        let posts = this.sortPostsBy(this.props.sortBy, this.props.posts);
        return (
            <div className="content">
                {
                    posts.map(p => (
                        <Post info={p} key={p.id} />
                    ))
                }
            </div>
        );
    }
}

const mapStateToProps = function(store) {
    return {
        posts: store.storePosts.posts,
        sortBy: store.storePosts.sortBy, 
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
      fetchPosts: () => {
          dispatch(getPosts())
      }
  };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ContentPost));