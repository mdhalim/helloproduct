import { Components, registerComponent, ModalTrigger } from 'meteor/vulcan:core';
import React, { PropTypes, Component } from 'react';
import { FormattedMessage, FormattedRelative } from 'react-intl';
import { Link } from 'react-router';
import Posts from "meteor/vulcan:posts";
// const noThumbnail = () =>
//       <div class="posts-thumbnail" href="http://localhost:3000/out?url=http%3A%2F%2Fgluelabs.co" target="_blank">
//         <span>
//           <img src="https://ph-files.imgix.net/1f867e6f-8643-4316-b17d-6e2d63229a60?auto=format&amp;auto=compress&amp;codec=mozjpeg&amp;cs=strip&amp;w=80&amp;h=80&amp;fit=crop&amp;dpr=2" />
//         </span>
//       </div>




class noThumbnailBlock extends Component {
  render() {
    console.log("nothumls")
    render (
      <div class="posts-thumbnail" href="http://localhost:3000/out?url=http%3A%2F%2Fgluelabs.co" target="_blank">
        <span>
          <img className="post-thumbnail-container" src="https://ph-files.imgix.net/1f867e6f-8643-4316-b17d-6e2d63229a60?auto=format&amp;auto=compress&amp;codec=mozjpeg&amp;cs=strip&amp;w=80&amp;h=80&amp;fit=crop&amp;dpr=2" />
        </span>
      </div>

    )
  }
}


class PostsItem extends Component {

  generateTwitterProfilePic(data) {
    console.log(data)
    return 'https://twitter.com/'+data+'/profile_image?size=original '
  }

  generateTwitterlink(data) {
    console.log(data)
    return 'https://twitter.com/'+data
  }



  renderCategories() {
    return this.props.post.categories && this.props.post.categories.length > 0 ? <Components.PostsCategories post={this.props.post} /> : "";
  }

  renderCommenters() {
    return this.props.post.commenters && this.props.post.commenters.length > 0 ? <Components.PostsCommenters post={this.props.post}/> : "";
  }

  renderActions() {
    return (
      <div className="posts-actions">
        <ModalTrigger title="Edit Post" component={<a className="posts-action-edit"><FormattedMessage id="posts.edit"/></a>}>
          <Components.PostsEditForm post={this.props.post} />
        </ModalTrigger>
      </div>
    )
  }
  
  render() {

    // <Components.UsersAvatar user={post.user} size="small"/>
    //               <Components.UsersName user={post.user}/>

    const {post} = this.props;

    let postClass = "posts-item";
    if (post.sticky) postClass += " posts-sticky";

    return (

      <div className="post-init">
        <div className="post-item-buttons">
          <div className="posts-item-vote">
            <Components.Vote collection={Posts} document={post} currentUser={this.props.currentUser}/>
          </div>
        </div>

        <div className="post-item-meta-container">
          <div className="posts-item-meta">
                {post.user? <div className="posts-item-user " style={{marginRight: '10px'}}>
                  <img style={{
                        'width': '20px',
                        'height': '20px',
                        'border-radius': '10px',
                        'margin-right': '10px',
                  }}src={this.generateTwitterProfilePic(post.Maker)} />
                  <a href={this.generateTwitterlink(post.Maker)} >@{post.Maker}</a>
                  
                  </div> : null}
                {/*<div className="posts-item-date">{post.postedAt ? <FormattedRelative value={post.postedAt}/> : <FormattedMessage id="posts.dateNotDefined"/>}</div>*/}
                <div className="posts-item-comments">
                  <div>
                    <FormattedMessage id="comments.count" values={{count: post.commentCount}}/>
                  </div>
                </div>
                <Components.SocialButton type="twitter" post={post} className="post-item-share-button--twitter"/>
                <Components.SocialButton type="facebook" post={post} className="post-item-share-button--facebook"/>
                
                {this.props.currentUser && this.props.currentUser.isAdmin ? <Components.PostsStats post={post} /> : null}
                {Posts.options.mutations.edit.check(this.props.currentUser, post) ? this.renderActions() : null}
              
          </div>
        </div>




        


      {/*this a div here*/}
        <Link to={Posts.getPageUrl(post)} className={postClass}>

          {post.thumbnailUrl ? <Components.PostsThumbnail post={post}/> : <noThumbnailBlock />}

          <div className="posts-item-content">

            <h3 className="posts-item-title">
              <div className="posts-item-title-link" >
                {post.title}
              </div>
              {this.renderCategories()}
            </h3>

            <span className="post-item-description">
              {post.description}
            </span>
            

          </div>
        

          {this.renderCommenters()}
       
        </Link>


        <div className="post-item-meta-container--sticky">
          <div className="posts-item-meta">
                {post.user? <div className="posts-item-user " style={{marginRight: '10px'}}>
                  <img style={{
                        'width': '20px',
                        'height': '20px',
                        'border-radius': '10px',
                        'margin-right': '10px',
                  }}src={this.generateTwitterProfilePic(post.Maker)} />
                  <a href={this.generateTwitterlink(post.Maker)} >@{post.Maker}</a>
                  
                  </div> : null}
                {/*<div className="posts-item-date">{post.postedAt ? <FormattedRelative value={post.postedAt}/> : <FormattedMessage id="posts.dateNotDefined"/>}</div>*/}
                <div className="posts-item-comments">
                  <div>
                    <FormattedMessage id="comments.count" values={{count: post.commentCount}}/>
                  </div>
                </div>
                <div>
                <Components.SocialButton type="twitter" post={post} className="post-item-share-button--twitter"/>
                <Components.SocialButton type="facebook" post={post} className="post-item-share-button--facebook"/>
                </div>
                {this.props.currentUser && this.props.currentUser.isAdmin ? <Components.PostsStats post={post} /> : null}
                {Posts.options.mutations.edit.check(this.props.currentUser, post) ? this.renderActions() : null}
              
          </div>
        </div>

        
      </div>
    )
  }
}

PostsItem.propTypes = {
  currentUser: React.PropTypes.object,
  post: React.PropTypes.object.isRequired,
  terms: React.PropTypes.object,
};

registerComponent('PostsItem', PostsItem);
