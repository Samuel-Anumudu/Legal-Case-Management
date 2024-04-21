"use client";
import Link from "next/link";
function CasesPage() {
  return (
    <>
      <div className="flex h-[216px] items-center justify-center bg-[#262626]">
        <div className="text-center">
          <h2 className="text-white">Got a new case?</h2>
          <Link href="/dashboard/lawyer-dashboard/cases/add-new-case">
            <button className="btn w-[245.89px] border-none bg-[#fc591d] text-white hover:bg-white hover:text-black">
              Add New Case
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default CasesPage;
