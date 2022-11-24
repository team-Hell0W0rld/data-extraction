import { createSlice } from "@reduxjs/toolkit";

export const docSlice = createSlice({
  name: "selectedDoc",
  initialState: {
    dataList: [
      { title: "Location", value: "PEC Chandigarh" },
      { title: "Lorem", value: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." },
    ],
  },
  reducers: {
    addData: (state, action) => {
      const data = action.payload;
      const newData = {
        title: data.title,
        value: data.value,
      };
      state.dataList.push(newData);
    },
    updateData: (state, action) => {
      const { index, updatedData } = action.payload;
      state.dataList[index] = updatedData;
    },
    deleteData: (state, action) => {
      const { index } = action.payload;
      state.dataList = state.dataList.filter((ele, ind) => ind != index);
    },
  },
});

// Action creators are generated for each case reducer function
export const DocActions = docSlice.actions;

export default docSlice.reducer;
