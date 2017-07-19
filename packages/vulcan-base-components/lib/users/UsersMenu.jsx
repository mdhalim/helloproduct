import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import React, { PropTypes, Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Meteor } from 'meteor/meteor';
import { Dropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Users from 'meteor/vulcan:users';
import { withApollo } from 'react-apollo';

const UsersMenu = ({currentUser, client}) =>
  <div className="users-menu">
    <Dropdown id="user-dropdown">
      <Dropdown.Toggle>
        <Components.UsersAvatar size="small" user={currentUser} link={false} />
        <div className="users-menu-name">{Users.getDisplayName(currentUser)}</div>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <LinkContainer to={`/users/${currentUser.slug}`}>
          <MenuItem className="dropdown-item" eventKey="1"><FormattedMessage id="users.profile"/></MenuItem>
        </LinkContainer>
        <LinkContainer to={`/users/${currentUser.slug}/edit`}>
          <MenuItem className="dropdown-item" eventKey="2"><FormattedMessage id="users.edit_account"/></MenuItem>
        </LinkContainer>
        <MenuItem className="dropdown-item" eventKey="4" onClick={() => Meteor.logout(() => client.resetStore())}><FormattedMessage id="users.log_out"/></MenuItem>
      </Dropdown.Menu>
    </Dropdown>
  </div>


   
  //     failureComponent=<div><p className="posts-new-form-message"><FormattedMessage id="posts.sign_up_or_log_in_first" /></p><Components.AccountsLoginForm /></div>
    
  // const size = props.currentUser ? 'large' : 'small';
  // const button = <Button className="posts-new-button" bsStyle="primary"><Components.Icon name="new"/>SignUp</Button>;
  // return (
  //   <Components.ModalTrigger size={size} title="Hi" component={button}>
  //     {/*<Components. />*/}
  //     {failureComponent}
  //   </Components.ModalTrigger>
  // )  
UsersMenu.propsTypes = {
  currentUser: React.PropTypes.object,
  client: React.PropTypes.object,
};

registerComponent('UsersMenu', UsersMenu, withCurrentUser, withApollo);
