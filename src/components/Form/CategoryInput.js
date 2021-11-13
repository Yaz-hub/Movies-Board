import React, { useState } from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";

const CategoryInput = ({tags, handleChange}) => {

  return (
      <ReactTagInput 
        tags={tags} 
        onChange={handleChange}
      />
    )
  }


  export default CategoryInput;