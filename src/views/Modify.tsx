import { useForm } from "../hooks/formHooks";
import { useLocation, useNavigate } from "react-router-dom";
import { MediaItemWithOwner } from "../types/DBTypes";
import { useRecipe } from "../hooks/apiHooks";

const Modify = () => {
  const {putRecipe} = useRecipe();
  const navigate = useNavigate();
  const {state} = useLocation();
  const item: MediaItemWithOwner = state.item;

  console.log('modify view');
  console.log(item);
  const initValues = {
    title: '',
    description: '',
    serving: '',
    cook_time: '',
    ingredients: '',
    instruction: ''
  };
  const doModify = async () => {
    const token = localStorage.getItem('token');
    if (!token ) {
      return;
    }
    try {
      const modifyResponse = await putRecipe(item.media_id, token, inputs);
      console.log(modifyResponse);
      alert(modifyResponse.message);
      //redirect to Home
      navigate('/');
    } catch (e) {
        console.log((e as Error).message);
    }
  }


  const {handleSubmit, handleInputChange, inputs} = useForm(doModify, initValues);

  return (
    <div className="flex justify-center justify-items-center content-center">
      {/* <h2 className="text-3xl text-center font-serif font-bold m-4">Upload</h2> */}
      <form onSubmit={handleSubmit} className=" w-full flex flex-col p-2 border rounded bg-vanilla max-w-screen-md sm:p-6">
        <div className=" flex flex-col mb-3">
          <label className=" text-xl font-medium" htmlFor="title_edit">Title</label>
          <input
            className="border border-slate-700 p-2 rounded"
            name="title"
            defaultValue={item.title || ''}
            type="text"
            id="title_edit"
            onChange={handleInputChange}
          />
        </div>
        <div className=" flex flex-col mb-3">
          <label className=" text-xl font-medium" htmlFor="description_edit">Description</label>
          <input
            className="border border-slate-700 p-2 rounded"
            name="description"
            defaultValue={item.description || ''}
            id="description_edit"
            onChange={handleInputChange}
          ></input>
        </div>
        <div className=" flex flex-col mb-3">
          <label htmlFor="serving_edit" className=" text-xl font-medium">Serving</label>
          <input
            className="border border-slate-700 p-2 rounded"
            name="serving"
            defaultValue={item.serving || ''}
            type="text"
            id="serving_edit"
            placeholder="4 annosta"
            onChange={handleInputChange}
          />
        </div>
        <div className=" flex flex-col mb-3">
          <label htmlFor="cookTime_edit" className=" text-xl font-medium">Cook time</label>
          <input
            className="border border-slate-700 p-2 rounded"
            name="cookTime"
            defaultValue={item.cook_time || ''}
            type="text"
            id="cookTime_edit"
            placeholder="60 min"
            onChange={handleInputChange}
          />
        </div>
        <div className=" flex flex-col mb-3">
          <label htmlFor="ingredients_edit" className=" text-xl font-medium">Ingredients</label>
          <textarea
            className="border border-slate-700 p-2 rounded"
            name="ingredients"
            defaultValue={item.ingredients || ''}
            rows={5}
            id="ingredients_edit"
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className=" flex flex-col mb-3">
          <label htmlFor="instruction_edit" className=" text-xl font-medium">Instruction</label>
          <textarea
            className="border border-slate-700 p-2 rounded"
            name="instruction"
            defaultValue={item.instruction || ''}
            rows={10}
            id="instruction_edit"
            onChange={handleInputChange}
          ></textarea>
        </div>

        <button
          className=" w-28 h-12 my-2 rounded-md bg-orange-wheel p-3 self-center hover:bg-light-orange disabled:bg-slate-300"
          type="submit"

        >
          Päivitä
        </button>
      </form>
    </div>
  );
}

export default Modify;
