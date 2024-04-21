"use client";
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { setCases } from "@/lib/features/cases/casesSlice";
import { RootState } from "@/lib/store";
import { useSelector, useDispatch } from "react-redux";

interface Document {
  type: string;
  name: string;
}

interface Case {
  id: string;
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

interface LawyerData {
  firstName: string;
  email: string;
  lastName: string;
  specialty: string;
  role: string;
  timestamp: { seconds: number; nanoseconds: number };
  billingRate: "string";
  cases: Array<any>;
}
function LawyerDashboard() {
  const [lawyers, setLawyers] = useState([]);
  const cases: Case[] = useSelector((state: RootState) => state.cases);

  const dispatch = useDispatch();
  // Fetch Cases
  const getCasesFromDatabase = async () => {
    const casesCollectionRef = collection(db, "cases");
    const querySnapshot = await getDocs(casesCollectionRef);
    const cases: Case[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      description: doc.data().description,
      lawyers: doc.data().lawyers,
      status: doc.data().status,
      title: doc.data().title,
      documents: doc.data().documents,
      bill: doc.data().bill,
      date: doc.data().date,
      type: doc.data().type,
      number: doc.data().number,
    }));
    dispatch(setCases(cases));
  };

  // Fetch Lawyers
  const getLawyersFromDatabase = async () => {
    const casesCollectionRef = collection(db, "lawyers");
    const querySnapshot = await getDocs(casesCollectionRef);
    const lawyers: any = querySnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
    setLawyers(lawyers);
  };

  const totalCaseBill = (caseItem: Case) => {
    let totalBill = 0;
    const lawyersBill: Array<{ name: string; billingRate: number }> = lawyers
      .map((lawyer: LawyerData) => ({
        name: `${lawyer.firstName} ${lawyer.lastName}`,
        billingRate: +lawyer.billingRate,
      }))
      .filter((lawyerBill) => caseItem.lawyers.includes(lawyerBill.name));

    for (let lawyerBill of lawyersBill) {
      totalBill += lawyerBill.billingRate;
    }
    return totalBill;
  };

  useEffect(() => {
    getLawyersFromDatabase();
  }, []);

  useEffect(() => {
    getCasesFromDatabase();
  }, [dispatch]);

  return (
    <div>
      <div className="flex h-[216px] items-center justify-center bg-[#262626]">
        <div className="text-center">
          <h2 className="text-white">Quick Overview</h2>
          <p className="text-[#b8b8b8]">
            Quick overview of all the cases and their status.
          </p>
        </div>
      </div>
      <div className="container mx-auto max-w-[1110px]">
        <div>
          <h2 className="">Billing Overview</h2>
          <p className="text-[#8f8f8f]">
            All cases and their billing till date
          </p>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {cases.map((caseItem: Case) => (
            <div
              key={caseItem.id}
              className="rounded-2xl bg-[#fafafc] p-6 text-center"
            >
              <p>{caseItem.title}</p>
              <p>${totalCaseBill(caseItem)}.00</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LawyerDashboard;
