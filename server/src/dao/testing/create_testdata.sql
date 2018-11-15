
INSERT INTO kategori (kategori) VALUES
    ('Annet'), ('IT'), ('Samfunn'),('Sport'),('Økonomi')

INSERT INTO sak (aktiv, bilde, bildetekst, innhold, kategori, overskrift, tidspunkt, viktighet) VALUES
(1, 'www.bilde1.no.jpg', 'bidletekst1', 'innhold1', 'sport', 'overksrift1', 'tidspunkt1', 1),
(1, 'www.bilde2.no.jpg', 'bidletekst2', 'innhold2', 'økonomi', 'overksrift2', 'tidspunkt2', 1),
(0, 'www.bilde3.no.jpg', 'bidletekst3', 'innhold3', 'annet', 'overksrift3', 'tidspunkt3', 2);

INSERT INTO sak_kommentar_bruker (brukernavn, kommentar, sak_id) VALUES
   ('ole', 'kommentar', 1),
   ('per', 'kommentar', 1),
   ('espen', 'kommentar', 1);


INSERT INTO sak_rating(rating, sak_id) VALUES
   (1, 1),
   (-1, 1),
   (1, 1);