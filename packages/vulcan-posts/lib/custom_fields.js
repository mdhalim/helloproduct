import { getComponent, getSetting } from 'meteor/vulcan:lib';
import Users from "meteor/vulcan:users";
import Posts from 'meteor/vulcan:posts';

Users.addField([
  /**
    Count of the user's posts
  */
  {
    fieldName: "postCount",
    fieldSchema: {
      type: Number,
      optional: true,
      defaultValue: 0,
      viewableBy: ['guests'],
    }
  }
]);



