USE ALOHA_DB;
insert into users (email, password, username, userHash)
values 
('alice@bob.com', '$2a$10$vYn00dsYJiFfNYmyfEj6nu9JthHkwhU/BB6CmfvOIVYlaAOqACXaC', 'alice', '9c43fab1e469b31357d6549e44c3ac41'),
('bob@bob.com', '$2a$10$E3qEyS5/ni11fMFzCeWdLeJvyVLA7UXM/L/50wVJDXyeaoPAFtHiS', 'bob', '820d0e4ee14e986a44d33782ca852f51'),
('carol@bob.com', '$2a$10$GiLNPkkFnaGBv9Fz9mIL6ewUUHxu/DV9edj.1zgtncyDfCyyMow8m', 'carol', '0c9bb3db826bd7ff9e08d1e16ffe63ce'),
('david@bob.com', '$2a$10$vUwwjkbV8lh6oEmPWyqef.7izAZNNhHQbQU35/PxJSBCOMTopTFjC', 'david', 'a4d1b6f05c16958e4f31934493aac5ae');
insert into conversations (createdAt, updatedAt)
values
(now(), now()),
(now(), now()), 
(now(), now()),
(now(), now());
insert into userConversations (UserId, ConversationId)
values
(1,1),
(2,1),
(2,2),
(3,2),
(3,3),
(4,3),
(4,4),
(1,4);
insert into messages (content, createdAt, updatedAt, ConversationId, UserId)
values
("Hello, Bob!", now(), now(), 1, 1);