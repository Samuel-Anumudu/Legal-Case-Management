import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Document {
  type: string;
  name: string;
}

interface Case {
  id: any;
  description: string;
  lawyers: string[];
  status: string;
  title: string;
  documents: Document[];
  bill: number;
  date: string;
  type: string;
  number: string;
}

const initialState: Case[] = [];

const casesSlice = createSlice({
  name: "cases",
  initialState,
  reducers: {
    setCases: (state, action: PayloadAction<Case[]>) => {
      return [...action.payload];
    },
  },
});

export const { setCases } = casesSlice.actions;

export default casesSlice.reducer;
