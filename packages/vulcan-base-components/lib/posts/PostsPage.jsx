import { Components, registerComponent, withDocument, withCurrentUser, getActions, withMutation } from 'meteor/vulcan:core';
import Posts from 'meteor/vulcan:posts';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormattedMessage } from 'react-intl';

class PostsPage extends Component {
  
  generateTwitterProfilePic(data) {
    console.log(data)
    return 'https://twitter.com/'+data+'/profile_image?size=original '
  }

  generateTwitterlink(data) {
    console.log(data)
    return 'https://twitter.com/'+data
  }
  render() {
    if (this.props.loading) {
      
      return <div className="posts-page"><Components.Loading/></div>
      
    } else if (!this.props.document) {
      
      console.log(`// missing post (_id: ${this.props.documentId})`);
      return <div className="posts-page"><FormattedMessage id="app.404"/></div> 

    } else {
      const post = this.props.document;

      const htmlBody = {__html: post.htmlBody};
      console.log(post.screenShot);

      return (
        <div className="posts-page">
          <Components.HeadTags url={Posts.getPageUrl(post, true)} title={post.title} image={post.thumbnailUrl} description={post.excerpt} />
          <Components.PostsItem post={post} currentUser={this.props.currentUser} />
          <div className="post-maker-list">
            <ul className="post-maker-list-ul">
              <li>
                  <a href={Posts.getPageUrl(post, true)} className="btn btn-primary" style={{
                    'fontSize': '12px',
                    'padding': '5px 15px'
                  }}>GET WEBSITE</a>
              </li>


              <li className="hide-on-small">
                  <span className="maker-headline">Posted By</span>
              </li>
              <li className="hide-on-small">
                
                <Components.UsersAvatar user={post.user} size="small"/>
                   <Components.UsersName user={post.user}/>
                {/* <img src={this.generateTwitterProfilePic(post.Maker)} />
                <a href={this.generateTwitterlink(post.Maker)} >@{post.Maker}</a> */}
              </li>
              
            </ul>
          </div>
          {/*post.htmlBody ? <div className="posts-page-body" dangerouslySetInnerHTML={htmlBody}></div> : null*/}
          <div className="post-screenshot">
            <img src={post.screenShot}></img>
          </div>
          <Components.PostsCommentsThread terms={{postId: post._id, view: 'postComments'}} />

        </div> 
      );
      
    }
  }
  
  // triggered after the component did mount on the client
  async componentDidMount() {
    try {
      
      // destructure the relevant props
      const { 
        // from the parent component, used in withDocument, GraphQL HOC
        documentId,
        // from connect, Redux HOC 
        setViewed, 
        postsViewed, 
        // from withMutation, GraphQL HOC
        increasePostViewCount,
      } = this.props;
      
      // a post id has been found & it's has not been seen yet on this client session
      if (documentId && !postsViewed.includes(documentId)) {
        
        // trigger the asynchronous mutation with postId as an argument
        await increasePostViewCount({postId: documentId});
        
        // once the mutation is done, update the redux store
        setViewed(documentId);
      }
      
    } catch(error) {
      console.log(error); // eslint-disable-line
    }
  }
}

PostsPage.displayName = "PostsPage";

PostsPage.propTypes = {
  documentId: PropTypes.string,
  document: PropTypes.object,
  postsViewed: PropTypes.array,
  setViewed: PropTypes.func,
  increasePostViewCount: PropTypes.func,
}

const queryOptions = {
  collection: Posts,
  queryName: 'postsSingleQuery',
  fragmentName: 'PostsPage',
};

const mutationOptions = {
  name: 'increasePostViewCount',
  args: {postId: 'String'},
};

const mapStateToProps = state => ({ postsViewed: state.postsViewed });
const mapDispatchToProps = dispatch => bindActionCreators(getActions().postsViewed, dispatch);

registerComponent(
  // component name used by Vulcan
  'PostsPage', 
  // React component 
  PostsPage,
  // HOC to give access to the current user
  withCurrentUser, 
  // HOC to load the data of the document, based on queryOptions & a documentId props
  [withDocument, queryOptions], 
  // HOC to provide a single mutation, based on mutationOptions
  withMutation(mutationOptions), 
  // HOC to give access to the redux store & related actions
  connect(mapStateToProps, mapDispatchToProps)
);
