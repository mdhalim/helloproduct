import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { PropTypes, Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Dropdown } from 'react-bootstrap';
import { STATES } from 'meteor/vulcan:accounts';
import { Button } from 'react-bootstrap';

const UsersAccountMenu = ({state}) =>
{  

      failureComponent=<div><p className="posts-new-form-message"><FormattedMessage id="posts.sign_up_or_log_in_first" /></p><Components.AccountsLoginForm /></div>
   
   
  //const size = props.currentUser ? 'large' : 'small';
  const button = <a><FormattedMessage id="users.sign_up_log_in"/></a>;
  return (
    <Components.ModalTrigger size="small"  component={button}>
      {/*<Components. />*/}
      {failureComponent}
    </Components.ModalTrigger>
  )

  // <Dropdown id="accounts-dropdown" className="users-account-menu">
  //   <Dropdown.Toggle>
  //     <Components.Icon name="user"/>
  //     <FormattedMessage id="users.sign_up_log_in"/>
  //   </Dropdown.Toggle>
  //   <Dropdown.Menu>
  //     <Components.AccountsLoginForm formState={state? STATES[state] : STATES.SIGN_UP} />
  //   </Dropdown.Menu>
  // </Dropdown>
}
UsersAccountMenu.displayName = "UsersAccountMenu";

registerComponent('UsersAccountMenu', UsersAccountMenu);




//const PostsNewButton = (props, context) => {
   