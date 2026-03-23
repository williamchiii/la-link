import { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import UrlShortener from "../components/UrlShortener.jsx";
import { useAuth } from "../lib/AuthContext.jsx";

const Dashboard = () => {
  const { user, credential } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:5001";

  const fetchLinks = () => {
    if (!credential) return;
    fetch(`${baseURL}/api/links/user/me`, {
      headers: { Authorization: `Bearer ${credential}` },
    })
      .then((res) => res.json())
      .then((data) => setAnalytics(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchLinks();
  }, [credential]);

  return (
    <div className="min-h-screen bg-[#101729]">
      <Navbar />
      <div className="flex justify-center text-white text-[clamp(2rem,3vw,4rem)] pt-20 p-4">
        Hello, {user?.name}!
      </div>
      <UrlShortener onLinkCreated={fetchLinks} />

      <div className="max-w-2xl mx-auto px-4 mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-xl font-semibold">Your Links</h2>
          {analytics && (
            <div className="flex gap-4 text-sm text-white/60">
              <span>{analytics.totalLinks} links</span>
              <span>{analytics.totalClicks} total clicks</span>
            </div>
          )}
        </div>

        {loading ? (
          <p className="text-white/50 text-center">Loading...</p>
        ) : !analytics?.links?.length ? (
          <p className="text-white/50 text-center">
            No links yet. Shorten one above!
          </p>
        ) : (
          <ul className="space-y-3">
            {analytics.links.map((link) => (
              <li
                key={link.id}
                className="bg-white/5 rounded-xl px-5 py-4 flex items-center justify-between"
              >
                <div className="min-w-0 flex-1">
                  <a
                    href={link.shortURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-300 hover:underline text-sm"
                  >
                    {link.shortURL}
                  </a>
                  <p className="text-white/40 text-xs truncate mt-1">
                    {link.longURL}
                  </p>
                </div>
                <div className="text-right ml-4 shrink-0">
                  <p className="text-white font-medium">{link.clicks}</p>
                  <p className="text-white/40 text-xs">clicks</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
