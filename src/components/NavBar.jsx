export default function NavBar({ onNavigate, user, onLogout }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-brand">
          <span className="header-brand-icon">📊</span>
          <span>Project Tracker</span>
        </div>

        {user && (
          <div className="header-nav">
            <div className="header-user">
              <div>
                <div className="header-user-name">{user.username}</div>
                <div className="header-user-email">{user.email}</div>
              </div>
              <button 
                className="header-logout"
                onClick={onLogout}
                title="Logout"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
