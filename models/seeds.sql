INSERT INTO
  albums (title, artist)
VALUES
  ('Malibu', 'Anderson .Paak'),
  ('A Seat at the Table', 'Solange Knowles'),
  ('Melodrama', 'Lorde'),
  ('In Rainbows', 'Radiohead')
;

INSERT INTO
  users (name, email, password)
VALUES
  ('user1', 'user1@user1.com', 'user1pass')
;


INSERT INTO
  reviews (user_id, album_id, review)
VALUES
  (1, 1, 'Sample Review: This album was great!!!! I could resonate!' )
;