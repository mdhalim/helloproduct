import { Components, registerComponent, withDocument, withCurrentUser } from 'meteor/vulcan:core';
import React, { PropTypes, Component } from 'react';
import { FormattedMessage } from 'react-intl';
import Users from 'meteor/vulcan:users';
import { Link } from 'react-router';

const UsersProfile = (props) => {
  if (props.loading) {

    return <div className="page users-profile"><Components.Loading/></div>

  } else if (!props.document) {

    console.log(`// missing user (_id/slug: ${props.documentId || props.slug})`);
    return <div className="page users-profile"><FormattedMessage id="app.404"/></div> 
  
  } else {

    const user = props.document;

    const terms = {view: "userPosts", userId: user._id};
    console.log(user);
    return (
      <div className="page users-profile">
        <Components.HeadTags url={Users.getProfileUrl(user, true)} title={Users.getDisplayName(user)} />
        <h2 className="page-title username-accnt-page">{Users.getDisplayName(user)}</h2>
        <small><Components.ShowIf check={Users.options.mutations.edit.check} document={user}>
            <Link to={Users.getEditUrl(user)}><FormattedMessage id="users.edit_account"/></Link>
          </Components.ShowIf></small>
        {user.htmlBio ? <div dangerouslySetInnerHTML={{__html: user.htmlBio}}></div> : null }
        <ul className="no-list-style margin-bottom-3 social-links">
          {user.twitterUsername ? <li><a href={"http://twitter.com/" + user.twitterUsername}>@{user.twitterUsername}</a></li> : null }
          {user.FacebookProfile ? <li><i class="fa fa-facebook" aria-hidden="true"></i><a href={user.FacebookProfile}>FACEBOOK</a></li> : null }
          {user.website ? <li><a href={user.website}>{user.website}</a></li> : null }
          
        </ul>
        <h3><FormattedMessage id="users.posts"/></h3>
        <Components.PostsList terms={terms} showHeader={false} />
      </div>
    )
  }
}

UsersProfile.propTypes = {
  // document: React.PropTypes.object.isRequired,
}

UsersProfile.displayName = "UsersProfile";

const options = {
  collection: Users,
  queryName: 'usersSingleQuery',
  fragmentName: 'UsersProfile',
};

registerComponent('UsersProfile', UsersProfile, withCurrentUser, [withDocument, options]);
