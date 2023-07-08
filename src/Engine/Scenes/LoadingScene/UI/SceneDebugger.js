require("./sceneDebugger.bhtml");
const { Meteor } = require("meteor-blaze-common");

Template.sceneDebugger.onCreated(function onCreated() {

});

Template.sceneDebugger.helpers({
  'sceneName': function(){
    return Template.instance().data.sceneName.get();
  },
  'sceneUUID': () => {
    return Template.instance().data.sceneUUID.get();
  },
  'sceneUUID': () => {
    return Template.instance().data.sceneUUID.get();
  },
  'currentTick': () => {
    return Template.instance().data.currentTick.get();
  }
});