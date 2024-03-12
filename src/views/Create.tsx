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
    console.log('doCreate');
    console.log('file', file);

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
    <>
      <h1>Upload</h1>
      <form onSubmit={handleSubmit} className="border border-slate-700">
        <div>
          <label htmlFor="title">Title</label>
          <input
            className="border border-slate-700"
            name="title"
            type="text"
            id="title"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            className="border border-slate-700"
            name="description"
            id="description"
            onChange={handleInputChange}
          ></input>
        </div>
        <div>
          <label htmlFor="serving">Serving</label>
          <input
            className="border border-slate-700"
            name="serving"
            type="text"
            id="serving"
            placeholder="4 annosta"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="cookTime">Cook time</label>
          <input
            className="border border-slate-700"
            name="cookTime"
            type="text"
            id="cookTime"
            placeholder="60 min"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="ingredients">Ingredients</label>
          <textarea
            className="border border-slate-700"
            name="ingredients"
            rows={5}
            id="ingredients"
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="instruction">Instruction</label>
          <textarea
            className="border border-slate-700"
            name="instruction"
            rows={5}
            id="instruction"
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div>
            <label htmlFor="file">File</label>
            <input
              className="border border-slate-700"
              name="file"
              type="file"
              id="file"
              accept="image/*, video/*"
            onChange={handleFileChange}
            />
        </div>
        <img
          className="border border-slate-700"
          src={
              file
              ? URL.createObjectURL(file)
              : 'https://via.placeholder.com/200?text=Choose+image'
          }
          alt="preview"
          width="200"
        />
        <button
          className="border border-slate-700"
          type="submit"
          // disabled={file && inputs.title.length > 3 ? false : true}
        >
          Upload
        </button>
      </form>
    </>
  );
}

export default Create;
