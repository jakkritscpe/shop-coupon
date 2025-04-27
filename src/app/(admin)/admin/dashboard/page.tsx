import React from "react";

const Dashboard = () => {
  return (
    <div>
      <div>แดชบอร์ด</div>
      <div className="divider"></div>

      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">ยอดรวมการเข้าชมเว็บไซต์</div>
          <div className="stat-value">89,400</div>
          <div className="stat-desc">ครั้ง/ต่อเดือน</div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Dashboard;
