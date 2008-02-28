var CustumEventPublishSubscribe = Class.create();


CustumEventPublishSubscribe.prototype.initialize=function(debug)
{
  this.debug = debug;
  this.topics = Array();
};

//subscribe to a topic, named topicName.
//if the topic does not exist, create it.
CustumEventPublishSubscribe.prototype.subscribe=function(topicName,callbackFunction)
{
  if(this.topics[topicName] == null)
    this.topics[topicName] = Array();
  
  subscribers = this.topics[topicName];
    
  subscribers[this.topics[topicName].length]=callbackFunction;
};


CustumEventPublishSubscribe.prototype.publish=function(topicName,args)
{
  subscribers = this.topics[topicName];
  if(subscribers == null)
  {
    if(this.debug)
      alert('topic '+topicName+' is not known');
    return false;
  }

  for(var i=0,count=subscribers.length;i<count;i++)
    subscribers[i](args);

  return true;
};