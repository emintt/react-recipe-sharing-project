const Comments = () => {
  return (
    <div className=" mb-5 text-xl">
      <form
      // onSubmit={handleSubmit} ref={formRef}
      >
        <h4 className=" text-2xl font-medium mb-3  text-red-950">
          <label className="" htmlFor="comment">Kommentit</label>
        </h4>
        <div className="flex">
          <input
            className=" w-full md:w-[50rem] border border-slate-500 p-4 text-slate-950"
            name="comment_text"
            type="text"
            id="comment"
            placeholder="Lisää kommentti"
            // onChange={handleInputChange}
          />
          <button
          className=" rounded bg-orange-wheel p-4 hover:bg-light-orange"
          type="submit"
          >
            Post
          </button>
        </div>
      </form>

    </div>

  );
};

export default Comments;
