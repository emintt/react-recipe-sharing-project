import { useState } from "react";

const useForm = (callback: () => void, initState: Record<string, string>) => {
  const [inputs, setInputs] = useState(initState);

  const handleSubmit = (event: React.SyntheticEvent) => {
      if (event) {
          event.preventDefault();
      }
      callback();
  };
  // func to update input
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      event.persist();
      // console.log(event.target.name, event.target.value);
      // add a new pair of key value to inputs
      setInputs((inputs) => ({
        ...inputs,
        [event.target.name]: event.target.value,
      }));
  };

  return {
    handleSubmit,
    handleInputChange,
    inputs,
  };
};

export {useForm};
