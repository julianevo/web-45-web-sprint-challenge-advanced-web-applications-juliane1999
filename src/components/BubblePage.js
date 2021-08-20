import React, { useEffect, useState } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import fetchColorService from '../services/fetchColorService';
import { useParams, useHistory } from "react-router-dom";
import axiosWithAuth from "../helpers/axiosWithAuth";


const BubblePage = () => {
  const [colors, setColors] = useState([]);
  const [editing, setEditing] = useState(false);
  const { id } = useParams()
  const { push } = useHistory()

  useEffect(() => {
    axiosWithAuth().get(`/colors`)
      .then(res => {
        setColors(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])



  const toggleEdit = (value) => {
    setEditing({
      ...colors,
      value: true
    });
  };

  const saveEdit = (editColor) => {
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors`, editColor)
      .then(res=> {
        setEditing(!editing)
        push(`/colors/${id}`)
      })
  };

  const deleteColor = (colorToDelete) => {
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${id}`, { params: {id: colorToDelete }})
      .then(res => {
        const del = colors.filter( color => id !== color.id)
        setColors(del)
        // setColors(res.data)
        push('/bubbles')
      })
  };



  return (
    <div className="container">
      <ColorList colors={colors} editing={editing} toggleEdit={toggleEdit} saveEdit={saveEdit} deleteColor={deleteColor}/>
      <Bubbles colors={colors}/>
    </div>
  );
};

export default BubblePage;


//Task List:
//1. When the component mounts, make an axios call to retrieve all color data and push to state.
//2. Complete toggleEdit, saveEdit, deleteColor and functions
