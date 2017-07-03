import Users from 'meteor/vulcan:users';
import { getComponent, getSetting } from 'meteor/vulcan:lib';
import Posts from 'meteor/vulcan:posts';

Users.avatar.setOptions({
  "gravatarDefault": "mm",
  "defaultImageUrl": "http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&f=y"
});







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




Posts.addField({
  fieldName: 'screenShot',
  fieldSchema: {
    type: String,
    optional: true,
    control: getComponent('Upload'),
    insertableBy: ['members'],
    editableBy: ['members'],
    viewableBy: ['guests'],
    form: {
      options: {
        preset: getSetting('cloudinaryPresets').posts // this setting refers to the transformation you want to apply to the image
      },
    }
  }
});