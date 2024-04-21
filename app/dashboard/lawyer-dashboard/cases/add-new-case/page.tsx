"use client";

import { useState, useEffect } from "react";

import dayjs from "dayjs";

import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Box } from "@mui/material";
import validateFormData from "@/utils/validation/validateFormData";

interface FormValues {
  text: string;
  isError: boolean;
}

const initialCaseData: Record<string, FormValues> = {
  caseName: { text: "", isError: false },
  caseDetails: { text: "", isError: false },
  caseNumber: { text: "", isError: false },
  caseType: { text: "", isError: false },
  caseStatus: { text: "", isError: false },
  dateOpened: { text: "", isError: false },
  lawyers: { text: "", isError: false },
};

function AddNewCasePage() {
  const [caseData, setCaseData] =
    useState<Record<string, FormValues>>(initialCaseData);
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(dayjs());

  const CASE_TYPE = [
    "Civil",
    "Intellectual Property",
    "Criminal Defense",
    "Employment",
    "Personal Injury",
    "Bankrupcy",
  ];

  const CASE_STATUS = [
    "Further Action Needed",
    "Processing",
    "Deposition Date Set",
    "Trial Date Pending",
    "Trial Data Set",
    "Closed",
  ];

  const LAWYERS_LIST = [
    "Natalie Romanoff",
    "John Doe",
    "Michael Roberts",
    "Jane Doe",
    "Haley Talor",
  ];

  useEffect(() => {
    const today = dayjs();
    setCaseData((prevState) => {
      return {
        ...prevState,
        dateOpened: {
          text: today.format("DD/MM/YYYY"),
          isError: false,
        },
      };
    });
  }, []);

  const onChangeHandler = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setCaseData((prevCaseData) => {
      return {
        ...prevCaseData,
        [e.target.name]: {
          text: e.target.value,
          isError: false,
        },
      };
    });
  };

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    setSelectedDate(date);
    if (date) {
      setCaseData((prevCaseData) => ({
        ...prevCaseData,
        dateOpened: {
          text: date.format("DD/MM/YYYY"),
          isError: false,
        },
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { isFormValid, validatedFormData } = validateFormData(caseData);

    if (!isFormValid) {
      setCaseData({
        ...validatedFormData,
        lastName: {
          text: "",
          isError: false,
        },
      });
      return;
    }
  };

  return (
    <div className="container mx-auto max-w-[1110px]">
      <div className="flex flex-col items-center justify-center">
        <div className="text-center">
          <h1>Add New Case</h1>
          <p>Fill in the case details and hit save.</p>
        </div>
        <div className="w-[35%] max-w-full">
          <form onSubmit={handleSubmit}>
            <div className="w-full max-w-full">
              <div className="form-control">
                <label className="form-control">
                  <div className="label">
                    <span className="label-text">Case Name *</span>
                  </div>
                  <input
                    onChange={onChangeHandler}
                    name="caseName"
                    value={caseData.caseName.text}
                    type="text"
                    className={`${caseData.caseName.isError && "input-error"} input input-bordered w-full bg-white focus:outline-none`}
                  />
                  {caseData.caseName.isError && (
                    <span className="text-[#ff5761]">
                      ⚠️ Case Name is required
                    </span>
                  )}
                </label>
              </div>
              <div className="form-control">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Case Details</span>
                  </div>
                  <textarea
                    onChange={onChangeHandler}
                    name="caseDetails"
                    value={caseData.caseDetails.text}
                    className="textarea textarea-bordered bg-white focus:outline-none"
                  ></textarea>
                </label>
              </div>
              <div className="form-control">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Case Number *</span>
                  </div>
                  <input
                    onChange={onChangeHandler}
                    name="caseNumber"
                    value={caseData.caseNumber.text}
                    type="text"
                    className={`${caseData.caseNumber.isError && "input-error"} input input-bordered w-full bg-white focus:outline-none`}
                  />
                  {caseData.caseNumber.isError && (
                    <span className="text-[#ff5761]">
                      ⚠️ Case Number is required
                    </span>
                  )}
                </label>
              </div>
              <div className="form-control">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Case Type *</span>
                  </div>
                  <select
                    onChange={onChangeHandler}
                    name="caseType"
                    value={caseData.caseType.text}
                    className={`${caseData.caseType.isError && "select-error"} select select-bordered w-full bg-white focus:outline-none`}
                  >
                    <option disabled value="">
                      Choose Case Type
                    </option>
                    {CASE_TYPE.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {caseData.caseNumber.isError && (
                    <span className="text-[#ff5761]">
                      ⚠️ Case Type is required
                    </span>
                  )}
                </label>
              </div>
              <div className="form-control">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Case Status *</span>
                  </div>
                  <select
                    onChange={onChangeHandler}
                    name="caseStatus"
                    value={caseData.caseStatus.text}
                    className={`${caseData.caseStatus.isError && "select-error"} select select-bordered w-full bg-white focus:outline-none`}
                  >
                    <option disabled value="">
                      Choose Case Status
                    </option>
                    {CASE_STATUS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {caseData.caseStatus.isError && (
                    <span className="text-[#ff5761]">
                      ⚠️ Case Status is required
                    </span>
                  )}
                </label>
              </div>
              <div className="form-control">
                <Box>
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">Date Opened *</span>
                    </div>
                  </label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                      components={[
                        "DatePicker",
                        "MobileDatePicker",
                        "DesktopDatePicker",
                        "StaticDatePicker",
                      ]}
                    >
                      <DemoItem>
                        <DesktopDatePicker
                          name="dateOpened"
                          value={selectedDate}
                          onChange={handleDateChange}
                          format="DD/MM/YYYY"
                        />
                      </DemoItem>
                    </DemoContainer>
                  </LocalizationProvider>
                </Box>
              </div>
              <div className="form-control">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Lawyers</span>
                  </div>
                  <select
                    onChange={onChangeHandler}
                    name="lawyers"
                    value={caseData.lawyers.text}
                    className="select select-bordered w-full bg-white focus:outline-none"
                  >
                    <option disabled value="">
                      Select lawyers
                    </option>
                    {LAWYERS_LIST.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
            <button className="btn w-full bg-black text-white">
              Save Case
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddNewCasePage;
