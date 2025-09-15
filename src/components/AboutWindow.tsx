"use client";
import { useState, useRef, useEffect } from "react";

export function AboutWindow({ onOpenContact }: { onOpenContact?: () => void }) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const windowRef = useRef<HTMLDivElement>(null);

  // Window dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const handleContactClick = () => {
    if (onOpenContact) {
      onOpenContact();
    }
  };

  return (
    <>
      <style jsx>{`
        /* Authentic 2000s Fonts */
        @import url("https://fonts.googleapis.com/css2?family=Comic+Sans+MS:wght@400;700&family=Press+Start+2P&display=swap");

        /* --- General MySpace Layout --- */
        .myspace-window {
          max-width: 1000px;
          margin: 20px auto;
          border: 4px solid #000;
          background: #f0f0f0;
          box-shadow: 6px 6px 15px rgba(0, 0, 0, 0.9);
          padding: 15px;
          font-family: "Comic Sans MS", "Verdana", sans-serif;
          font-size: 13px;
          color: #333;
        }

        .myspace-columns {
          display: flex;
          gap: 15px;
        }

        .myspace-left-col {
          flex: 1;
        }

        .myspace-right-col {
          flex: 2;
        }

        .profile-pic img {
          width: 100%;
          border: 4px solid #000;
          box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
          filter: saturate(1.2);
        }

        .profile-info {
          background: #d0e0e0;
          border: 2px solid #000;
          padding: 8px;
          margin-top: 10px;
          font-size: 12px;
          line-height: 1.5;
          text-align: center;
        }

        .mood-text {
          font-family: "Press Start 2P", cursive;
          text-shadow: 1px 1px 0 #fff;
          color: #c00000;
        }

        .myspace-section {
          background: #fff;
          border: 2px solid #000;
          padding: 12px;
          margin-top: 15px;
          box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.2);
        }

        .myspace-section h2 {
          margin: 0 0 10px;
          background: linear-gradient(90deg, #6600cc, #ff6600);
          color: #fff;
          padding: 8px;
          font-size: 18px;
          font-family: "Press Start 2P", monospace;
          letter-spacing: 2px;
          text-shadow: 2px 2px 0 #000;
        }

        .myspace-section ul {
          list-style-type: "⚡️ ";
          padding-left: 20px;
          margin: 0;
        }

        .myspace-section li {
          margin: 6px 0;
        }

        /* --- Comment Wall Styling --- */
        .comment-wall {
          background: #222;
          color: #fff;
          font-family: "Courier New", monospace;
          font-size: 14px;
          padding: 15px;
          margin-top: 15px;
          border-radius: 8px;
          border: 3px dashed #ff00ff;
          box-shadow: inset 0 0 15px #000;
        }

        .comment-wall h2 {
          background: #444;
          color: #fff;
          font-size: 16px;
          margin-bottom: 12px;
          padding: 6px;
          text-align: center;
          border: 2px solid #888;
        }

        .comment-container {
          background: #111;
          padding: 20px;
          border: 3px solid #6600cc;
          color: #fff;
          font-size: 13px;
          line-height: 1.6;
          max-height: 350px;
          overflow-y: auto;
          box-shadow: 0 0 10px #6600cc;
        }

        .comment {
          margin-bottom: 12px;
          padding: 8px;
          border: 1px dashed #555;
          border-radius: 4px;
        }

        .special-comment {
          background: #331133;
          border-color: #ff00ff;
        }

        .leave-comment {
          margin-top: 15px;
          padding-top: 10px;
          border-top: 1px dotted #555;
        }

        .leave-comment textarea {
          width: 100%;
          height: 60px;
          border: 2px inset #999;
          padding: 8px;
          font-family: "Verdana", sans-serif;
          font-size: 12px;
          background: #222;
          color: #fff;
        }

        .leave-comment input[type="submit"] {
          margin-top: 8px;
          background: #6600cc;
          color: #fff;
          border: 3px outset #fff;
          font-size: 12px;
          padding: 6px 12px;
          cursor: pointer;
          font-family: "Press Start 2P", monospace;
        }

        .leave-comment input[type="submit"]:hover {
          background: #fff;
          color: #6600cc;
        }

        /* --- Ad Player Styling --- */
        .ad-section {
          min-height: 320px;
          background: #000;
          border: 4px solid #6600cc;
          box-shadow: 0 0 10px #ff00ff;
          padding: 10px;
        }

        .ad-player {
          background: #000;
          border: 5px solid #444;
          position: relative;
          overflow: hidden;
          height: 280px;
          box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.8);
        }

        .ad-player:before,
        .ad-player:after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          height: 20px;
          background: #222;
          z-index: 10;
        }

        .ad-player:before {
          top: 0;
          border-bottom: 2px solid #555;
        }

        .ad-player:after {
          bottom: 0;
          border-top: 2px solid #555;
        }

        #ad-video-player {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .contact-link {
          color: #1e90ff;
          text-decoration: none;
          cursor: pointer;
        }

        .contact-link:hover {
          text-decoration: underline;
        }
      `}</style>

      <div
        ref={windowRef}
        className="myspace-window"
        style={{
          position: "absolute",
          top: position.y,
          left: position.x,
          zIndex: 999,
        }}
      >
        {/* Window Header */}
        <div
          className="window-header"
          onMouseDown={handleMouseDown}
          style={{
            background: "linear-gradient(90deg, #222, #444)",
            color: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "6px 10px",
            cursor: "move",
            userSelect: "none",
            border: "2px solid #fff",
            margin: "-15px -15px 15px -15px",
          }}
        >
          <span className="title">🌟 Meet_The_Agency's MySpace 🌟</span>
          <div className="window-controls" style={{ display: "flex" }}>
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              style={{
                background: "#666",
                border: "none",
                color: "#fff",
                width: "22px",
                height: "22px",
                marginLeft: "4px",
                cursor: "pointer",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              –
            </button>
            <button
              onClick={() => {
                /* Close functionality would be handled by parent */
              }}
              style={{
                background: "#666",
                border: "none",
                color: "#fff",
                width: "22px",
                height: "22px",
                marginLeft: "4px",
                cursor: "pointer",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ×
            </button>
          </div>
        </div>

        {/* Window Content */}
        {!isMinimized && (
          <div className="myspace-columns">
            <div className="myspace-left-col">
              <div className="profile-pic">
                <img
                  src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWE1MTI0M3V0ZmZvbDdtNWZicW8wdXlsY2VqajJ0Z29kNmpsa20waCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Luv1mO3hR3412R5w9W/giphy.gif"
                  alt="Animated Ash & Britt – The Agency"
                />
              </div>
              <div className="profile-info">
                <p>Creatives • Coke addicts (the legal kind) • Cat/dog moms</p>
                <p>
                  <b>Mood:</b>{" "}
                  <span className="mood-text">
                    Caffeinated & plotting world domination ☕🍒🥤
                  </span>
                </p>
              </div>

              <div className="myspace-section">
                <h2>Meet_The_Agency's Interests</h2>
                <p>
                  <b>General:</b> Aesthetically pleasing places, coffee, cats,
                  concerts, fashion, dancing, impromptu photo shoots,
                  storytelling, creativity
                </p>
                <p>
                  <b>Music:</b> Tyler The Creator, Taylor Swift, Sabrina
                  Carpenter, The Weeknd, Fred Again, Nirvana, Sublime, Taking
                  Back Sunday, Blink 182, nostalgic Y2K playlists, indie gems
                </p>
                <p>
                  <b>Movies:</b> Practical Magic, Tim Burton films, Wes Anderson
                  films, 90s/2000s rom-coms, A Few Good Men, Holes, Princess &
                  The Frog, Beetlejuice (x2), A24 films
                </p>
                <p>
                  <b>Television:</b> Murder Mystery, True Crime, Nature Docs,
                  MTV Cribs, 90s Nickelodeon, Netflix binges, Only Murders In
                  The Building, Wednesday, Ted Lasso, Sabrina (old & new), I
                  Dream of Genie, Parks & Rec, The Office, Cloud 9, LOST,
                  Sherlock Holmes anything
                </p>
                <p>
                  <b>Who we are here for:</b> For the locals. For the dreamers.
                  For the veterans who become creators. For the business women
                  carving space in the world. We are here for you.
                </p>
              </div>

              <div className="myspace-section">
                <h2>Links</h2>
                <ul>
                  <li>
                    <a
                      href="https://instagram.com/meet_the_agency"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Facebook
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="myspace-right-col">
              <div className="myspace-section">
                <h2>About Us</h2>
                <p>
                  We're <b>The Agency™</b>, a sister-run creative marketing
                  studio based in California — female-owned, veteran-owned,
                  community-driven. With 16+ years in branding, web design, app
                  development, marketing, photography, & social media
                  strategy, we turn businesses into brands people obsess over.

                  Our world is fueled by retro vibes & bold design energy... but
                  your brand? That's whatever you can dream up. We support that
                  dream with smart strategy so the end result is both
                  scroll-stopping, plus booking/sales-driving.
                </p>
              </div>

              <div className="myspace-section">
                <h2>What We Do:</h2>
                <ul>
                  <li>Brand Strategy & Identity Design</li>
                  <li>Web Design & Development (SEO-friendly, mobile-ready)</li>
                  <li>App Development (custom tools & interfaces)</li>
                  <li>
                    Marketing & Social Media (content, captions, analytics)
                  </li>
                  <li>
                    Photography & Videography (product, lifestyle, professional headshots, events)
                  </li>
                </ul>
                <p>
                  <b>Need something specific?</b>{" "}
                  <span className="contact-link" onClick={handleContactClick}>
                    Just ask!
                  </span>{" "}
                  We create custom solutions & quotes for every project.
                </p>
                <p>
                  <b>Our Mission:</b> Handling your brand identity and graphic
                  design, so you can focus on growing your business. We partner
                  with businesses, women entrepreneurs, veterans, and creatives
                  to create thoughtful and unforgettable branding that helps you
                  step into the spotlight.
                </p>
                <p>
                  <b>Locations:</b> Tehachapi • Bakersfield • Los Angeles •
                  Nationwide & Beyond
                </p>
                <p>
                  <b>Email:</b>{" "}
                  <span className="contact-link" onClick={handleContactClick}>
                    hello@meettheagency.com
                  </span>
                </p>
              </div>

              <div className="myspace-section ad-section">
                <h2>90s Ad Break</h2>
                <div className="ad-player">
                  <iframe
                    id="ad-video-player"
                    src="https://www.youtube.com/embed/5U7zB1q4-n0?autoplay=1&mute=1&controls=0&loop=1&playlist=5U7zB1q4-n0,H5Nqj0v5xQo,sD2-m4_8NGE"
                    title="90s Ads"
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>

              <div className="myspace-section">
                <h2>Friend Space</h2>
                <p>Meet_The_Agency has 420,000 friends (List Hidden)</p>
              </div>

              <div className="comment-container">
                <h2>💬 The Agency's Comment Wall</h2>
                <div className="myspace-section comment-wall">
                  <h2>Comments Turned Off</h2>
                  <p>Displaying 6 of 50,000 comments</p>
                  <div className="comment">
                    <b>� Tonys_Pizza:</b> If you're searching for a branding &
                    web design agency in California, don't wait, hire The
                    Agency. I'd been ripped off by other designers, so I was
                    skeptical, but Ash & Britt changed that within the first 15
                    minutes of our video call. Now we have a professional U.S.
                    brand, a custom online ordering app, and a styled menu that
                    keeps customers coming back. They really helped bring our
                    little local pizza shop into the future. Highly recommend
                    for any Kern County or Bakersfield small business!
                  </div>
                  <div className="comment special-comment">
                    <b>🔥 Brand_Boss:</b> So proud of you two! This profile is
                    absolute fire! ✨
                  </div>
                  <div className="comment">
                    <b>🐾 MountainPetRescue:</b> The Agency treated our
                    nonprofit rescue like it was the most important project in
                    the world. They brought energy, strategy, and an eye for
                    detail that boosted our donations and community awareness
                    across Bakersfield and Tehachapi. If you're a nonprofit or
                    local small business in Kern County looking for marketing or
                    branding—call these amazing women right away!
                  </div>
                  <div className="comment">
                    <b>🎶 Garage_Band_4Life:</b> We booked them for promo
                    photos, and not only did we look like rockstars, we walked
                    away with a complete visual identity. Website, merch, logo
                    design—the works. Ash & Britt gave us more than we imagined.
                    If you're an artist or musician in Los Angeles or the
                    Central Valley, they're the best creative team you'll ever
                    work with!
                  </div>
                  <div className="comment">
                    <b>☕️ Bean_Co_Cafe:</b> I thought I just needed flyers and
                    business cards, but The Agency delivered a full coffee shop
                    brand refresh. Now I've got a vibe customers instantly
                    recognize, and my sales have skyrocketed since. If you own a
                    café, boutique, or restaurant in Bakersfield or Tehachapi,
                    this is the branding agency you've been looking for.
                  </div>

                  {/* Hidden SEO Keywords */}
                  <div style={{ display: "none" }}>
                    branding agency California, web design agency Tehachapi,
                    Bakersfield marketing agency, creative agency Kern County,
                    Los Angeles small business branding, Central Valley web
                    design, veteran-owned creative studio, women-owned design
                    agency, nonprofit marketing California, café branding
                    Bakersfield, restaurant web design Kern County, boutique
                    logo design Tehachapi, social media marketing Bakersfield,
                    full-service creative agency California, small business
                    advertising Los Angeles, photography and videography agency
                    Kern County, The Agency OS, The Agency Creative Besties, Ash
                    & Britt branding.
                  </div>

                  <div className="leave-comment">
                    <h3>💌 Leave a Comment</h3>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleContactClick();
                      }}
                    >
                      <textarea placeholder="Share your thoughts..."></textarea>
                      <br />
                      <input type="submit" value="Post Comment" />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
