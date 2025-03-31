import React from "react";
import Announcements from "@/components/Announcements";
import EcommerceChart from "@/components/EcommerceChart";
import CountChart from "@/components/CountChart";
import EventCalendar from "@/components/EventCalendar";
import FinanceChart from "@/components/FinanceChart";
import UserCard from "@/components/UserCard";

function AdminPage() {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row bg-background text-foreground">
      {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* USER CARDS */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="customer" index={4} />
          <UserCard type="seller" index={1} />
          <UserCard type="affiliate" index={2} />
        </div>
        {/* MIDDLE CHARTS */}
        <div className="flex gap-4 flex-col lg:flex-row">
          <div className="w-full lg:w-1/3 h-[450px] bg-card rounded-xl border">
            <CountChart />
          </div>
          <div className="w-full lg:w-2/3 h-[450px] bg-card rounded-xl border">
            <EcommerceChart />
          </div>
        </div>
        {/* BOTTOM CHART */}
        <div className="w-full h-[500px] bg-card rounded-xl border">
          <FinanceChart />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <div className="bg-card rounded-xl border">
          <EventCalendar />
        </div>
        <div className="bg-card rounded-xl border p-6">
          <Announcements />
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
