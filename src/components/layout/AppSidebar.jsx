import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { useSidebar } from "./SidebarContext";

const navItems = [
  {
    icon: "⊞",
    name: "Dashboard",
    subItems: [{ name: "Ecommerce", path: "/" }],
  },
  {
    icon: "📅",
    name: "Calendar",
    path: "/calendar",
  },
  {
    icon: "👤",
    name: "User Profile",
    path: "/profile",
  },
  {
    name: "Forms",
    icon: "📋",
    subItems: [
      { name: "Check In", path: "/check-reg" },
      { name: "Evacuation Center", path: "/evacuation-reg" },
      { name: "Hazard", path: "/hazard-reg" },
      { name: "Admin", path: "/admin-reg" },
    ],
  },
  {
    name: "Tables",
    icon: "📊",
    subItems: [{ name: "Basic Tables", path: "/basic-tables" }],
  },
  {
    name: "Pages",
    icon: "📄",
    subItems: [
      { name: "Blank Page", path: "/blank" },
      { name: "404 Error", path: "/error-404" },
    ],
  },
];

const othersItems = [
  {
    icon: "🥧",
    name: "Charts",
    subItems: [
      { name: "Line Chart", path: "/line-chart" },
      { name: "Bar Chart", path: "/bar-chart" },
    ],
  },
  {
    icon: "🧩",
    name: "UI Elements",
    subItems: [
      { name: "Alerts", path: "/alerts" },
      { name: "Avatar", path: "/avatars" },
      { name: "Badge", path: "/badge" },
      { name: "Buttons", path: "/buttons" },
      { name: "Images", path: "/images" },
      { name: "Videos", path: "/videos" },
    ],
  },
  {
    icon: "🔌",
    name: "Authentication",
    subItems: [
      { name: "Sign In", path: "/signin" },
      { name: "Sign Up", path: "/signup" },
    ],
  },
];

export default function AppSidebar() {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const subMenuRefs = useRef({});
  const [subMenuHeight, setSubMenuHeight] = useState({});

  const isActive = (path) => location.pathname === path;
  const isExpanded_ = isExpanded || isHovered || isMobileOpen;

  useEffect(() => {
    let matched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((sub) => {
            if (isActive(sub.path)) {
              setOpenSubmenu({ type: menuType, index });
              matched = true;
            }
          });
        }
      });
    });
    if (!matched) setOpenSubmenu(null);
  }, [location]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prev) => ({
          ...prev,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index, menuType) => {
    setOpenSubmenu((prev) => {
      if (prev && prev.type === menuType && prev.index === index) return null;
      return { type: menuType, index };
    });
  };

  const sidebarWidth = isExpanded_ ? "260px" : "72px";

  const renderMenuItems = (items, menuType) => (
    <ul className="list-unstyled mb-0 d-flex flex-column gap-1">
      {items.map((nav, index) => {
        const key = `${menuType}-${index}`;
        const isOpen = openSubmenu?.type === menuType && openSubmenu?.index === index;

        return (
          <li key={nav.name}>
            {nav.subItems ? (
              <>
                <button
                  onClick={() => handleSubmenuToggle(index, menuType)}
                  className="d-flex align-items-center w-100 border-0 px-3 py-2 rounded text-decoration-none"
                  style={{
                    background: isOpen ? "#fff3cd" : "transparent",
                    color: isOpen ? "#856404" : "#6c757d",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    gap: 10,
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  <span style={{ fontSize: "1.1rem", width: 24, textAlign: "center" }}>
                    {nav.icon}
                  </span>
                  {isExpanded_ && (
                    <>
                      <span className="flex-grow-1 text-start">{nav.name}</span>
                      <span
                        style={{
                          fontSize: "0.65rem",
                          transition: "transform 0.2s",
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                      >
                        ▼
                      </span>
                    </>
                  )}
                </button>

                {isExpanded_ && (
                  <div
                    ref={(el) => (subMenuRefs.current[key] = el)}
                    style={{
                      overflow: "hidden",
                      transition: "height 0.25s ease",
                      height: isOpen ? `${subMenuHeight[key] || 0}px` : "0px",
                    }}
                  >
                    <ul className="list-unstyled ps-4 pt-1 mb-0">
                      {nav.subItems.map((sub) => (
                        <li key={sub.name}>
                          <Link
                            to={sub.path}
                            className="d-flex align-items-center gap-2 px-3 py-2 rounded text-decoration-none"
                            style={{
                              fontSize: "0.82rem",
                              color: isActive(sub.path) ? "#0d6efd" : "#6c757d",
                              background: isActive(sub.path)
                                ? "#e7f1ff"
                                : "transparent",
                              fontWeight: isActive(sub.path) ? 600 : 400,
                              transition: "all 0.15s",
                            }}
                          >
                            <span
                              style={{
                                width: 6,
                                height: 6,
                                borderRadius: "50%",
                                background: isActive(sub.path)
                                  ? "#0d6efd"
                                  : "#ced4da",
                                flexShrink: 0,
                              }}
                            />
                            {sub.name}
                            {sub.new && (
                              <span className="badge bg-success ms-auto"
                                style={{ fontSize: "0.6rem" }}>
                                new
                              </span>
                            )}
                            {sub.pro && (
                              <span className="badge bg-primary ms-auto"
                                style={{ fontSize: "0.6rem" }}>
                                pro
                              </span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              nav.path && (
                <Link
                  to={nav.path}
                  className="d-flex align-items-center px-3 py-2 rounded text-decoration-none"
                  style={{
                    gap: 10,
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: isActive(nav.path) ? "#0d6efd" : "#6c757d",
                    background: isActive(nav.path) ? "#e7f1ff" : "transparent",
                    transition: "all 0.15s",
                  }}
                >
                  <span style={{ fontSize: "1.1rem", width: 24, textAlign: "center" }}>
                    {nav.icon}
                  </span>
                  {isExpanded_ && <span>{nav.name}</span>}
                </Link>
              )
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <aside
      style={{
        width: sidebarWidth,
        minHeight: "100vh",
        background: "#fff",
        borderRight: "1px solid #dee2e6",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1040,
        transition: "width 0.3s ease, transform 0.3s ease",
        transform: isMobileOpen ? "translateX(0)" : undefined,
        overflowY: "auto",
        overflowX: "hidden",
        boxShadow: "2px 0 8px rgba(0,0,0,0.05)",
      }}
      className={`d-none d-lg-flex flex-column ${isMobileOpen ? "d-flex" : ""}`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo */}
      <div
        className="d-flex align-items-center px-3 border-bottom"
        style={{ height: 64, flexShrink: 0 }}
      >
        <Link
          to="/"
          className="text-decoration-none d-flex align-items-center gap-2"
        >
          <div
            style={{
              width: 36,
              height: 36,
              background: "#0d6efd",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "1rem",
              flexShrink: 0,
            }}
          >
            🛡️
          </div>
          {isExpanded_ && (
            <span
              style={{
                fontWeight: 700,
                fontSize: "1rem",
                color: "#212529",
                whiteSpace: "nowrap",
              }}
            >
              RiskReady
            </span>
          )}
        </Link>
      </div>

      {/* Nav */}
      <div className="p-3 flex-grow-1">
        {/* Main Menu */}
        <div className="mb-3">
          {isExpanded_ && (
            <p
              className="text-uppercase mb-2 px-3"
              style={{
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "1px",
                color: "#adb5bd",
              }}
            >
              Menu
            </p>
          )}
          {renderMenuItems(navItems, "main")}
        </div>

        <hr className="my-3" />

        {/* Others Menu */}
        <div>
          {isExpanded_ && (
            <p
              className="text-uppercase mb-2 px-3"
              style={{
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "1px",
                color: "#adb5bd",
              }}
            >
              Others
            </p>
          )}
          {renderMenuItems(othersItems, "others")}
        </div>
      </div>
    </aside>
  );
}
