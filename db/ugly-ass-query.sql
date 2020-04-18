select conversations.id as conversationID from users
join userConversations on users.id=userconversations.userid
join conversations on userconversations.conversationid=conversations.id
where users.username="alice" or users.username="david" 
group by userconversations.conversationid
having count(*)>1;

select ConversationId from userConversations
where UserId=1 or UserId=2
group by ConversationId
having count(*)>1;