import { registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import Posts from "meteor/vulcan:posts";

const PostsThumbnail = ({post}) => 
  <div className="posts-thumbnail" href={Posts.getLink(post)} target={Posts.getLinkTarget(post)}>
    <span><img src={Posts.getThumbnailUrl(post)} className="post-thumbnail-container"/></span>
  </div>

PostsThumbnail.displayName = "PostsThumbnail";

registerComponent('PostsThumbnail', PostsThumbnail);