import RecipeRow from "../components/mediaRow";
import { RecipeItem } from "../types/DBTypes";

const Home = () => {
  const recipeArray: RecipeItem[] = [
    {
      recipe_id: 1,
      user_id: 2,
      filename: "http://localhost:3002/uploads/sunset.jpg",
      filesize: 1024,
      media_type: "image/jpeg",
      title: "Tomaatti keitto",
      description: "Maukas ja kevyt tomaattikeitto on todella helppo valmistaa. Keitto sopii hyvin myös alkuruoaksi",
      serving: 4,
      cook_time: "30 - 60 minuuttia",
      ingredients: "\n2 (150 g) sipulia\n2 valkosipulinkynttä\n1 rkl Pirkka ekstra-neitsytoliiviöljyä\n2 tlk (à 400 g/240 g) K-Menu kuorittuja tomaatteja tomaattimehussa\nn. 5 dl vettä\n2 rkl Pirkka tomaattisosetta\n1 tl suolaa\n1 tl basilikaa\nripaus mustapippuria\n1 rkl Pirkka tummaa balsamietikkakastiketta\n1 dl tuoretta basilikaa hienonnettuna",
      instruction: "1 Kuori ja hienonna sipulit ja valkosipulinkynnet. 2\nKuullota sipuleita öljyssä kattilassa. 3\nLisää kattilaan tomaatit liemineen. Huuhtele tölkki vedellä ja lisää vesi kattilaan (noin 5 dl). 4\nMausta keitto suolalla, pippurilla ja basilikalla. Sekoita joukkoon tomaattipyree ja anna keiton hautua miedolla lämmöllä kannen alla noin 30 minuuttia. 5\nSoseuta keitto sauvasekoittimella. Sekoita keittoon balsamietikkakastike ja tuore basilika. Voit ripotella osan basilikasta keiton pinnalle. Tarjoa keiton kanssa tuoretta leipää.",
      created_at: "2024-01-22T21:05:10.000Z",
      thumbnail: "http://localhost:3002/uploads/sunset.jpg-thumb.png"
    },
    {
      recipe_id: 4,
      user_id: 5,
      filename: "http://localhost:3002/uploads/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWxlbmFtZSI6ImUxMmE0YmZmNjU1ZmY4NzZlNjYyODVmNDdiYzUyZTE4IiwidXNlcl9pZCI6NSwiaWF0IjoxNzA3NTQxNTMzfQ.tAci9FieN1aVZwdWGW_7i0qVfrU5PxQO-zQ-bRi1dzI.jpeg",
      filesize: 270106,
      media_type: "image/jpeg",
      title: "Nopea pasta bolognese",
      description: "Nopea pasta bolognese",
      serving: 4,
      cook_time: "25 min",
      ingredients: "400 g naudan jauhelihaa, 1 sipuli hienonnettuna, 1 porkkana kuutioituna, 1 prk (3 dl) Valio kermainen tomaatti-yrtit kastiketta, ¾ tl suolaa",
      instruction: "- Paista jauheliha sipulin ja porkkanan kanssa pannulla. Käytä tarvittaessa öljyä paistamiseen. - Lisää pannulle kastike ja mausta suolalla. Kuumenna. - Valmista pasta pakkauksen ohjeen mukaan. Tarjoile pastaa bolognesekastikkeen kanssa.",
      created_at: "2024-02-10T05:08:57.000Z",
      thumbnail: "http://localhost:3002/uploads/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWxlbmFtZSI6ImUxMmE0YmZmNjU1ZmY4NzZlNjYyODVmNDdiYzUyZTE4IiwidXNlcl9pZCI6NSwiaWF0IjoxNzA3NTQxNTMzfQ.tAci9FieN1aVZwdWGW_7i0qVfrU5PxQO-zQ-bRi1dzI.jpeg-thumb.png"
    },
    {
      recipe_id: 5,
      user_id: 5,
      filename: "http://localhost:3002/uploads/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWxlbmFtZSI6ImUxMmE0YmZmNjU1ZmY4NzZlNjYyODVmNDdiYzUyZTE4IiwidXNlcl9pZCI6NSwiaWF0IjoxNzA3NTQxNTMzfQ.tAci9FieN1aVZwdWGW_7i0qVfrU5PxQO-zQ-bRi1dzI.jpeg",
      filesize: 270106,
      media_type: "image/jpeg",
      title: "Nopea pasta bolognese",
      description: "Nopea pasta bolognese",
      serving: 4,
      cook_time: "25 min",
      ingredients: "400 g naudan jauhelihaa, 1 sipuli hienonnettuna, 1 porkkana kuutioituna, 1 prk (3 dl) Valio kermainen tomaatti-yrtit kastiketta, ¾ tl suolaa",
      instruction: "- Paista jauheliha sipulin ja porkkanan kanssa pannulla. Käytä tarvittaessa öljyä paistamiseen. - Lisää pannulle kastike ja mausta suolalla. Kuumenna. - Valmista pasta pakkauksen ohjeen mukaan. Tarjoile pastaa bolognesekastikkeen kanssa.",
      created_at: "2024-02-10T05:09:59.000Z",
      thumbnail: "http://localhost:3002/uploads/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWxlbmFtZSI6ImUxMmE0YmZmNjU1ZmY4NzZlNjYyODVmNDdiYzUyZTE4IiwidXNlcl9pZCI6NSwiaWF0IjoxNzA3NTQxNTMzfQ.tAci9FieN1aVZwdWGW_7i0qVfrU5PxQO-zQ-bRi1dzI.jpeg-thumb.png"
    }
  ]
  return (
    <>
      {recipeArray.map((item) =>
        <RecipeRow key={item.recipe_id} item={item}/>
      )}

    </>
  );
};

export default Home;
