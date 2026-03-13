import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { useSidebar } from "./SidebarContext";

export default function AppHeader() {
  const [showAppMenu, setShowAppMenu] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();
  const searchRef = useRef(null);

  const handleToggle = () => {
    if (window.innerWidth >= 992) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const notifications = [
    { id: 1, icon: "🌀", title: "Typhoon Warning", msg: "Signal No. 2 in Cebu", time: "2m ago", color: "danger" },
    { id: 2, icon: "🌊", title: "Flood Alert", msg: "Mambaling — High Risk", time: "10m ago", color: "warning" },
    { id: 3, icon: "✅", title: "Center Update", msg: "Mambaling Gym now open", time: "1h ago", color: "success" },
  ];

  return (
    <>
      <style>{`
        .app-header {
          height: 64px;
          background: #fff;
          border-bottom: 1px solid #dee2e6;
          display: flex;
          align-items: center;
          padding: 0 16px;
          position: sticky;
          top: 0;
          z-index: 1030;
          gap: 12px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.06);
        }
        .header-icon-btn {
          width: 38px;
          height: 38px;
          border: 1px solid #dee2e6;
          background: #fff;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #6c757d;
          font-size: 1rem;
          transition: background 0.15s;
          position: relative;
          flex-shrink: 0;
        }
        .header-icon-btn:hover { background: #f8f9fa; }
        .notif-dot {
          position: absolute;
          top: -3px; right: -3px;
          width: 16px; height: 16px;
          background: #dc3545;
          border-radius: 50%;
          font-size: 0.58rem;
          font-weight: 700;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #fff;
        }
        .header-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          background: #fff;
          border: 1px solid #dee2e6;
          border-radius: 10px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
          z-index: 9999;
          animation: fadeDown 0.15s ease;
          min-width: 300px;
        }
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .dropdown-header-title {
          padding: 12px 16px;
          border-bottom: 1px solid #f1f3f5;
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          color: #868e96;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .notif-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 10px 16px;
          border-bottom: 1px solid #f8f9fa;
          cursor: pointer;
          transition: background 0.1s;
        }
        .notif-row:last-child { border-bottom: none; }
        .notif-row:hover { background: #f8f9fa; }
        .notif-icon-box {
          width: 34px; height: 34px;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.9rem; flex-shrink: 0;
        }
        .profile-dropdown { min-width: 200px; }
        .profile-header {
          padding: 14px 16px;
          border-bottom: 1px solid #f1f3f5;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .avatar {
          width: 38px; height: 38px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0d6efd, #6ea8fe);
          display: flex; align-items: center; justify-content: center;
          color: #fff; font-weight: 700; font-size: 0.9rem;
          flex-shrink: 0;
        }
        .profile-menu-link {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 9px 16px;
          font-size: 0.83rem;
          color: #495057;
          text-decoration: none;
          transition: background 0.1s;
          cursor: pointer;
          border: none;
          background: transparent;
          width: 100%;
        }
        .profile-menu-link:hover { background: #f8f9fa; color: #212529; }
        .profile-menu-link.logout { color: #dc3545; }
        .profile-menu-link.logout:hover { background: #fff5f5; }
        .search-wrap { position: relative; }
        .search-wrap input {
          padding-left: 36px;
          padding-right: 60px;
          height: 38px;
          border-radius: 8px;
          border: 1px solid #dee2e6;
          font-size: 0.85rem;
          width: 320px;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .search-wrap input:focus {
          border-color: #86b7fe;
          box-shadow: 0 0 0 3px rgba(13,110,253,0.1);
        }
        .search-icon {
          position: absolute;
          left: 10px; top: 50%;
          transform: translateY(-50%);
          color: #adb5bd; font-size: 0.9rem;
        }
        .kbd-hint {
          position: absolute;
          right: 8px; top: 50%;
          transform: translateY(-50%);
          background: #f8f9fa;
          border: 1px solid #dee2e6;
          border-radius: 4px;
          padding: 1px 6px;
          font-size: 0.68rem;
          color: #868e96;
        }
      `}</style>

      <header className="app-header">

        {/* Toggle Button */}
        <button className="header-icon-btn" onClick={handleToggle}>
          {isMobileOpen ? "✕" : "☰"}
        </button>

        {/* Logo (mobile only) */}
        <Link
          to="/"
          className="d-lg-none text-decoration-none d-flex align-items-center gap-2"
        >
          <div
            style={{
              width: 32, height: 32,
              background: "#0d6efd",
              borderRadius: 7,
              display: "flex", alignItems: "center",
              justifyContent: "center",
              color: "#fff", fontSize: "0.9rem",
            }}
          >
            🛡️
          </div>
          <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "#212529" }}>
            RiskReady
          </span>
        </Link>

        {/* Search (desktop) */}
        <div className="search-wrap d-none d-lg-block">
          <span className="search-icon">🔍</span>
          <input
            ref={searchRef}
            type="text"
            placeholder="Search or type command..."
          />
          <span className="kbd-hint">⌘ K</span>
        </div>

        {/* Mobile app menu toggle */}
        <button
          className="header-icon-btn d-lg-none ms-auto"
          onClick={() => setShowAppMenu(!showAppMenu)}
        >
          ···
        </button>

        {/* Right Side Actions */}
        <div
          className={`align-items-center gap-2 ms-auto ${showAppMenu ? "d-flex" : "d-none d-lg-flex"}`}
          style={{ flexShrink: 0 }}
        >

          {/* Notifications */}
          <div className="position-relative">
            <button
              className="header-icon-btn"
              onClick={() => {
                setShowNotifs(!showNotifs);
                setShowProfile(false);
              }}
            >
              🔔
              <span className="notif-dot">3</span>
            </button>

            {showNotifs && (
              <div className="header-dropdown">
                <div className="dropdown-header-title">
                  <span>Notifications</span>
                  <span
                    style={{ color: "#0d6efd", cursor: "pointer", fontWeight: 500, textTransform: "none", letterSpacing: 0 }}
                    onClick={() => setShowNotifs(false)}
                  >
                    Mark all read
                  </span>
                </div>
                {notifications.map((n) => (
                  <div key={n.id} className="notif-row">
                    <div
                      className={`notif-icon-box bg-${n.color} bg-opacity-10`}
                    >
                      {n.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: "0.83rem", fontWeight: 600, color: "#212529" }}>
                        {n.title}
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "#6c757d" }}>
                        {n.msg}
                      </div>
                      <div style={{ fontSize: "0.7rem", color: "#adb5bd" }}>
                        {n.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="position-relative">
            <div
              className="avatar"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setShowProfile(!showProfile);
                setShowNotifs(false);
              }}
            >
              J
            </div>

            {showProfile && (
              <div className="header-dropdown profile-dropdown">
                <div className="profile-header">
                  <div className="avatar">J</div>
                  <div>
                    <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#212529" }}>
                      Juan Dela Cruz
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "#6c757d" }}>
                      Admin
                    </div>
                  </div>
                </div>
                <Link to="/profile" className="profile-menu-link"
                  onClick={() => setShowProfile(false)}>
                  👤 My Profile
                </Link>
                <Link to="/settings" className="profile-menu-link"
                  onClick={() => setShowProfile(false)}>
                  ⚙️ Settings
                </Link>
                <hr className="my-1" />
                <button className="profile-menu-link logout"
                  onClick={() => setShowProfile(false)}>
                  🚪 Sign Out
                </button>
              </div>
            )}
          </div>

        </div>
      </header>

      {/* Close dropdowns on outside click */}
      {(showNotifs || showProfile) && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 9998 }}
          onClick={() => { setShowNotifs(false); setShowProfile(false); }}
        />
      )}
    </>
  );
}
