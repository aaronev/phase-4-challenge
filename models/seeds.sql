INSERT INTO
  albums (title, artist)
VALUES
  ('Malibu', 'Anderson .Paak'),
  ('A Seat at the Table', 'Solange Knowles'),
  ('Melodrama', 'Lorde'),
  ('In Rainbows', 'Radiohead')
;

INSERT INTO
  users (name, email, password, image)
VALUES
  ('user1', 'user1@user1.com', 'user1pass', 'http://d3adcc0j1hezoq.cloudfront.net/wp-content/uploads/2015/12/anonymous-ISIS-warning.jpg')
;


INSERT INTO
  reviews (user_id, album_id, review)
VALUES
  (1, 1, 'Sample Review: This album was great!!!! I could resonate!' )
;