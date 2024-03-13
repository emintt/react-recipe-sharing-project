import { useState } from "react";
import { useForm } from "../hooks/formHooks";
import { useFile, useRecipe } from "../hooks/apiHooks";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [file, setFile] = useState<File | null>(null);
  const {postFile} = useFile();
  const {postRecipe} = useRecipe();
  const navigate = useNavigate();


  const initValues = {
    title: '',
    description: '',
    serving: '',
    cook_time: '',
    ingredients: '',
    instruction: ''
  };
  const doCreate = async () => {
    const token = localStorage.getItem('token');
    if (!token || !file) {
      return;
    }
    try {
      const fileResult = await postFile(file, token);
      const recipeResult = await postRecipe(fileResult, inputs, token);
      alert(recipeResult.message);
      //redirect to Home
      navigate('/');
    } catch (e) {
        console.log((e as Error).message);
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      console.log(e.target.files[0]);
      setFile(e.target.files[0]);
    }
  };
  const {handleSubmit, handleInputChange, inputs} = useForm(doCreate, initValues);

  return (
    <div className="flex justify-center justify-items-center content-center">
      {/* <h2 className="text-3xl text-center font-serif font-bold m-4">Upload</h2> */}
      <form onSubmit={handleSubmit} className=" w-full flex flex-col p-2 border rounded bg-vanilla max-w-screen-md sm:p-6">
        <div className=" flex flex-col mb-3">
          <label className=" text-xl font-medium" htmlFor="title">Title</label>
          <input
            className="border border-slate-700 p-2 rounded"
            name="title"
            type="text"
            id="title"
            onChange={handleInputChange}
          />
        </div>
        <div className=" flex flex-col mb-3">
          <label className=" text-xl font-medium" htmlFor="description">Description</label>
          <input
            className="border border-slate-700 p-2 rounded"
            name="description"
            id="description"
            onChange={handleInputChange}
          ></input>
        </div>
        <div className=" flex flex-col mb-3">
          <label htmlFor="serving" className=" text-xl font-medium">Serving</label>
          <input
            className="border border-slate-700 p-2 rounded"
            name="serving"
            type="text"
            id="serving"
            placeholder="4 annosta"
            onChange={handleInputChange}
          />
        </div>
        <div className=" flex flex-col mb-3">
          <label htmlFor="cookTime" className=" text-xl font-medium">Cook time</label>
          <input
            className="border border-slate-700 p-2 rounded"
            name="cookTime"
            type="text"
            id="cookTime"
            placeholder="60 min"
            onChange={handleInputChange}
          />
        </div>
        <div className=" flex flex-col mb-3">
          <label htmlFor="ingredients" className=" text-xl font-medium">Ingredients</label>
          <textarea
            className="border border-slate-700 p-2 rounded"
            name="ingredients"
            rows={5}
            id="ingredients"
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className=" flex flex-col mb-3">
          <label htmlFor="instruction" className=" text-xl font-medium">Instruction</label>
          <textarea
            className="border border-slate-700 p-2 rounded"
            name="instruction"
            rows={10}
            id="instruction"
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className=" flex flex-col mb-3">
            <label htmlFor="file" className=" text-xl font-medium">File</label>
            <input
              className="border border-slate-700 p-2 rounded"
              name="file"
              type="file"
              id="file"
              accept="image/*, video/*"
              onChange={handleFileChange}
            />
        </div>
        <img
          className="border border-slate-700 p-2 rounded"
          src={
              file
              ? URL.createObjectURL(file)
              : 'https://via.placeholder.com/200?text=Choose+image'
          }
          alt="preview"
          width="200"
        />
        <button
          className=" w-28 h-12 my-2 rounded-md bg-orange-wheel p-3 self-center hover:bg-light-orange disabled:bg-slate-300"
          type="submit"
          disabled={file && inputs.title.length > 3 ? false : true}
        >
          Upload
        </button>
      </form>
    </div>
  );
}

export default Create;
