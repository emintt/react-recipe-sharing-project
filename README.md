- [Linkki sovellukseen](http://10.120.32.50)
- [Linkki recipe-apiin](http://10.120.32.50/media-api/api/v1)
- [Linkki auth-apiin](http://10.120.32.50/auth-api/api/v1)
- [Linkki upload-apiin](http://10.120.32.50/upload-api/api/v1)
- [linkki API-dokumentaatioon](https://users.metropolia.fi/~thitng/recipe-app-docs/index.html)

## Sovelluksen käyttöliittymä

![Home page](screenshots/home.png)
![Detail page](screenshots/single-1.png)
![Detail page](screenshots/single-2.png)

## Tietokannan kuvaus

![Tietokannan kuvaus](screenshots/tietokannan-kuvaus.png)

## Toiminnallisuudet

- Rekisteröityminen
  ![Register](screenshots/register.png)

- Kijautuminen ja linkit Rekisteröitymiselle
  ![Login](screenshots/login.png)

- Kirjautuminen ulos
  ![Profile](screenshots/profiili.png)

- Reseptin luominen
  ![Profile](screenshots/create.png)

- Suojatut reitit
  ![Route](screenshots/protected-route.png)

- Tykkääminen kotisivulla ja reseptin tietosivulla

  - Tykkäysten määrä
  - Tykkää/poista tykkäys vain kirjautuneille
  - Tykättyjen listan näyttäminen kirjautuneille
    ![Like](screenshots/like.png)
    ![Like](screenshots/like2.png)

- Kommentti

  - Näyttää kaikki kommentit
  - Tee kommenttia vain kirjautuneille
  - Poista oman kommentti
  - Päivitä oman kommentti
  - Toggle muokkauslomake
    ![Comment](screenshots/comment-1.png)
    ![Comment](screenshots/comment-2.png)

- 4 eniten kommentoitua reseptiä
  ![MostCommented](screenshots/mostcommented.png)

- Päivitä receptiä
  ![Modify](screenshots/modify.png)

- Poista recepti
  ![Delete](screenshots/delete.png)

## Bugit

- Kun deletoidaan recepti Home sivulla, vaati sivun päivitämistä, että näe muutokset.
- Kun tykkätään receptistä esim. kommentoiduimmista reseptista osista, tykkäys näe vain siinä osassa. Sen pitää myös päivittää sivu.
  ![Like](screenshots/like3.png)
- Mitä voisi olla ratkaisu siihen? Kiitos!

## Referenssit

https://github.com/ilkkamtk/hybridisovellukset
https://github.com/mattpe/hybrid-react-example24
