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
  ('Aaron', 'aaron@aaron.com', 'aaron', 'http://d3adcc0j1hezoq.cloudfront.net/wp-content/uploads/2015/12/anonymous-ISIS-warning.jpg'),
  ('Anonymous', 'anonmymous@anonymous.org', 'anonymous', 'http://d3adcc0j1hezoq.cloudfront.net/wp-content/uploads/2015/12/anonymous-ISIS-warning.jpg'),
  ('John Doe', 'johndoe@johndoe.com', 'johndoe', 'http://d3adcc0j1hezoq.cloudfront.net/wp-content/uploads/2015/12/anonymous-ISIS-warning.jpg')
;


INSERT INTO
  reviews (user_id, album_id, review)
VALUES
  (1, 1, 'This album was great!!!! I could resonate!' ),
  (2, 1, 'Overall, not that bad, could get better.' ),
  (3, 1, 'This album lacked a few things such as theme.' ),
  (1, 2, 'I like the story and lyrics to this album.' ),
  (2, 2, 'Until now, I have no idea why I never listened to it.' ),
  (3, 2, 'Good, MUSIC!' ),
  (1, 3, 'This was okay, for me personally, it needed more intensity.' ),
  (2, 3, 'What, wow, why? More importantly how!' ),
  (3, 3, 'Yeah, it could have been better.' )
;